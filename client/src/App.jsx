import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar/NavBar";
import AuthContext from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  function login(username, password) {
    setUser(true);
    console.log("login");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(false);
    console.log("logout");
  }

  const authObject = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authObject}>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
