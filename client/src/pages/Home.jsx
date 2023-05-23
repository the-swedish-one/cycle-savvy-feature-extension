import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      setCurrentDate(today.toLocaleString().substring(0, 10));
    };

    getCurrentDate();
  }, []);

  const calculateDifference = (e) => {
    e.preventDefault();
    const differenceInMilliseconds = new Date() - new Date(cycleStartDate);
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setDifferenceInDays(differenceInDays);
  };

  // console.log(differenceInDays)

  const handleChange = (event) => {
    const inputDate = event.target.value;
    console.log(inputDate);
    setCycleStartDate(inputDate);
  };

  const showSymptoms = async (day) => {
    try {
      const response = await fetch(`api/users/days/${day}/symptoms`);
      // console.log("line 40");
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message);
    }
    catch (err) {
      setError(err.message);
    }
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
        <div>
          <h3>You are currently on day {differenceInDays} of your cycle</h3>
          <h4 onClick={() => showSymptoms(differenceInDays)}>
            Here are the symptoms you may experience today:
          </h4>
        </div>
      )}
    </>
  );
}
