import React from "react";
import { DrilldownAble, FacetConstraintMap, TagCount } from "zim-gamshooks";
import { DRILL_STATUS } from "zim-gamshooks/lib/hooks/useDrilldown";

export interface FacetsData {
  sourceData: DrilldownAble<string>[];
  tagCounts: TagCount[] | null;
  facetConstraintMap: FacetConstraintMap;
  drilled: DrilldownAble<string>[] | null;
  drillStatus: DRILL_STATUS;
  toggleTag: (tag: string) => void;
  selTags: string[];
  startDate?: Date;
  endDate?: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleSortByStartDate: () => void;
  handleSortByTitle: () => void;
}

interface Props {
  facetsData: FacetsData;
}

const FacetDataContext = React.createContext<FacetsData | null>(null);

/**
 * Allows to access given FacetsData via the useFacetData in the child components.
 * @param props
 * @returns
 */
export const FacetDataProvider: React.FC<Props> = (props) => {
  return <FacetDataContext.Provider value={props.facetsData}>{props.children}</FacetDataContext.Provider>;
};

export const useFacetData = () => React.useContext(FacetDataContext);
