import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Symptoms from "./pages/Symptoms";

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
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<Symptoms />} />
      </Routes>
    </>
  );
}

export default App;
