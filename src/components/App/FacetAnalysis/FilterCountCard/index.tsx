import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

interface Props {
  sourceData: any[];
  drilled: any[];
}

const FilterCountCard: React.FC<Props> = (props) => {
  return (
    <div className="card">
      <br />
      <PieChart width={200} height={200} className="m-auto">
        <Pie
          dataKey="count"
          outerRadius={100}
          data={[
            {
              name: "Filtered data",
              count: props.sourceData.length - props.drilled.length,
            },
            {
              name: "Visible data",
              count: props.sourceData.length - (props.sourceData.length - props.drilled.length),
              fill: "#ffc107",
            },
          ]}
        ></Pie>
        <Tooltip></Tooltip>
      </PieChart>
      <br />
      <b className="d-block">Visible datapoints (proportional)</b>
      <p>
        {props.drilled.length} / {props.sourceData.length}{" "}
      </p>
    </div>
  );
};

export default FilterCountCard;
