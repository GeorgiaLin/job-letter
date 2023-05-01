import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import ReactGA from "react-ga4";
import reportWebVitals from "./reportWebVitals.js";

// src/analytics.js

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID);
};

export const trackPageView = () => {
  ReactGA.send("pageview");
};

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
