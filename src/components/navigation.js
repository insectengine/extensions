/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Navigation = () => {
  return (
    <div className="navigation">
      {/* This will be invisible for the moment, which is fine */}
      <p style={{ position: "absolute" }}>Quarkus</p>
      <StaticImage
        className="fake-content"
        layout="constrained"
        formats={["auto", "webp", "avif"]}
        src="../images/navigation-bar.png"
        width={2320}
        height={144}
        alt="Static navigation bar"
      />
    </div>
  )
}

export default Navigation
