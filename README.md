# facetedSearch

(deploayed app can be visited here: https://gams.uni-graz.at/webapps/drilldown/#/)

generalised faceted search approach for GAMS-data

To be usable with RDF-Data, SOLR, and eventually even gSearch-Results:

See [wiki](https://zimlab.uni-graz.at/gams/frontend/facetedsearch/-/wikis/home) for the initial considerations.

## Performance considerations

Two main things impact performance:

1. Amount of objects / constraints to be filtered
2. Amount of constraint relations (e.g. one object one constraint VS one object all constraints assigned)

Current workaround(s):

1. Domain specific pre-selection of the data (e.g. handled via <nav> --> "archives in south germany")
2. DANGER ZONE: wait for implemented apache solr workflow (main difficulty = indexing: which elements do I want to
   drill? Digital Objects -- or specific elements from them like text-segments )

## Url / Route paremeters

The route params have following scheme:

.../#/:jsonLoc?/:constraint?/

### jsonLoc

- optional
- may be set to null via "-"
- needs to be encoded
- requests against given json location e.g. https://example.com/appDataJson -- the loaded json must conform to the
  app-data specification of the drilldown app.

- e.g. https://gams.uni-graz.at/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json
- e.g. https://gams.uni-graz.at/webapps/drilldown/#/-/constraint1

### constraint

- optional
- nullable via "-"
- needs encoding
- allows multiple values -> seperation via "|"

- allows to set initially selected constraints for the drilldown operations

e.g https://gams.uni-graz.at/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json/foo|bar|peter|ol

## External styling

### Usage as iframe / external

Own styling via CSS is not possible -- use provided json parameters to style the application according to your needs.

```js

window.drilldown = {
    "gui": {
        // Allows to set a app title 
        // "appTitle": "RTA Drilldown app asds",
        "facetDrill": {
            // each facet contains a small string matching search to filter the contained constraints
            // will disabel the displayed checkmark on user input
            "disableTextSearchMark": "false",
            // configures the default date range of the calendar accordion -- (easier selection for historical dates like 1230 - 1400)
            "dateFacet": {
                "defaultStartDate": "1570-01-01",
                "defaultEndDate": "1900-01-01"
            },
            // activates / deactivates the reset button 
            "enableResetButton": "true",
            // activates / deactivates date drilling functionalities of the app
            "enableDateDrilling": "true",
            // allows to open up all accordions by default
            "expandAllAccordions": "false"
        },
        "visualization": {
            // set to true will disable vizualization on bottom
            "disabled": "true",
        },
        // datatable options
        "datatable": {
            // allows to set number of results displayed via the datatable
            "paginationPerPage": "20",
            // will shrink row to minimal size
            "dense": "false",
            // changing colors between rows
            "striped": "true",
            // title of datatable
            "title": "Gefundende Archivdokumente",
            // rows expanded by default 
            "expandedRows": "true",
            // custom styling of table - see: https://react-data-table-component.netlify.app/?path=/docs/api-custom-styles--page
            // using css-in-javascript notation
            "customStyles": {
                "rows": {
                    "style": {
                        // allows any css property
                        //"background": "lightblue"
                    }
                },
                "headCells": {
                    "style": {
                        //"background": "orange"
                    }
                },
                "cells": {
                    "style": {
                        //"background": "orange"
                    }
                }
            }
        }
    },
    // actual provided data
    "data": {
        "facetConstraintMap": {
            // list of all tags
            "Ort": [
                "Wien",
                "Dresden",
                "..."
            ],
            // data that contains references to tags from above
            "data": [
                {
                    "txt": "demo..",
                    "value": "https://glossa.uni-graz.at/o:rta1576.admbg1#m1.2.14.6t",
                    "date": {
                        "startDate": "1576-05-18",
                        "endDate": "1576-05-18"
                    },
                    "tags": [
                        "Wien",
                        "Dresden"
                    ],
                    "image": {
                        "src": "https://glossa.uni-graz.at/o:vase.2/IMAGE.1",
                        "label": "Studio portrait of Nik. Manolov",
                        // overwrite styling of image element
                        "style": {
                            "width":"400px",
                            "display": "block"
                        }
                    },
                }
            ]
        }
    }
}


```

### Usage as plugin: IDs and Classes

Use the developer tools to search for the individual assigned classes and ids!

1. Each accordion has a generated id according to it's given facet name.
2. The main components have an unique id each: (drilldown_facetAnalysis,drilldown_facetDrill, drilldown_facetResult)

## React App

## Acknowledgments:

- based on Create React App and of React.
    - Typescript Template

## Prerequisites to be installed

- Node.js LTS 12.x
    - Otherwise, newer Versions may require `NODE_OPTIONS=--openssl-legacy-provider npm start`
    - Node Version can be checked with `node --version`
- npm (ships with node.js)
- Prettier plugin
    - [VS Code / OSS](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [WebStorm](https://www.jetbrains.com/help/webstorm/prettier.html)

## Installation

- Clone repo
- copy over the code to your repo / dev environment (maybe own SVN or Gitlab)
- inside the root (where the package.json is) run:

```
npm i
```

- this will install all required dependencies declared in package.json

## Development

```
npm start
```

- starts the development server

#### Note: When developing locally, it might be necessary to add the JSON endpoint as Proxy to package.json to prevent CORS errors.

e.g.:

```
"proxy": "https://gams.uni-graz.at/webapps/drilldown/"
```

## Building and Deployment

you may find an example here: http://gams.uni-graz.at/context:rta1576

### Deployment as Microfrontend

Use the GAMS deployed standalone drilldown app https://gams.uni-graz.at/webapps/drilldown/#/
You have two options:

1. Linking directly to the application
2. Embedding application via iframe

#### Linking

- use server relative addresses! (otherwise a CORS error might occur!)

```html

<a href="/webapps/drilldown/#/LOCATION_OF_MY_JSON">Drilldown search</a>
<!-- with the demo json -->
<a href="/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json">Drilldown search</a>
<!-- sending user to a pre-selection of tags -->
<a href="/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json/Erstenberger, Andreas|Türkenhilfe, allgemein">Drilldown
    search</a>

```

#### Embeding

- use server relative addresses! (otherwise a CORS error might occur!)

```html

<iframe src="/webapps/drilldown/#/LOCATION_OF_MY_JSON"></iframe>
<!-- with the demo json -->
<iframe src="/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json"></iframe>
<!-- sending user to a pre-selection of tags -->
<iframe src="/webapps/drilldown/#/https%3A%2F%2Fgams.uni-graz.at%2Fwebapps%2Fdrilldown%2Frta.json/Erstenberger, Andreas|Türkenhilfe, allgemein"></iframe>

```

### Deployment as plugin

Consists of __three Steps__ (Compile -> Build -> Deploy  )

First you need to enter your gams project specific things inside ./scripts/deploy.js

```js
// REQUIRED
// gamsdev project abbreviation like cantus / dipko / derla / etc.
// e.g. "derla"
let projectAbbr = "rta";
// name of folder that should be created for the app. Should be deployed to gamsdev/myusername/myproject/apps/
// "derla_mapp_app" or "corema_fuzzy" etc.
// should follow same name as id for render-div
let folderName = "rtasearchapp";

```

Second, change the id in /src/index.tsx to your defined gams project abbreviation.

```js
// inside ./src/index.tsx 

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/:jsonLoc?/:constraint?/">
        <App />
      </Route>
    </Switch>
  </HashRouter>,
  // THIS ID HERE - MUST BE SAME AS projectAbbr from before
  document.getElementById("rta")
);

```

Then run script at project root:

```sh
# cd into project dir first
npm run zim-build-deploy
```

This script will do following things:

1. Compiling the application (creating a build folder at this project's root with original compiled files - usually you
   don't need these )
2. Creates a deployment ready GAMS-setup under ./deploy

After creating the GAMS-deployment

- Copy over created app folder from deploy to your gamsdev/PROJECT_ABBR/apps/
- Copy generated xslt snippet inside deployment files to your xsl-stylesheet. (depending where you want the app to be
  rendered to)

## React production steps (background / theory)

1. Basically you need to __copy over the static files (inside "static"-folder)__ created in the "dist" folder to your
   gamsdev and link them with link and script tags.

2. You need to assign a __container to where your React App should render to__:
   Usually it's a div with id="root" or id="app". This element must be rendered / appplied
   to the DOM before the actual React-script runs.

- __Change that default id__ via changing the id selector inside __/src/index.tsx__

### What does the deployment script do? (theoretical background)

    1. builds the application (usually the command is "npm run build" --- the specific buildAsMultiApp was set up along
       with rewire.js to allow multiple react apps on one page.)

    2. Basically you need to __copy over the static files (inside "static"-folder)__ created in the "dist" folder to
       your
       gamsdev and link them with link and script tags.

    3. You need to assign a __container to where your React App should render to__:
       Usually it's a div with id="root" or id="app". This element must be rendered / appplied
       to the DOM before the actual React-script runs.
- __Change that default id__ via changing the id selector inside __/src/index.tsx__ 

