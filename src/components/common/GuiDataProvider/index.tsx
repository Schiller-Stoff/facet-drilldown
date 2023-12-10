import React from "react";

interface FacetGUIDefinition {
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
}

const GuiDataContext = React.createContext<FacetGUIDefinition | null>(null);

/**
 * Calls given component, passing down gui prop with data accessed from
 * global js variable.
 * @param props
 * @returns
 */
export const GuiDataProvider: React.FC<FacetGUIDefinition> = (props) => {
  return <GuiDataContext.Provider value={props}>{props.children}</GuiDataContext.Provider>;
};

export const useGuiConfig = () => React.useContext(GuiDataContext);
