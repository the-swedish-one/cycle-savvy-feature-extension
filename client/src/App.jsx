import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Symptom from "./pages/Symptom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home page</Link>
          </li>
          <li>
            <Link to="/symptoms">Symptoms</Link>
          </li>
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
