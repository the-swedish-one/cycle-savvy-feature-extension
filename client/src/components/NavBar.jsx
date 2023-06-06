import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "./styles.css";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbarUL">
          <li>
            <img src="../CycleSavvyLogoTransparent2.png" alt="" width="200px" />
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
