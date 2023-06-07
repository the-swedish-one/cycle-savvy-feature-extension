import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./styles.css";

export default function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar row">
        <ul className="navbarUL">
          <div className="col">
            <li className="logo">
              <img
                src="../CycleSavvyLogoTransparent2.png"
                alt=""
                width="200px"
              />
            </li>
          </div>
          <div className="d-flex ms-auto">
            <li className="nav-item">
              {auth.user && (
                <Link
                  to="/profile"
                  className="btn-nav nav-link text-decoration-none"
                >
                  My Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              {auth.user ? (
                <button className="btn-nav nav-link" onClick={auth.logout}>
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn-nav nav-link text-decoration-none text-center"
                >
                  Login
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
