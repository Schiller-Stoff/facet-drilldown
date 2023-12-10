import React from "react";
import { DrilldownAble, FacetConstraintMap, gamsComponents } from "zim-gamshooks";
import ZIMFacetsApp from "./App";
import { useParams } from "react-router";

interface FacetAppData {
  // data: DrilldownAble<unknown>[];
  data: DrilldownAble<string>[]; //TODO fix typing again!
  facetConstraintMap: FacetConstraintMap;
}

export interface AppData {
  data?: FacetAppData;
  gui?: {
    appTitle?: string;
    visualization?: {
      disabled: string;
    };
    datatable?: {
      paginationDefaultPage: number;
    };
    facetDrill?: {
      disableTextSearchMark: string;
    };
  };
}

/**
 * Main entry app of FacetDriller. Decides how the data is loaded - either via fetching
 * from an external location our via global js variable.
 * @returns
 */
const FacetsDriller: React.FC = () => {
  // React router params
  const { jsonLoc, constraint }: { jsonLoc: string; constraint: string } = useParams();

  /**
   * Decides if the jsonLoc hash-url param is valid / active.
   * @returns No value will return false. Is the param set to "-" it will also return false.
   */
  const jsonParamIsActive = () => jsonLoc && jsonLoc !== "-";

  return (
    <gamsComponents.deployment.DeploymentAdapter
      microFrontendJson={jsonParamIsActive() ? jsonLoc : undefined}
      pluginGlobalProp="drilldown"
    >
      <ZIMFacetsApp></ZIMFacetsApp>
    </gamsComponents.deployment.DeploymentAdapter>
  );
};

export default FacetsDriller;
