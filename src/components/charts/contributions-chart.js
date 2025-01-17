import * as React from "react"
import { getPalette } from "../util/styles/style"
import { LabelList, Legend, Pie, PieChart, ResponsiveContainer, Text, Tooltip } from "recharts"
import PropTypes from "prop-types"
import styled from "styled-components"

const RADIAN = Math.PI / 180

const LegendBlop = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
`

const ContributorList = styled.ul`
  overflow: scroll;
  height: 400px;
  background-color: var(--white); // this very slightly reduces quite how awful it is if the content overflows to the right-hand side
  padding-inline-start: 0;
`

const ContributorInformation = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: black;
  column-gap: 0.75rem;
`

const Contributor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.25rem;

  &:link {
    color: var(--black);
    text-decoration: underline;
  }

  &:visited {
    color: var(--black);
    text-decoration: underline;
  }
`

const ContributionsChart = (props) => {
  const uncolouredContributors = props.contributors

  if (uncolouredContributors) {
    const palette = getPalette(uncolouredContributors.length)

    const contributors = uncolouredContributors.sort((a, b) => b.contributions - a.contributions).map((contributor, i) => {
      return { ...contributor, fill: palette[i] }
    })

    const lotsOfContributors = contributors.length > 8

    //  we set a blank label if there are a small number of contributors, so we get the line, but we define our own
    // text so we can make it black. the offset in the label list is hand-tuned to put the text near the end of the line
    return (
      <ResponsiveContainer width={700} height="80%">
        <PieChart title={"Committers"}
                  desc={`A pie chart showing that ${contributors[0].name} has made the most commits in the past six months.`}>
          <Pie data={contributors} dataKey="contributions" nameKey="name" innerRadius={80}
               label={lotsOfContributors ? false : () => ""}
          >
            {lotsOfContributors ||
              <LabelList position="outside" offset={21} stroke="none"
                         fill="black"
                         content={renderCustomizedLabel} valueAccessor={(p) => p} />}
            }
          </Pie>
          {lotsOfContributors && <Legend layout="vertical" align="right" verticalAlign="top"
                                         content={renderLegend} />}

          <Tooltip formatter={((value, name) => [`${value} commits`, name])} />

        </PieChart>
      </ResponsiveContainer>)
  }
}


// Render a customised label so we can add in a link
const renderCustomizedLabel = (props) => {
  const { cx, cy, offset, value, stroke, viewBox } = props
  const { startAngle, endAngle, outerRadius } = viewBox

  const midAngle = (startAngle + endAngle) / 2
  const { x, y } = polarToCartesian(cx, cy, outerRadius + offset, midAngle)

  const anchor = getTextAnchor(x, cx)

  // If this is undefined, we just won't show a link, which is fine
  const profileUrl = value.url

  return (
    <g>
      <a href={profileUrl}>
        <Text offset={offset} stroke={stroke} cx={cx} cy={cy} x={x}
              y={y} fill="black" textAnchor={anchor}
              verticalAnchor="middle"
              className="recharts-pie-label-text"
        >
          {value.name}
        </Text>
      </a>
    </g>
  )
}

const renderLegend = (props) => {
  const { payload } = props

  return (
    <div>
      <h5>Commits</h5>
      <ContributorList>
        {
          payload.map((entry, index) => {
            const { payload: { name, value }, color } = entry

            return (
              <ContributorInformation key={`item-${index}`}>
                <Contributor>
                  <LegendBlop color={color} />
                  <a href={entry?.payload.url}>{name}</a>
                </Contributor>
                <span
                  style={{
                    "text-align": "right"
                  }}>{value}</span>
              </ContributorInformation>
            )
          })
        }
      </ContributorList>
    </div>
  )
}

// Copied from https://github.com/recharts/recharts/blob/f7410319bd65752b392e6767e7b5c7aaaaf9cc6a/src/polar/Pie.tsx#L402
const getTextAnchor = (x, cx) => {
  if (x > cx) {
    return "start"
  }
  if (x < cx) {
    return "end"
  }

  return "middle"
}

// Copied from https://github.com/recharts/recharts/blob/master/src/util/PolarUtils.ts#L12
const polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius,
})

ContributionsChart.propTypes = { data: PropTypes.shape({ contributions: PropTypes.number, name: PropTypes.string }) }

export default ContributionsChart