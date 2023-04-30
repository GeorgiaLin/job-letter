import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";

const baseUrl =
  document.getElementsByTagName("base")[0]?.getAttribute("href") || "/";
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Router basename={baseUrl}>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
