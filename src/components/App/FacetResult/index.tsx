import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import ResultInfo from "./ResultInfo";
import { useFacetData } from "components/common/FacetDataProvider";
import { useGuiConfig } from "components/common/GuiDataProvider";

const FacetResult: React.FC = () => {
  // custom context hook
  const facetData = useFacetData();

  const facetGui = useGuiConfig();

  // disable definition of date when 

  //@ts-ignore
  const columns = facetGui.facetDrill.enableDateDrilling !== "false" ? [
    {
      name: "Title",
      selector: (row: any) => row.txt,
      sortable: true,
    },
    {
      name: "Start date",
      selector: (row: any) => (row.date ? row.date.startDate : "-"),
      sortable: true,
      width: "100px",
    },
    {
      name: "End date",
      selector: (row: any) => (row.date ? row.date.endDate : "-"),
      sortable: true,
      width: "100px",
    },
  ] : [
    {
      name: "Title",
      selector: (row: any) => row.txt,
      sortable: true,
    },
  ]

  /**
   * Returns property of nested "datatable" property.
   * @param propertyName
   */
  const getDatatableProp = (propertyName: string): string | undefined => {
    if (!facetGui) return undefined;
    if (!facetGui.datatable) return undefined;

    //@ts-ignore
    if (!facetGui.datatable[propertyName]) return undefined;

    //@ts-ignore
    return facetGui.datatable[propertyName] as string;
  };

  /**
   * Returns given property as number from the nested "datatable" json property.
   * @param propertyName
   */
  const getDatatablePropAsNum = (propertyName: string): number | undefined => {
    let propValue = getDatatableProp(propertyName);

    return propValue ? parseInt(propValue) : undefined;
  };

  /**
   * Returns given property as boolean from the nested "datatable" json property.
   * @param propertyName
   */
  const getDatatablePropAsBoolean = (propertyName: string): boolean | undefined => {
    let propValue = getDatatableProp(propertyName);

    if (propValue === "true") {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Returns given property as boolean from the nested "datatable" json property.
   * @param propertyName
   */
  const getDatatablePropAsObject = (propertyName: string): Object | undefined => {
    let propValue = getDatatableProp(propertyName);

    if (!propValue) return undefined;

    return propValue;
  };

  return facetData && facetData.drilled ? (
    <div className="container-fluid">
      <ResultInfo
        activeTags={facetData.selTags}
        endDate={facetData.endDate}
        startDate={facetData.startDate}
        onBadgeClick={facetData.toggleTag}
        onDateBadgeClick={() => {
          facetData.setStartDate(undefined);
          facetData.setEndDate(undefined);
        }}
      ></ResultInfo>
      <DataTable
        id="drilldown_facetResult"
        progressPending={facetData.drillStatus !== "SUCCESS"}
        columns={columns}
        data={facetData.drilled}
        dense={getDatatablePropAsBoolean("dense")}
        // fixedHeader
        // title="Drilldown App"
        pagination
        paginationPerPage={getDatatablePropAsNum("paginationPerPage")}
        title={getDatatableProp("title")}
        customStyles={getDatatablePropAsObject("customStyles")}
        //@ts-ignore
        direction="auto"
        // fixedHeaderScrollHeight="600px"
        // fixedHeaderScrollHeight="80vh"
        // fixedHeader
        responsive
        //@ts-ignore
        subHeaderAlign="right"
        subHeaderWrap
        // dense
        //pointerOnHover
        striped={getDatatablePropAsBoolean("striped")}
        expandableRows
        expandableRowExpanded={() => getDatatablePropAsBoolean("expandedRows") as boolean}
        expandableRowsComponent={(innerProps) => {
          return (
            <div className="p-3 w-50">
              {(innerProps.data as any).image ? (
                <>
                  <a target="_blank" rel="noopener noreferrer" href={innerProps.data.value as string}>
                    <img
                      src={(innerProps.data as any).image.src}
                      style={
                        (innerProps.data as any).image.style
                          ? (innerProps.data as any).image.style
                          : {
                              display: "block",
                              width: 150,
                            }
                      }
                      alt={(innerProps.data as any).image.label}
                    ></img>
                  </a>
                  {(innerProps.data as any).image.label ? (
                    <small
                      style={{
                        display: "block",
                        marginBottom: ".5em",
                      }}
                    >
                      {(innerProps.data as any).image.label}
                    </small>
                  ) : null}
                  <a target="_blank" rel="noopener noreferrer" href={innerProps.data.value as string}>
                    {innerProps.data.txt}
                  </a>
                </>
              ) : null}

              <div>
                {Array.from(new Set(innerProps.data.tags)).map((tag) => (
                  <Fragment key={tag}>
                    <span
                      onClick={() => facetData.toggleTag(tag)}
                      style={{ marginRight: ".25em" }}
                      className="btn badge badge-light"
                    >
                      {tag}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          );
        }}
      ></DataTable>
    </div>
  ) : null;
};

export default FacetResult;
