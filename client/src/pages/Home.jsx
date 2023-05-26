import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Symptom from "./Symptom";
import "../App.css";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CardComponent from "../components/CardComponent";

const dayjs = new AdapterDayjs();
const foo = () => console.log("bla");

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState(dayjs.dayjs(new Date()));
  const [cycleLength, setCycleLength] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);
  const [error, setError] = useState("");
  const [symptoms, setSymptoms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSymptomForTips, setSelectedSymptomForTips] = useState({});

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      setCurrentDate(today.toString().substring(0, 15));
    };

    getCurrentDate();
  }, []);

  const handleChangeCycleStart = (value) => {
    setCycleStartDate(value);
  };

  const handleChangeCycleLength = (event) => {
    setCycleLength(event.target.value);
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
      const response = await fetch(
        `api/users/days/${Math.round((day * 28) / cycleLength)}/symptoms`
      );
      // console.log(response);
      const data = await response.json();
      console.log(Math.round((day * 28) / cycleLength));
      setSymptoms(data);
      // console.log(symptoms);
      if (!response.ok) throw new Error(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const showTips = (id) => {
    // console.log(id);
    const selectedSymptom = symptoms.filter((symptom) => symptom.id === id);
    setSelectedSymptomForTips(selectedSymptom[0]);
    // console.log(symptoms);
    // console.log(selectedSymptom);
    // console.log(selectedSymptomForTips);
  };

  return (
    <>
      <div className="heroContainer">
        <div className="heroText">
          <h1>Welcome, User!</h1>
        </div>

        <form onSubmit={calculateDifference} className="formContainer">
          <CardComponent>
            <h5 className="form-label">
              What is the average length of your cycle?
            </h5>
            <input
              type="number"
              value={cycleLength}
              onChange={handleChangeCycleLength}
              className="form-control-sm"
            />
            <h5 className="form-label">
              What day did your current cycle start? (What was the first day of
              your last period?)
            </h5>

            <div className="containerInputAndButton">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={cycleStartDate}
                  onChange={handleChangeCycleStart}
                />
              </LocalizationProvider>
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
                  <li
                    key={symptom.id}
                    onClick={() => showTips(symptom.id)}
                    className="symptomListItem"
                  >
                    {symptom["symptom_name"]}
                  </li>
                ))}
              </ul>

              <div className="tipsContainer">
                <h6>Self-care tips</h6>
                <p>
                  {selectedSymptomForTips &&
                    selectedSymptomForTips["self_care_tips"]}
                </p>
                <h6>Partner-support tips</h6>
                <p>
                  {selectedSymptomForTips &&
                    selectedSymptomForTips["partner_support_tips"]}
                </p>
              </div>
            </section>
          )
        )}
      </div>
    </>
  );
}
