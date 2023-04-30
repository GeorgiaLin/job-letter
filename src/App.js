import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Main from "./Main.js";
import "./App.css";

const App = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};
export default App;
