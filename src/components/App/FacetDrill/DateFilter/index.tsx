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
  startDate?: Date;
  endDate?: Date;
  setStartDate: any;
  setEndDate: any;
}

/**
 * Handles filtering of data according to start and end date interval.
 * @param props
 * @returns
 */
const DateFilter: React.FC<Props> = (props) => {
  const startInput = React.useRef<HTMLInputElement>(null);
  const endInput = React.useRef<HTMLInputElement>(null);
  const guiConfig = useGuiConfig();

  /**
   * Reads out the default start date from guiConfig.
   * @returns default start date
   */
  const resolveGuiConfigDefaultStartDate = () => {
    //@ts-ignore
    if(!guiConfig || !guiConfig.facetDrill || !guiConfig.facetDrill.dateFacet || !guiConfig.facetDrill.dateFacet.defaultStartDate) return "";

    // check if date is valid
    try {
      //@ts-ignore
      new Date(guiConfig.facetDrill.dateFacet.defaultStartDate.trim())
    } catch (error) {
      console.error("Error parsing default start date from guiConfig", error);
      throw error;
    }
    
    //@ts-ignore
    return guiConfig.facetDrill.dateFacet.defaultStartDate;

  }

  /**
   * Reads out the default end date from guiConfig.
   * @returns default end date
   */
  const resolveGuiConfigDefaultEndDate = () => {
    //@ts-ignore
    if(!guiConfig || !guiConfig.facetDrill || !guiConfig.facetDrill.dateFacet || !guiConfig.facetDrill.dateFacet.defaultEndDate) return "";

    // check if date is valid
    try {
      //@ts-ignore
      new Date(guiConfig.facetDrill.dateFacet.defaultEndDate.trim())
    } catch (error) {
      console.error("Error parsing default start date from guiConfig", error);
      throw error;
    }
    
    //@ts-ignore
    return guiConfig.facetDrill.dateFacet.defaultEndDate;

  }


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
   *
   */
  const filterDate = () => {
    const start = startInput.current;
    const end = endInput.current;
    if (
      //@ts-ignore
      start &&
      start.value &&
      end &&
      end.value
    ) {
      props.setStartDate(new Date(start.value.trim()));
      // @ts-ignore
      props.setEndDate(new Date(end.value.trim()));
    }
    //@ts-ignore
    else {
      alert("You have to choose a valid start and enddate");
    }
  };
  return (
    <Accordion allowZeroExpanded={true} id="drilldown_date_accordion">
      <AccordionItem dangerouslySetExpanded={resolveGuiConfigExpandAll()}>
        <AccordionItemHeading>
          <AccordionItemButton>Date</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                id="start"
                name="trip-start"
                ref={startInput}
                min={"0000-01-01"}
                max="2018-12-31"
                defaultValue={resolveGuiConfigDefaultStartDate()}
              ></input>

              <input
                className="form-control"
                type="date"
                id="end"
                name="trip-start"
                ref={endInput}
                min={"0000-01-01"}
                max="2018-12-31"
                defaultValue={resolveGuiConfigDefaultEndDate()}
              />
              <br />
              <button type="button" className="btn btn-light border" onClick={filterDate}>
                Apply date range
              </button>
            </div>
          </form>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default DateFilter;
