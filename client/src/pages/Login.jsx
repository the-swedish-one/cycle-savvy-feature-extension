import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import "./login.css";

function Login() {
  const auth = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      auth.login();
      console.log(data.message, data.token);
      setData(data.message);
      return (
        <div>
          <Navigate to="/home" />
        </div>
      );
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const register = async () => {
    try {
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,
      });

      console.log(data.message);
      setData(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-center mt-5">Welcome to Cycle Savvy!</h3>
        <h4 className="text-center mt-3">Login or sign up here</h4>
        <div className="d-flex mt-5 justify-content-center">
          <input
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
            className="form-control mb-2 w-25"
          />
        </div>
        <div className="d-flex justify-content-center">
          <input
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
            className="form-control mb-4 w-25"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className=" btn btn-outline-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
