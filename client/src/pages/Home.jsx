import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../App.css";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CardComponent from "../components/CardComponent";
import TipsContainer from "../components/TipsContainer";

const dayjs = new AdapterDayjs();

export default function Home() {
  const [cycleStartDate, setCycleStartDate] = useState(dayjs.dayjs(new Date()));
  const [cycleLength, setCycleLength] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDayOfCycle, setCurrentDayOfCycle] = useState("");
  const [error, setError] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [didPagePrepopulate, setDidPagePrepopulate] = useState(false);
  // const [selectedSymptom, setSelectedSymptom] = useState("");
  const [queryParams, setQueryParams] = useSearchParams();

  const scrollReference = useRef(null);

  //this useEffect calculates current date on page reload. Current date is used in calculating the cycle day
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      setCurrentDate(today);
    };
    getCurrentDate();
  }, []);

  //this useEffect gets query params from the URL
  useEffect(() => {
    const cycleStartDateQuery = new Date(queryParams.get("cycleStartDate"));
    const cycleLengthQuery = queryParams.get("cycleLength");

    //if the following conditions are true, it means that the page was pre-populated with inputs
    if (cycleLengthQuery && cycleStartDateQuery) {
      // console.log(cycleLengthQuery);
      setCycleStartDate(dayjs.dayjs(cycleStartDateQuery));
      setCycleLength(cycleLengthQuery);
      setDidPagePrepopulate(true);
    }
  }, []);

  //following the previous function, if page WAS pre-populated, this is to call the showDayOfCycle function with pre-populated inputs
  useEffect(() => {
    if (didPagePrepopulate) {
      showDayOfCycle();
      setDidPagePrepopulate(false);
    }
  }, [didPagePrepopulate]);

  //change event handler for the calendar, i.e. start date of the current cycle
  const handleChangeCycleStart = (value) => {
    setCycleStartDate(value);
  };

  //change event handler for the input tag, i.e. average length of cycle
  const handleChangeCycleLength = (event) => {
    setCycleLength(event.target.value);
  };

  //function that calculates difference between current date and cycle start date to show the current day of cycle
  const showDayOfCycle = (e) => {
    e?.preventDefault();

    //main calculation
    const differenceInMilliseconds = currentDate - new Date(cycleStartDate);
    const currentDayOfCycle =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    //setter for current day of cycle
    setCurrentDayOfCycle(currentDayOfCycle);
    //set loading to true for the animation to appear
    setIsLoading(true);

    //set query params in the url (save them for shareability)
    if (e) {
      setQueryParams({
        cycleStartDate: cycleStartDate.toISOString().split("T")[0],
        cycleLength,
      });
    }

    // console.log(scrollReference.current);
    const executeScroll = () =>
      scrollReference.current.scrollIntoView({
        inline: "center",
        behavior: "smooth",
        alignToTop: false,
        block: "nearest",
      });

    executeScroll();

    //setting timeout for the "loading" animation to stay on screen for 3 seconds before loading results
    setTimeout(() => {
      //set loading to false for the animation to disappear
      setIsLoading(false);
      showSymptoms(currentDayOfCycle);
    }, 3000);
  };

  //function to make symptoms for the specific day of cycle appear based on the user input
  const showSymptoms = async (day) => {
    //API call to the backend to fetch symptoms for the specific day
    try {
      const response = await fetch(
        `api/symptoms/days/${Math.round((day * 28) / cycleLength)}` // the formula to prorate day of cycle based on average cycle length (the database has a total of 28 days)
      );
      const data = await response.json();
      setSymptoms(data);
      if (!response.ok) throw new Error(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  //if symptoms are changed (i.e. on page load because input was pre-populated), get queryParams if symptom was selected
  useEffect(() => {
    if (symptoms) {
      const selectedSymptomIDQuery = queryParams.get("selectedSymptomID"); //selectedSymptomID is a number (ID)

      //now use the pre-populated selected symptom's ID as an argument in showTips and call showTips
      //showTips(selectedSymptomIDQuery);
    }
  }, [symptoms]);

  //show tips upon clicking on a particular symptom; symptom's id is passed as an argument
  // const showTips = (id) => {
  //   //set selectedSymptom on click, this will be used to show related tips; find returns the symptom object
  //   const newSelectedSymptom = symptoms.find(
  //     (symptom) => symptom.id === parseInt(id) //parseInt is needed to turn string into a number because if pre-populated in the url, queryParams return a string
  //   );

  //   //set selected symptom with the symptom found per its id
  //   setSelectedSymptom(newSelectedSymptom);

  //   //set query params in the url (previousParams already include cycleLength and cycleStartDate, now add selectedSymptomID)
  //   // setQueryParams((previousParams) => {
  //   //   previousParams.set("selectedSymptomID", id);
  //   //   return previousParams;
  //   // });
  // };

  const selectedSymptom = symptoms?.find(
    (symptom) => symptom.id === parseInt(queryParams.get("selectedSymptomID")) //parseInt is needed to turn string into a number because if pre-populated in the url, queryParams return a string
  );
  console.log(selectedSymptom);

  return (
    <>
      <div className="heroContainer">
        <div className="heroText">
          <div className="heroSection">
            <h1>Meet CycleSavvy</h1>
            <h4>
              She is here to empower individuals to embrace their bodies,
              celebrate their uniqueness, and foster healthier relationships
            </h4>
          </div>
          <div>
            <p>
              CycleSavvy is your trusted web app companion for understanding and
              embracing the menstrual cycle. Discover what symptoms are
              completely normal to experience today and how you can help your
              well-being.
            </p>
            <p>
              CycleSavvy recognizes the vital role that partners play in this
              journey. Understanding that a little support can go a long way,
              she provides partner-support tips to help them become
              compassionate allies.
            </p>
          </div>
        </div>

        <form onSubmit={showDayOfCycle} className="formContainer">
          <CardComponent>
            <div className="containerInputCycleLength">
              <h5>What is the average length of your cycle (in days)?</h5>
              <input
                type="number"
                placeholder="e.g. 28"
                value={cycleLength}
                onChange={handleChangeCycleLength}
                className="form-control cycleLengthInput"
                required
              />
              <h5>
                What is the start date of your current cycle?
                <br />
                (What was the first day of your last period?)
              </h5>
            </div>

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

      {currentDayOfCycle !== null && (
        <div className="resultContainer">
          {/* <h3>Your current cycle started on {cycleStartDate}</h3> */}
          <h3 className="dayOfCycleText">
            You are currently on day {currentDayOfCycle} of your cycle
          </h3>
          <h4>
            Remember that experiencing any of the following symptoms today is
            totally normal:
          </h4>
        </div>
      )}

      <div className="containerSymptomsOrLoading" ref={scrollReference}>
        {isLoading ? (
          <div className="typewriter">
            <div className="slide">
              <i></i>
            </div>
            <div className="paper"></div>
            <div className="keyboard"></div>
          </div>
        ) : (
          symptoms[0] && (
            <section className="containerSymptomsAndTips">
              <ul className="symptomsContainer">
                {symptoms.map((symptom) => (
                  <li key={symptom.id} className="symptomListItem">
                    <Link
                      to={`/home?cycleStartDate=${queryParams.get(
                        "cycleStartDate"
                      )}&cycleLength=${queryParams.get(
                        "cycleLength"
                      )}&selectedSymptomID=${symptom.id}`}
                      className="symptomListItemText"
                    >
                      {symptom["symptomName"]}
                    </Link>
                  </li>
                ))}
              </ul>

              <TipsContainer
                selectedSymptom={selectedSymptom}
                symptoms={symptoms}
              />
            </section>
          )
        )}
      </div>
    </>
  );
}
