import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./Main.js";
import "./App.css";
import { initGA, trackPageView } from "./analytics.js";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA("G-649VNLTLLV"); // Replace G-XXXXXXXXXX with your Measurement ID

    const unlisten = Router.browserHistory.listen(() => {
      trackPageView();
    });

    return () => {
      unlisten(); // Clean up the listener when the component is unmounted
    };
  }, [location]);
  const [personalInfo, setPersonalInfo] = useState({});

  return (
    <Router basename="/job-letter">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/job-letter" element={<Main />} />
      </Routes>
    </Router>
    // <div>
    //   <h1>Hello, World!</h1>
    // </div>
  );
};
export default App;
