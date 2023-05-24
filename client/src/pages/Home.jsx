import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../App.css";
import Symptoms from "./Symptoms";
import { Button } from "@mui/material";
// import { DateCalendar } from "@mui/x-date-pickers";

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);
  const [error, setError] = useState("");
  const [symptoms, setSymptoms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      setCurrentDate(today.toString().substring(0, 15));
    };

    getCurrentDate();
  }, []);

  const handleChange = (event) => {
    const inputDate = event.target.value;
    console.log(inputDate);
    setCycleStartDate(inputDate);
  };

  const calculateDifference = (e) => {
    e.preventDefault();
    const differenceInMilliseconds = new Date() - new Date(cycleStartDate);
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setDifferenceInDays(differenceInDays);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSymptoms(differenceInDays);
    }, 3000);
  };

  const showSymptoms = async (day) => {
    try {
      const response = await fetch(`api/users/days/${day}/symptoms`);
      // console.log("line 40");
      console.log(response);
      const data = await response.json();
      console.log(data);
      setSymptoms(data);
      console.log(symptoms);
      if (!response.ok) throw new Error(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Welcome, User!</h1>
      <h5 className="todayDate">Today is {currentDate}</h5>

      <form onSubmit={calculateDifference} className="formContainer">
        <h4 className="form-label">
          Please select the start date of your current cycle
        </h4>
        <div className="containerInputAndButton">
          <input
            type="date"
            value={cycleStartDate}
            onChange={handleChange}
            className="form-control-sm"
          />
          <div className="btnContainer">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
      </form>

      {differenceInDays !== null && (
        <div className="resultContainer">
          {/* <h3>Your current cycle started on {cycleStartDate}</h3> */}
          <h3>You are currently on day {differenceInDays} of your cycle</h3>
          <h4>And here are the symptoms you may experience today:</h4>
        </div>
      )}

      <div className="containerSymptomsOrLoading">
        {isLoading ? (
          <div className="typewriter">
            <div className="slide">
              <i></i>
            </div>
            <div className="paper"></div>
            <div className="keyboard"></div>
          </div>
        ) : (
          symptoms && (
            <ul className="symptomsContainer">
              {symptoms.map((symptom) => (
                <li key={symptom.id} className="symptomListItem">{symptom["symptom_name"]}</li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
}
