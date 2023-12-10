import React from "react";

const LoadSpinner = () => {
  return (
    <>
      <div className="m-3">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading drilldown app</span>
        </div>
        <span> Initializing the drilldown app ...</span>
      </div>
    </>
  );
};

export default LoadSpinner;
