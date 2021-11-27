import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage";
import ScheduleInterview from "./Components/ScheduleInterview";

function App() {
  return (
    <div className="App">
      <h1 className="main_title">Interview Scheduling Portal</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scheduleInterview" element={<ScheduleInterview />} />
      </Routes>
    </div>
  );
}

export default App;
