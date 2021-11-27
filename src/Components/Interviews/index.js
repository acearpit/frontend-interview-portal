import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Interviews.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Interviews = () => {
  const [interviews, setIntervews] = useState([]);

  const getInterviews = async () => {
    const res = await axios.get("https://backend-interview-portal.herokuapp.com/interviews");
    setIntervews(res.data);
  };

  const deleteInterview = async (id) => {
    await axios.delete(`https://backend-interview-portal.herokuapp.com/deleteInterview/${id}`);

    const updatedInterviews = interviews.filter((interview) => interview._id !== id);

    setIntervews(updatedInterviews);
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return (
    <div className="interviews">
      {interviews.length === 0 ? (
        <p>No interviews scheduled for now!</p>
      ) : (
        <>
          <div className="heading_row">
            <div className="id">Interview Id</div>
            <div className="timeHeading">Start Time</div>
            <div className="timeHeading">End Time</div>
            <div className="edit">Edit</div>
            <div className="delete">Delete</div>
          </div>
          {interviews.map((interview, id) => {
            return (
              <div className="heading_row normal_row" key={id}>
                <div className="id">{id + 1}</div>
                <div className="timeHeading">{moment(interview.startTime).format("D MMMM, YYYY @ h:mm a")}</div>
                <div className="timeHeading">{moment(interview.endTime).format("D MMMM, YYYY @ h:mm a")}</div>
                <Link
                  to="/scheduleInterview"
                  state={{
                    interviewData: {
                      ...interview,
                      date: moment(interview.date).format("yyyy-MM-DD"),
                      startTime: moment(interview.startTime).format("HH:mm"),
                      endTime: moment(interview.endTime).format("HH:mm"),
                    },
                  }}
                  className="edit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>
                <div className="delete" onClick={(e) => deleteInterview(interview._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Interviews;
