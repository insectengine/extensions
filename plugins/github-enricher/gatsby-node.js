const gh = require("parse-github-url")
const path = require("path")
const encodeUrl = require("encodeurl")

const { getCache } = require("gatsby/dist/utils/get-cache")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { labelExtractor } = require("./labelExtractor")
const PersistableCache = require("./persistable-cache")
const { findSponsor, clearCaches, saveSponsorCache, initSponsorCache, getContributors } = require("./sponsorFinder")
const { getRawFileContents, queryGraphQl } = require("./github-helper")

const defaultOptions = {
  nodeType: "Extension",
}

// To avoid hitting the git rate limiter retrieving information we already know, cache what we can
const DAY_IN_SECONDS = 24 * 60 * 60

// Defer initialization of these so we're playing at the right points in the plugin lifecycle
let repoCache, extensionYamlCache

let getLabels

exports.onPreBootstrap = async ({}) => {
  repoCache = new PersistableCache({ key: "github-api-for-repos", stdTTL: 3 * DAY_IN_SECONDS })

// The location of extension files is unlikely to change often, and if it does, the link checker will flag the issue
  extensionYamlCache = new PersistableCache({
    key: "github-api-for-extension-paths",
    stdTTL: 10 * DAY_IN_SECONDS
  })

  await repoCache.ready()
  console.log("Ingested", repoCache.size(), "cached repositories.")

  await extensionYamlCache.ready()
  console.log("Ingested", extensionYamlCache.size(), "cached metadata file locations.")

  await initSponsorCache()

  const repoCoords = { owner: "quarkusio", name: "quarkus" }

  const text = await getRawFileContents(repoCoords.owner, repoCoords.name, ".github/quarkus-github-bot.yml")

  const yaml = text ? text : ""

  // This query is long, because I can't find a way to do "or" or
  // Batching this may not help that much because rate limits are done on query complexity and cost,
  // not the number of actual http calls; see https://docs.github.com/en/graphql/overview/resource-limitations
  const query = `
  query {
    repository(owner:"${repoCoords.owner}", name:"${repoCoords.name}") {
     object(expression: "HEAD:extensions") {
      # Top-level.
      ... on Tree {
        entries {
          name
          type
          object {

            # One level down.
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    }
  }
}`

  const pathsRes = await queryGraphQl(query)
  const repoListing = pathsRes?.repository?.object?.entries

  getLabels = labelExtractor(yaml, repoListing).getLabels

  // Return the promise so the execution waits for us
  return yaml
}

exports.onPostBootstrap = async ({}) => {
  await repoCache.persist()
  console.log("Persisted", repoCache.size(), "cached repositories.")

  await extensionYamlCache.persist()
  console.log("Persisted", extensionYamlCache.size(), "cached metadata file locations.")

  await saveSponsorCache()
}

exports.onPluginInit = () => {
  // Clear the in-memory cache; we read from the gatsby cache later on, so this shouldn't affect the persistence between builds
  // This is mostly needed for tests, since we can't add new methods beyond what the API defines to this file
  repoCache?.flushAll()
  extensionYamlCache?.flushAll()
  clearCaches()
}

exports.onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNode } = actions

  const options = {
    ...defaultOptions,
    ...pluginOptions,
  }

  if (node.internal.type !== options.nodeType) {
    return
  }

  const { metadata } = node
  // A bit ugly, we need a unique identifier in string form, and we also need the url; use a comma-separated string
  const id = metadata?.sourceControl
  const scmUrl = id?.split(",")[0]

  if (scmUrl) {
    const labels = await fetchScmLabel(scmUrl, node.metadata?.maven?.artifactId)

    const scmInfo = await fetchScmInfo(
      scmUrl,
      node.metadata?.maven?.groupId,
      node.metadata?.maven?.artifactId,
      labels
    )

    scmInfo.id = createNodeId(id)
    // We need a non-obfuscated version of the id to act as a foreign key
    scmInfo.key = id

    scmInfo.internal = {
      type: "SourceControlInfo",
      contentDigest: createContentDigest(scmInfo),
    }

    if (scmInfo.socialImage) {
      const fileNode = await createRemoteFileNode({
        url: scmInfo.socialImage,
        name: path.basename(scmInfo.socialImage),
        parentNodeId: scmInfo.id,
        getCache,
        createNode,
        createNodeId,
      })

      // This is the foreign key to the cropped file's name
      // We have to guess what the name will be
      scmInfo.projectImage = "smartcrop-" + path.basename(fileNode.absolutePath)
    }

    createNode(scmInfo)

    // Return a promise to make sure we wait
    return scmInfo
  }
}

