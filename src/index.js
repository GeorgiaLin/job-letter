import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import ReactGA from "react-ga";
import reportWebVitals from "./reportWebVitals.js";

// Initialize Google Analytics with your Tracking ID
ReactGA.initialize("G-649VNLTLLV");

// Track page views
ReactGA.pageview(window.location.pathname + window.location.search);

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
