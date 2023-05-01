// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID);
};

export const trackPageView = () => {
  ReactGA.send("pageview");
};
