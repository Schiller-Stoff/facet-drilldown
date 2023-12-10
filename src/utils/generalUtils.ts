/**
 * Holds general utility functions e.g. for mimicing functionality of xslt.
 * No GAMS specific code in here.
 */
const zimGUtils = (() => {
  /**
   * Iterate over given array and regroup nested objects according to defined property name.
   * @param array Array to be regrouped.
   * @param groupBy Name of property according to which the regrouping should be processed.
   * @returns Object of regrouped array.
   */
  const groupBy = (
    array: { [property: string]: any }[],
    grouBy: string,
    groupFunc: ((aggregator: { [property: string]: any }, iterProp: string) => void) | undefined = undefined
  ) => {
    const groupedBy = array.reduce((aggr, value) => {
      Object.keys(value).forEach((property) => {
        aggr[value[grouBy]] = aggr[value[grouBy]] ? aggr[value[grouBy]] : {};

        if (groupFunc) {
          groupFunc(aggr, property);
        } else {
          aggr[value[grouBy]][property] = aggr[value[grouBy]][property] ? aggr[value[grouBy]][property] : [];
          aggr[value[grouBy]][property].push(value[property]);
        }
      });
      return aggr;
    }, {});
    return groupedBy;
  };

  /**
   * A substring between two characters
   * @param str entire string
   * @param from character after which substring begins
   * @param to character after which substring ends
   */
  const substringBetween = (str: string, from: string, to: string) => {
    return str.substring(str.lastIndexOf(from) + 1, str.lastIndexOf(to));
  };

  /**
   * Utility function measure performance.
   * @param funct
   * @param funcName
   * @returns
   */
  const measurePerformance = (funct: Function, funcName: string) => {
    const t0 = performance.now();
    let res = funct();
    const t1 = performance.now();
    console.log(`Call to ${funcName} took ${t1 - t0} milliseconds.`);
    return res;
  };

  return {
    groupBy,
    substringBetween,
    measurePerformance,
  };
})();

export default zimGUtils;
