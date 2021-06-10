import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>
  </HashRouter>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();

reportWebVitals();
