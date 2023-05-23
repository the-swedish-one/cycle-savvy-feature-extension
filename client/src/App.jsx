import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";

function App() {
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      setCurrentDate(today.toLocaleString());
    };

    getCurrentDate();
  }, []);

  const calculateDifference = (e) => {
    e.preventDefault();
    const differenceInMilliseconds =
      new Date() - new Date(cycleStartDate);
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setDifferenceInDays(differenceInDays);
  };

  const handleChange = (event) => {
    setCycleStartDate(event.target.value);
  };

  return (
    <>
      <h1>Hello</h1>
      <h3>Current Date: {currentDate}</h3>
      <form onSubmit={calculateDifference}>
        <label>What is the date of the start of your current cycle? </label>
        <input type="date" value={cycleStartDate} onChange={handleChange} />
        <button>Submit</button>
      </form>

      <h3>Your current cycle started on {cycleStartDate}</h3>
      {differenceInDays !== null && (
        <h3>You are currently on day {differenceInDays} of your cycle</h3>
      )}
    </>
  );
}

export default App;







{
  /* <nav>
        <ul>
          <li>
            <Link to="/">Go back to home page</Link>
          </li>
          <li>
            <Link to="/students">Go back to students</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
      </Routes> */
}
