import React from "react";
import FilterCountCard from "./FilterCountCard";
import ConstrDistrCard from "./ConstrDistrCard";
import { useFacetData } from "components/common/FacetDataProvider";

/**
 * Right side of the drilldown app.
 * @returns
 */
const FacetAnalysis: React.FC = () => {
  const facetData = useFacetData();

  return facetData && facetData.drilled ? (
    <div id="drilldown_facetAnalysis" className="row container-fluid">
      <div className="col-md-4 text-center p-0">
        <FilterCountCard sourceData={facetData.sourceData} drilled={facetData.drilled}></FilterCountCard>
      </div>
      <div className="pl-2 col-md-8 text-center">
        <ConstrDistrCard></ConstrDistrCard>
      </div>
    </div>
  ) : null;
};

export default FacetAnalysis;
