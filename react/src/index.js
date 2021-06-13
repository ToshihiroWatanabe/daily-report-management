import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { HashRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <HashRouter>
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MuiThemeProvider>
    </ErrorBoundary>
  </HashRouter>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();

reportWebVitals();
