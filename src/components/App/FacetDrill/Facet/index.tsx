import { useGuiConfig } from "components/common/GuiDataProvider";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

interface Props {
  constraintCheckBoxes: JSX.Element[];
  curFacet: string;
}

/**
 * Handles display of one Facet = Group of filter constraints.
 * @param props
 * @returns
 */
const Facet: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");

  const guiConfig = useGuiConfig();

  /**
   * Renders checkboxes according to typed given search text.
   * @returns
   */
  const filterCheckboxes = () => {
    switch (searchText) {
      case "":
        return [
          props.constraintCheckBoxes.slice(0, 10),
          <div
            key={props.curFacet + "_facetBadge"}
            onClick={() => setSearchText("*")}
            className="btn badge badge-light"
          >
            {" "}
            +{" "}
          </div>,
        ];
      case "*":
        return [
          props.constraintCheckBoxes,
          <div
            onClick={() => setSearchText("")}
            className="btn badge badge-light"
            key={props.curFacet + "collapse_facet"}
          >
            {" "}
            -{" "}
          </div>,
        ];
      default:
        return props.constraintCheckBoxes.filter((box) =>
          box.props.children[0].props.value.toLowerCase().includes(searchText.toLowerCase())
        );
    }
  };

  /**
   *  Reads out the expandAllAccordions flag from guiConfig.
   */
  const resolveGuiConfigExpandAll = ()  => {
    //@ts-ignore
    if(!guiConfig || !guiConfig.facetDrill || !guiConfig.facetDrill.expandAllAccordions) return undefined;
    //@ts-ignore
    return guiConfig.facetDrill.expandAllAccordions === "true" ? true : undefined;
  }

  /**
   * Converts given string to syntacitcal correct css classnames.
   * @param name
   * @returns
   */
  const nameToCSS = (name: string) => name.toLowerCase().replaceAll(".", "_").replaceAll(" ", "_");

  return (
    <Accordion allowZeroExpanded={true} id={nameToCSS(props.curFacet + "_accordion")}>
      <AccordionItem dangerouslySetExpanded={resolveGuiConfigExpandAll()}>
        <AccordionItemHeading>
          <AccordionItemButton>
            {props.curFacet} <span className="badge badge-light">{props.constraintCheckBoxes.length}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div>
            <div className="form-group">
              <div>
                <input
                  onChange={(evt) => setSearchText(evt.target.value)}
                  value={searchText}
                  type="text"
                  className={`form-control ${
                    searchText &&
                    guiConfig &&
                    guiConfig.facetDrill &&
                    guiConfig.facetDrill.disableTextSearchMark !== "true"
                      ? "is-valid"
                      : ""
                  }`}
                  id="inputPassword"
                  placeholder="'*' shows all"
                />
              </div>
            </div>
          </div>
          {/* <hr /> */}

          {filterCheckboxes()}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Facet;