async function fetchScmLabel(scmUrl, artifactId) {
  // Special case extensions which live in the quarkus repo; in the future we could generalise,
  // but at the moment we only know how to find a label for quarkus
  if (scmUrl === "https://github.com/quarkusio/quarkus") {
    return getLabels(artifactId)
  }
}

const fetchScmInfo = async (scmUrl, groupId, artifactId, labels) => {
  if (scmUrl && scmUrl.includes("github.com")) {
    return fetchGitHubInfo(scmUrl, groupId, artifactId, labels)
  } else {
    return { url: scmUrl }
  }
}

function cache(ghJson, scmUrl, hasLabelInfo) {
  // This copy *should* be unneeded, but better safe than sorry
  const jsonCopy = structuredClone(ghJson)

  if (jsonCopy.repository) {

    // We do *not* want to cache artifact-specific extension paths or the issue count (if there are labels)
    delete jsonCopy.repository["subfolderMetaInfs"]
    delete jsonCopy.repository["shortenedSubfolderMetaInfs"]
    delete jsonCopy.repository["quarkusSubfolderMetaInfs"]

    if (hasLabelInfo) {
      delete jsonCopy.repository["issues"]
      delete jsonCopy.repository["issuesUrl"]
    }
  }
  repoCache.set(scmUrl, jsonCopy) // Save this information for the next time
}

