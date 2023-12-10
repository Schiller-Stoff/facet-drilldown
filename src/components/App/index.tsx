import React from "react";
import FacetDrill from "./FacetDrill";
import Layout from "components/common/Layout";
import FacetResult from "./FacetResult";
import FacetAnalysis from "./FacetAnalysis";
import LoadSpinner from "components/common/LoadSpinner";
import { AppData } from "components";
import { gamsComponents, gamsHooks } from "zim-gamshooks";
import { useParams } from "react-router";
import { FacetDataProvider } from "../common/FacetDataProvider";
import { GuiDataProvider } from "components/common/GuiDataProvider";

const ZIMFacetsApp: React.FC = () => {
  // custom context accessing gui / data object
  const appSpec = gamsComponents.deployment.useDeploymentContext() as AppData;

  if (!appSpec.data)
    throw new TypeError("Loaded data json is invalid. Make sure that the data data property is defined correctly!");

  // react router url param
  const { constraint }: { jsonLoc: string; constraint: string } = useParams();

  /**
   * Extracts from the react-router routeparam 'constraint' the initial
   * selected tags to drill. Returns
   * @returns undefined if string validates false or is "-". Otherwise returns the array of given selected tags.
   */
  const extractRouterPathConstraints = () => {
    if (!constraint) return undefined;
    if (constraint === "-") return undefined;
    let decoded = decodeURIComponent(constraint);
    let pathConstraints = decoded.split("|");
    return pathConstraints;
  };

  const {
    drilled,
    toggleTag,
    selTags,
    tagCounts,
    drillStatus,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    handleSortByStartDate,
    handleSortByTitle,
  } = gamsHooks.useDrilldown(appSpec.data.data, extractRouterPathConstraints());

  return tagCounts && drilled ? (
    <GuiDataProvider
      appTitle={appSpec.gui && appSpec.gui.appTitle}
      visualization={appSpec.gui && appSpec.gui.visualization}
      datatable={appSpec.gui && appSpec.gui.datatable}
      facetDrill={appSpec.gui && appSpec.gui.facetDrill}
    >
      <FacetDataProvider
        facetsData={{
          sourceData: appSpec.data.data,
          tagCounts: tagCounts,
          facetConstraintMap: appSpec.data.facetConstraintMap,
          drilled: drilled,
          selTags: selTags,
          drillStatus: drillStatus,
          endDate: endDate,
          startDate: startDate,
          toggleTag: toggleTag,
          handleSortByStartDate: handleSortByStartDate,
          handleSortByTitle: handleSortByTitle,
          setEndDate: setEndDate,
          setStartDate: setStartDate,
        }}
      >
        <Layout left={<FacetDrill />}>
          <FacetResult />
          {appSpec.gui && appSpec.gui.visualization && appSpec.gui.visualization.disabled !== "true" && (
            <FacetAnalysis></FacetAnalysis>
          )}
        </Layout>
      </FacetDataProvider>
    </GuiDataProvider>
  ) : (
    <LoadSpinner />
  );
};

export default ZIMFacetsApp;
