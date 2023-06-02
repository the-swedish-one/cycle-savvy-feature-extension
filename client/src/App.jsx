import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <nav className="navbar">
        <ul className="navbarUL">
          <li>
            <img src="../CycleSavvyLogoTransparent2.png" alt="" width="200px" />
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
