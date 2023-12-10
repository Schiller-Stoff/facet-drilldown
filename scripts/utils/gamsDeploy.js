const fs = require("fs");
const path = require("path");

/**
 * Module to help bringing React-App etc. code to deployable
 * form for GAMS.
 */
const GamsWidgetDeployer = (() => {
  /**
   * Copies all relevant deployable css and js code from React App's
   * source path to target path.
   * - does not work remotely just provides local copy functionalities.
   * @param {string} targetPath
   */
  const copyDeploymentFiles = (targetPath) => {};

  /**
   * Analyses built React App files and restructures to deployable form on GAMS.
   * - only takes js and css files
   * - creates in working dir 'deploy' folder if gamsdevRoot is undefined
   * @param {string} projectAbbr correct abbr of project-folder in gamsdev
   * @param {string} folderName name of app. used to generate main folder and in src attributies of script tags.
   * @param {string} gamsdevRoot OPTIONAL - CAREFUL: root of your gamsdev like Z:\gamsdev on your current machine.
   * If assigned will process files directly to your gamsdev.
   */
  const deployToGamsdev = (projectAbbr, folderName, gamsDevRoot) => {
    console.log("####");
    console.log("#");
    console.log("> OPERATION STARTED.");
    console.log("> Building deployment files...");
    const CUR_WORK_DIR = process.cwd();
    const DIST_PATH = CUR_WORK_DIR + "/build";

    if (!fs.existsSync(DIST_PATH)) {
      throw new ReferenceError(
        "> You must build your production ready code first! Run 'npm run buildAsMultiApp' and then call the the deployment script."
      );
    } else {
      console.log(
        "> (Do not forget to build the newest version of your react-app via 'npm run buildAsMultiApp' before calling the deployment script.)"
      );
    }

    if (!projectAbbr) {
      throw new ReferenceError("You must define a project abbreviation before you can deploy your code.");
    }

    if (!folderName) {
      console.warn("> No foldername specified --- will deploy to folder 'myapp'");
      folderName = "myapp";
    }

    // if gamsdevRoot is not given -> process to ./deploy else to given path
    let DEPLOY_PATH = "";
    if (!gamsDevRoot) {
      DEPLOY_PATH = CUR_WORK_DIR + "/deploy" + path.sep + folderName;
      if (!fs.existsSync(CUR_WORK_DIR + path.sep + "/deploy")) {
        fs.mkdirSync(CUR_WORK_DIR + path.sep + "/deploy");
      }
      console.error("> Will create deployment files at: " + DEPLOY_PATH);
    } else {
      DEPLOY_PATH = gamsDevRoot + path.sep + projectAbbr + path.sep + "apps" + path.sep + folderName;
      // check if apps older exists.
      if (!fs.existsSync(gamsDevRoot + path.sep + projectAbbr + path.sep + "apps")) {
        fs.mkdirSync(gamsDevRoot + path.sep + projectAbbr + path.sep + "apps");
        console.log("> No apps folder detected in project. Added 'apps' dir at path: " + DEPLOY_PATH);
      }
    }

    const jsPath = `${DIST_PATH}/static/js`;
    const cssPath = `${DIST_PATH}/static/css`;

    // first check if deploy folder exists
    // delete old deployed folder if existing
    if (fs.existsSync(DEPLOY_PATH)) {
      fs.rmdirSync(DEPLOY_PATH, { recursive: true });
      console.log("> Old deploy folder detected. Removing old deployment files. At path: ", DEPLOY_PATH);
    }

    // create deployment dirs and error check
    if (!fs.existsSync(DEPLOY_PATH)) {
      fs.mkdirSync(DEPLOY_PATH);
      //fs.mkdirSync(`${DEPLOY_PATH}${path.sep}${folderName}`);
      fs.mkdirSync(`${DEPLOY_PATH}${path.sep}js`);
      fs.mkdirSync(`${DEPLOY_PATH}${path.sep}css`);
    } else {
      throw new ReferenceError(
        "> Deployment folder shouldn't exist at this moment. Please close all files (before executing this script) from path: " +
          DEPLOY_PATH
      );
    }

    return new Promise(async (resolve, reject) => {
      // write rendering div to .txt
      fs.appendFileSync(
        DEPLOY_PATH + "/copyMeToYourXSLT.txt",
        `<div id="${folderName}"><xsl:text> </xsl:text></div>\n`,
        (err) => console.log(err)
      );

      // loop through filenames and decide / copy which needed for deployment
      // js files
      let fileNames = await readDirPromised(jsPath);
      fileNames.forEach((fileName, i) => {
        // do not write map files in txt file
        if (!fileName.includes("map")) {
          let xsltName =
            `<script type="text/javascript" src="{$gamsdev}/${projectAbbr}/apps/${folderName}/js/${fileName}"><xsl:text> </xsl:text></script>` +
            "\n";
          fs.appendFileSync(DEPLOY_PATH + "/copyMeToYourXSLT.txt", xsltName, (err) => console.log(err));
          fs.copyFile(`${jsPath}/${fileName}`, `${DEPLOY_PATH}${path.sep}js/${fileName}`, (err) => {
            if (err) reject(err);
          });
        } else {
          // copy source maps
          fs.copyFile(`${jsPath}/${fileName}`, `${DEPLOY_PATH}${path.sep}js/${fileName}`, (err) => {
            if (err) reject(err);
          });
        }
      });

      // css files
      let cssFileNames = await readDirPromised(cssPath);
      cssFileNames.forEach((fileName, i) => {
        if (!fileName.includes("map")) {
          // do not write map files in txt file
          let xsltName =
            `<link rel="stylesheet" type="text/css" href="{$gamsdev}/${projectAbbr}/apps/${folderName}/css/${fileName}"><xsl:text> </xsl:text></link>` +
            "\n";
          fs.appendFileSync(DEPLOY_PATH + "/copyMeToYourXSLT.txt", xsltName, (err) => console.log(err));
          fs.copyFile(`${cssPath}/${fileName}`, `${DEPLOY_PATH}${path.sep}${path.sep}/css/${fileName}`, (err) => {
            if (err) reject(err);
          });
        } else {
          // copy source maps
          fs.copyFile(`${cssPath}/${fileName}`, `${DEPLOY_PATH}${path.sep}${path.sep}/css/${fileName}`, (err) => {
            if (err) reject(err);
          });
        }
      });

      // finish process with logging and resolve promise
      console.log("> Deployment files processed to: ", DEPLOY_PATH);
      console.log("> OPERATION SUCCESFUL");
      console.log("#");
      console.log("####");
      resolve();
    });
  };

  /**
   * Returns list of files in directory as Promise.
   * @returns {Promise<string[]>} String array of files names in given folder.
   */
  const readDirPromised = (folder) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folder, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  };

  return {
    copyDeploymentFiles,
    deployToGamsdev,
  };
})();

module.exports = { ...GamsWidgetDeployer };
