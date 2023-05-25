import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../App.css";
import Symptoms from "./Symptoms";
import { Button } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CardComponent from "../components/CardComponent";

const dayjs = new AdapterDayjs();
const foo = () => console.log("bla");

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState(dayjs.dayjs(new Date()));
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

  console.log({ cycleStartDate: dayjs.toISO(cycleStartDate) });
  const handleChange = (value) => {
    // const inputDate = event.target.value;
    // console.log(inputDate);
    setCycleStartDate(value);
  };

  const calculateDifference = (e) => {
    e.preventDefault();
    const differenceInMilliseconds = new Date() - new Date(cycleStartDate);
    const differenceInDays =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
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
      <div className="heroContainer">
        <h1>Welcome, User!</h1>
        {/* <h5 className="todayDate">Today is {currentDate}</h5> */}

        <form onSubmit={calculateDifference} className="formContainer">
          <h4 className="form-label">
            Please select the start date of your current cycle
          </h4>

          <CardComponent logevent={foo}>
            <div className="containerInputAndButton">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={cycleStartDate} onChange={handleChange} />
              </LocalizationProvider>
              {/* <input
            type="date"
            value={cycleStartDate}
            onChange={handleChange}
            className="form-control-sm"
          /> */}
              <button type="submit" className="btn">
                Apply
              </button>
            </div>
          </CardComponent>
        </form>
      </div>

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
            <section className="containerSymptomsAndTips">
              <ul className="symptomsContainer">
                {symptoms.map((symptom) => (
                  <li key={symptom.id} className="symptomListItem">
                    {symptom["symptom_name"]}
                  </li>
                ))}
              </ul>

              <div className="tipsContainer">
                Self-care tips and Partner-support tips
              </div>
            </section>
          )
        )}
      </div>
    </>
  );
}
