import { useState, useContext } from "react";
// import AuthContext from "../contexts/AuthContext";
import axios from "axios";

function Login() {
  // const auth = useContext();

  const [credentials, setCredentials] = useState({
    username: "username",
    password: "password",
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
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    auth.logout();
    setData("You have logged out");
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

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/api/auth/profile", {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });
  //     setData(data.message);
  //     console.log(data.message);
  //   } catch (error) {
  //     console.log(error);
  //     setData(error.message);
  //   }
  // };

  return (
    <div>
      <div>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={register}>
          Register
        </button>
      </div>
      {/* <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div> */}

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
