import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import AuthContext from "./contexts/AuthContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  function login(username, password) {
    // login
    setUser(true);
    console.log("login");
  }

  function logout() {
    // logout
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
      <>
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </>
      //{" "}
    </AuthContext.Provider>
  );
}

export default App;
