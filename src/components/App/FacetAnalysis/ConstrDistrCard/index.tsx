import { useFacetData } from "components/common/FacetDataProvider";
import React from "react";
import { Bar, BarChart, Tooltip } from "recharts";

/**
 * Renders a card where a bar chart shows the distribution / proportion of
 * the different tag counts.
 * @param props
 * @returns
 */
const ConstrDistrCard: React.FC = () => {
  // using custom context hook
  const facetData = useFacetData();

  return (
    <div className="container card p-1">
      <br />
      <BarChart
        data={
          facetData && facetData.tagCounts
            ? facetData.tagCounts.slice(0, 20).map((tagCount) => {
                return {
                  name: tagCount[0],
                  count: tagCount[1],
                  fill: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
                };
              })
            : undefined
        }
        width={500}
        height={190}
        className="m-auto"
      >
        <Bar dataKey="count" />
        <Tooltip
          content={({ active, payload, label }) => {
            return (
              <div className="custom-tooltip bg-white">
                {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
                {/* <p className="intro">{getIntroOfPage(label)}</p> */}
                <p className="desc">
                  {payload && payload[0] && payload[0].payload && (
                    <>
                      {payload[0].payload.name} - {payload[0].payload.count}
                    </>
                  )}
                </p>
              </div>
            );
          }}
        ></Tooltip>
      </BarChart>
      <br />
      <b>Top constraint distribution</b>
      <p>20 / {facetData && facetData.tagCounts && facetData.tagCounts.length} unique constraint counts displayed</p>
    </div>
  );
};

export default ConstrDistrCard;
