// Author: Sebastian Stoff
// Desc: Used as deployment script. Processes files for gamsdev and generate script tags copyable to xslt.
// need to be started from project root.

const deployer = require("./utils/gamsDeploy");

// variables needed for deployment procedure

// REQUIRED
// gamsdev project abbreviation like cantus / dipko / derla / etc.
// e.g. "derla"
let projectAbbr = "rta";
// name of folder that should be created for the app. Should be deployed to gamsdev/myusername/myproject/apps/
// "derla_mapp_app" or "corema_fuzzy" etc.
// should follow same name as id for render-div
let folderName = "rtafacets";

// OPTIONAL
// if undefined processes from build -> to -> ./deploy
// CAREFUL: optionally give complete path to your gamsdev root on your current machine. (Not project root)
// e.g. "Z:\gamsdev" could also copy to anywhere else on current machine like "C:\Users\Sebastian\Desktop\gamsdev"
let gamsdevRootPath = null;

if (!projectAbbr || !folderName)
  throw new ReferenceError(
    "You have to specify your project abbreviation and app-folder-name inside /scripts/deploy.js to succesfully deploy your app to glossa / gams."
  );

deployer.deployToGamsdev(projectAbbr, folderName, gamsdevRootPath);
