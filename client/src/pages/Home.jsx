import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);

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

  const handleChange = (event) => {
    const inputDate = event.target.value;
    console.log(inputDate);
    setCycleStartDate(inputDate);
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
