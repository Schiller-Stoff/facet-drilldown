/**
 * Assigns a unique name to the wbpack build configuration
 * for the app creation -> so that there are no conflicts
 * with multiple react apps on one page.
 *
 * Requires the rewire library.
 */

const rewire = require("rewire");
const defaults = rewire("react-scripts/scripts/build.js");
let config = defaults.__get__("config");
config.output.jsonpFunction = "webpackJsonp_" + Math.random().toString(36).substring(7);
