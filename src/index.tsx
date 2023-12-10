import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import App from "./components";
import "./styles/index.css";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/:jsonLoc?/:constraint?/">
        <App />
      </Route>
    </Switch>
  </HashRouter>,
  document.getElementById("rta")
);
