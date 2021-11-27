import React from "react";
import "./Homepage.css";
import Interviews from "../Interviews";
import { Link } from "react-router-dom";
import moment from "moment";

const HomePage = () => {
  return (
    <div className="homepage__container">
      <div>
        <h3 className="scheduled__interviews">Scheduled Interviews</h3>
        <Link
          className="new_interview"
          to="/scheduleInterview"
          state={{
            interviewData: {
              date: moment(new Date()).format("yyyy-MM-DD"),
              startTime: moment(new Date()).format("HH:mm"),
              endTime: moment(new Date()).format("HH:mm"),
              participants: [],
            },
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Schedule
        </Link>
      </div>
      <Interviews />
    </div>
  );
};

export default HomePage;
