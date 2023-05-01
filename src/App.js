// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./Main.js";
import "./App.css";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag("config", "G-649VNLTLLV", {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

const App = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  return (
    <Router basename="/job-letter">
      <AnalyticsTracker />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/job-letter" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
