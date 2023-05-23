import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
      <input type="date" />
      <nav>
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
      </Routes>
    </>
  );
}

export default App;