const fetchGitHubInfo = async (scmUrl, groupId, artifactId, labels) => {

  // Check both that we have a cache and that it's been populated with the data we expect
  const hasCache = repoCache.has(scmUrl) && repoCache.get(scmUrl).repositoryOwner?.avatarUrl

  // TODO we can just treat label as an array, almost
  const labelFilterString = labels
    ? `, filterBy: { labels:  [${labels.map(label => `"${label}"`).join()}] }`
    : ""

  const coords = gh(scmUrl)

  const project = coords.name

  // Some multi-extension projects use just the 'different' part of the name in the folder structure
  const shortArtifactId = artifactId?.replace(coords.name + "-", "")

  const issuesUrl = labels
    ? encodeUrl(
      scmUrl +
      "/issues?q=is%3Aopen+is%3Aissue+label%3A" +
      labels.map(label => label.replace("/", "%2F")).join(",")
    )
    : scmUrl + "/issues"

  const scmInfo = { url: scmUrl, project }

  // Always set the issuesUrl and labels since the cached one might be invalid
  scmInfo.issuesUrl = issuesUrl
  scmInfo.labels = labels

  // This query is long, because I can't find a way to do "or" or
  // Batching this may not help that much because rate limits are done on query complexity and cost,
  // not the number of actual http calls; see https://docs.github.com/en/graphql/overview/resource-limitations
  const issuesQuery = `issues(states:OPEN, ${labelFilterString}) {
        totalCount
      }`

  const fullSubfoldersQuery = `
      defaultBranchRef {
        name
      }
      
      metaInfs: object(expression: "HEAD:runtime/src/main/resources/META-INF/") {
        ... on Tree {
          entries {
            path
          }
        }
      }
      
      subfolderMetaInfs: object(expression: "HEAD:${artifactId}/runtime/src/main/resources/META-INF/") {
        ... on Tree {
          entries {
            path
          }
        }
      }
      
      shortenedSubfolderMetaInfs: object(expression: "HEAD:${shortArtifactId}/runtime/src/main/resources/META-INF/") {
        ... on Tree {
          entries {
            path
          }
        }
      }
      
       quarkusSubfolderMetaInfs: object(expression: "HEAD:extensions/${shortArtifactId}/runtime/src/main/resources/META-INF/") {
        ... on Tree {
          entries {
            path
          }
        }
      }`

  let query
  const artifactKey = groupId + ":" + artifactId

  const hasMetadataFileLocationCache = extensionYamlCache.get(artifactKey)

  const subfoldersQuery = hasMetadataFileLocationCache ? "" : fullSubfoldersQuery

  // TODO once we also cache issues, we can drop the query entirely in some cases
  if (hasCache) {
    // If a repo has labels, we can't just use the issue count for the repo, we need to get the issue count for the specific label
    // We could also cache that, but it's more complicated
    if (labels) {
      query = `query {
        repository(owner:"${coords.owner}", name:"${coords.name}") {
          ${issuesQuery}
          
          ${subfoldersQuery}
          }
    }`
    } else {
      if (subfoldersQuery.length > 0) {
        query = `query {
        repository(owner:"${coords.owner}", name:"${coords.name}") {          
          ${subfoldersQuery}
          }
    }`
      } else {
        query = undefined
      }
    }
  } else {
    query = `query {
    repository(owner:"${coords.owner}", name:"${coords.name}") {
      ${issuesQuery}
      
      ${subfoldersQuery}
         
      openGraphImageUrl
    }
    
    repositoryOwner(login: "${coords.owner}") {
        avatarUrl
    }
  }`
  }

  const body = query ? await queryGraphQl(query) : undefined
  const returnedData = body?.data
  const returnedRepository = body?.data?.repository

  const cachedData = repoCache.get(scmUrl)
  const cachedRepository = cachedData?.repository


  // Merge the cache and what we got passed back this time
  const data = { ...cachedData, ...returnedData }
  // We also need to do a deep merge of the repository object
  data.repository = { ...cachedRepository, ...returnedRepository }
  cache(data, scmUrl, labels)

  const {
    repository: {
      defaultBranchRef,
      metaInfs,
      subfolderMetaInfs,
      shortenedSubfolderMetaInfs,
      quarkusSubfolderMetaInfs,
      openGraphImageUrl,
    },
  } = data

  // Handle these separately since the parent objects may be undefined and destructuring nested undefineds is not good
  scmInfo.issues = data?.repository?.issues?.totalCount
  scmInfo.ownerImageUrl = data?.repositoryOwner?.avatarUrl


  let extensionPathInRepo
  if (hasMetadataFileLocationCache) {
    const paths = extensionYamlCache.get(artifactKey)
    const { extensionYamlUrl, extensionRootUrl } = paths
    extensionPathInRepo = paths.extensionPathInRepo
    scmInfo.extensionYamlUrl = extensionYamlUrl
    scmInfo.extensionPathInRepo = extensionPathInRepo
    scmInfo.extensionRootUrl = extensionRootUrl
  } else {
    const allMetaInfs = [
      ...(metaInfs ? metaInfs.entries : []),
      ...(subfolderMetaInfs ? subfolderMetaInfs.entries : []),
      ...(shortenedSubfolderMetaInfs
        ? shortenedSubfolderMetaInfs.entries
        : []),
      ...(quarkusSubfolderMetaInfs
        ? quarkusSubfolderMetaInfs.entries
        : [])
    ]

    const extensionYamls = allMetaInfs.filter(entry =>
      entry.path.endsWith("/quarkus-extension.yaml")
    )
    // We should only have one extension yaml - if we have more, don't guess, and if we have less, don't set anything
    if (extensionYamls.length === 1) {

      // If we didn't get a branch ref from the cache or from github we're a bit stuck and will have to try again next time
      if (defaultBranchRef) {
        const extensionYamlPath = extensionYamls[0].path
        extensionPathInRepo = extensionYamlPath.replace("runtime/src/main/resources/META-INF/quarkus-extension.yaml", "")
        const extensionRootUrl = `${scmUrl}/blob/${defaultBranchRef.name}/${extensionPathInRepo}`
        const extensionYamlUrl = `${scmUrl}/blob/${defaultBranchRef.name}/${extensionYamlPath}`
        extensionYamlCache.set(artifactKey, { extensionYamlUrl, extensionPathInRepo, extensionRootUrl })

        scmInfo.extensionYamlUrl = extensionYamlUrl
        scmInfo.extensionPathInRepo = extensionPathInRepo
        scmInfo.extensionRootUrl = extensionRootUrl
      }
    }
  }

  scmInfo.sponsors = await findSponsor(coords.owner, project, extensionPathInRepo)
  scmInfo.contributors = await getContributors(coords.owner, project, extensionPathInRepo)

  scmInfo.owner = coords.owner

  // Only look at the social media preview if it's been set by the user; otherwise we know it will be the owner avatar with some text we don't want
  // This mechanism is a bit fragile, but should work for now
  // Default pattern https://opengraph.githubassets.com/3096043220541a8ea73deb5cb6baddf0f01d50244737d22402ba12d665e9aec2/quarkiverse/quarkus-openfga-client
  // Customised pattern https://repository-images.githubusercontent.com/437045322/39ad4dec-e606-4b21-bb24-4c09a4790b58

  const isCustomizedSocialMediaPreview =
    openGraphImageUrl?.includes("githubusercontent")

  if (isCustomizedSocialMediaPreview) {
    scmInfo.socialImage = openGraphImageUrl
  }

  return scmInfo
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type SourceControlInfo implements Node @noinfer {
    url: String
    ownerImageUrl: String
    companies: [String]
    extensionYamlUrl: String
    issues: String
    contributors: [ContributorInfo]
    sponsors: [String]
    socialImage: File @link(by: "url")
    projectImage: File @link(by: "name")
  }
  
  type ContributorInfo implements Node @noinfer {
    name: String
    login: String
    contributions: Int
    url: String
  }
  `
  createTypes(typeDefs)
}
