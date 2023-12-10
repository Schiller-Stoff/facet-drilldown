import React, { Fragment } from "react";

interface Props {
  activeTags: string[];
  startDate?: Date;
  endDate?: Date;
  onBadgeClick: (tag: string) => void;
  onDateBadgeClick: () => void;
}

/**
 * Shows basic info about the current result like selected search values etc.
 * @param props
 * @returns
 */
const ResultInfo: React.FC<Props> = (props) => {
  return (
    <div className="container-fluid border-bottom pt-2 p-0 sticky-top bg-white" style={{ minHeight: "3em" }}>
      {/* <h1 className="h5">Drilldown App</h1> */}
      {props.activeTags.length === 0 && !props.startDate && !props.endDate ? (
        <span style={{ marginRight: ".25em" }} className="btn badge badge-warning p-2 mb-1">
          show all
        </span>
      ) : null}
      {props.startDate && props.endDate && (
        <span
          onClick={() => props.onDateBadgeClick()}
          style={{ marginRight: ".25em" }}
          className="btn badge badge-warning p-2 mb-1"
        >
          {props.startDate.toLocaleDateString()} - {props.endDate.toLocaleDateString()} (+removed undated)
        </span>
      )}
      {props.activeTags.map((tag, index) => (
        <Fragment key={tag}>
          {index !== 0 ? <span style={{ fontSize: ".85em" }}> &amp; </span> : null}
          <span
            onClick={() => props.onBadgeClick(tag)}
            style={{ marginRight: ".25em" }}
            className="btn badge badge-warning p-2 mb-1"
          >
            {tag}
          </span>
        </Fragment>
      ))}
      <br />
    </div>
  );
};

export default ResultInfo;
