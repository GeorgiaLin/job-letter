import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Main from "./Main.js";
import "./App.css";

const App = () => {
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
