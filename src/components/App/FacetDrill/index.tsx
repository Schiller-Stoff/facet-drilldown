import { TagCount } from "zim-gamshooks";
import React from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import Facet from "./Facet";
import DateFilter from "./DateFilter";
import { useGuiConfig } from "components/common/GuiDataProvider";
import { useFacetData } from "components/common/FacetDataProvider";

const FacetDrill: React.FC = () => {
  // accessing data via the custom context hooks
  const guiConfig = useGuiConfig();
  const facetData = useFacetData();

  /**
   * Handles rendering of accordions according to facets and tags.
   * @returns
   */
  const renderFacetsAccordion = () => {
    if (!facetData) return null;

    // fasters way of iterating over object
    let keys = Object.keys(facetData.facetConstraintMap),
      i = keys.length;
    let accordions: JSX.Element[] = [];

    // only if set to true! -> display date accordion
    // @ts-ignore
    if(guiConfig && guiConfig.facetDrill && guiConfig.facetDrill.enableDateDrilling !== "false"){
      accordions.push(
        <DateFilter
          key="date_Filter_component"
          setEndDate={facetData.setEndDate}
          setStartDate={facetData.setStartDate}
        ></DateFilter>
      );
    }
    
    while (i--) {
      // facet = heading for accordion
      let curFacet = keys[i];

      // checkboxes for tags and their counts
      let facetCheckboxes: JSX.Element[] = [];
      if (facetData.tagCounts) {
        for (let ind = 0; ind < facetData.tagCounts.length; ind++) {
          let tagCount: TagCount = facetData.tagCounts[ind];

          // if tag not inside facetConstraintMap -> block rendering
          if (!facetData.facetConstraintMap[curFacet].includes(tagCount[0])) continue;

          let checkBox = (
            <div className="form-check" key={`${curFacet}_facetConstraintCheckbox_${tagCount[0]}`}>
              <input
                checked={facetData.selTags.includes(tagCount[0])}
                readOnly={facetData.selTags.includes(tagCount[0])}
                key={tagCount[0]}
                onClick={() => facetData.toggleTag(tagCount[0])}
                className="form-check-input"
                type="checkbox"
                value={tagCount[0]}
                id={`${tagCount[0]}_defaultCheck1`}
              />
              <label htmlFor={`${tagCount[0]}_defaultCheck1`} className="form-check-label">
                {tagCount[0]} <span className="badge badge-light">{tagCount[1]}</span>
              </label>
            </div>
          );

          facetCheckboxes.push(checkBox);
        }
      }

      let accordion = (
        <Facet key={`${curFacet}_facetAccordion`} constraintCheckBoxes={facetCheckboxes} curFacet={curFacet} />
      );

      accordions.push(accordion);
    }
    return accordions;
  };

  /**
   *  Handles the display of the reset button.
   *  Only if the prop is explicetly set to false, the button will be hidden.
   * @returns "" if no guiConfig is set, "d-none" if the button should be hidden, "" otherwise 
   */
  const resolveDisplayResetButton = () => {
    if(!guiConfig) return "";
    if(!guiConfig.facetDrill) return "";
    // @ts-ignore
    if(!guiConfig.facetDrill.enableResetButton) return "";
    // @ts-ignore
    return guiConfig.facetDrill.enableResetButton === "false" ? "d-none": "" ;
  }

  return (
    <div
      className={`shadow-sm ${window.innerWidth > 770 ? "fixed-top w-25" : ""} overflow-auto`}
      style={{ maxHeight: "100vh" }}
      id="drilldown_facetDrill"
    >
      {guiConfig && guiConfig.appTitle && <h1 className="h5 bg-light m-0 p-2">{guiConfig.appTitle}</h1>}

      {renderFacetsAccordion()}
      <br></br>
      <button className={`btn btn-secondary m-2 ${resolveDisplayResetButton()}`} onClick={() => window.location.reload()}>
        Reset
      </button>
    </div>
  );
};

export default FacetDrill;
