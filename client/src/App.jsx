import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Symptom from "./pages/Symptom";

function App() {
  return (
    <>
      <nav className="navbar">
        <ul className="navbarUL">
          <li><img src="../CycleSavvyLogoTransparent2.png" alt="" width="200px"/></li>
        </ul>
      </nav>

      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace={true} />}> */}
          <Route path="/" element={<Home />}>
            <Route path="/:id" element={<Symptom />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
