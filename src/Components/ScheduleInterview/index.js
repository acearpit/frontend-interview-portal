import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ScheduleInterview.css";
import { createBrowserHistory } from "history";
import axios from "axios";
import moment from "moment";

const ScheduleInterview = () => {
  const [interview, setInterview] = useState({
    date: moment(new Date()).format("yyyy-MM-DD"),
    startTime: moment(new Date()).format("HH:mm"),
    endTime: moment(new Date()).format("HH:mm"),
    participants: [],
  });
  const [participants, setParticipants] = useState([]);

  const location = useLocation();
  const history = createBrowserHistory();

  useEffect(() => {
    const getParticipants = async () => {
      const res = await axios.get("https://backend-interview-portal.herokuapp.com/getParticipants");

      const toAdd = res.data.filter((participant) => !participant.isAdmin && interview.participants.findIndex((part) => part.userId === participant.userId) === -1);

      setParticipants(toAdd);
    };

    getParticipants();
  }, [interview]);

  const scheduleInterview = async () => {
    const stime = moment(`${interview.date} ${interview.startTime}`, "YYYY-MM-DD HH:mm:ss").format();
    const etime = moment(`${interview.date} ${interview.endTime}`, "YYYY-MM-DD HH:mm:ss").format();

    if (etime <= stime) {
      alert("Please select valid interview timings!");
      return;
    }

    try {
      await axios.put(
        "https://backend-interview-portal.herokuapp.com/scheduleInterview",
        { ...interview, startTime: stime, endTime: etime },
        {
          headers: {
            ...axios.defaults.headers,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      history.back();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const addParticipant = (p) => {
    const newParticipants = participants.filter((participant) => participant.userId !== p.userId);
    setParticipants(newParticipants);

    setInterview({ ...interview, participants: [...interview.participants, p] });
  };

  const deleteParticipant = (p) => {
    setParticipants([...participants, p]);

    setInterview({ ...interview, participants: interview.participants.filter((participant) => participant.userId !== p.userId) });
  };

  useEffect(() => {
    const data = location.state.interviewData;
    setInterview(data);
  }, [location.state]);

  return (
    <div className="scheduleInterview">
      <div className="timeSelect">
        <div className="time">
          <h3>Date</h3>
          <input type="date" value={interview.date} onChange={(e) => setInterview({ ...interview, date: e.target.value })} />
        </div>

        <div className="time">
          <h3>Start Time</h3>
          <input type="time" value={interview.startTime} onChange={(e) => setInterview({ ...interview, startTime: e.target.value })} />
        </div>

        <div className="time">
          <h3>End Time</h3>
          <input type="time" value={interview.endTime} onChange={(e) => setInterview({ ...interview, endTime: e.target.value })} />
        </div>
      </div>

      <div className="included_participants">
        <h3>Included Participants</h3>

        {interview.participants.length ? (
          <div className="participants_table">
            <div className="header">
              <div className="p_id">Participant Id</div>
              <div className="p_name">Participant Name</div>
              <div className="p_email">Participant Email</div>
              <div className="p_remove">Remove Participant</div>
            </div>

            {interview.participants.map((participant) => {
              return (
                <div className="data" key={participant.userId}>
                  <div className="p_id">{participant.userId}</div>
                  <div className="p_name">{participant.name}</div>
                  <div className="p_email">{participant.email}</div>
                  <div className="p_remove" onClick={(e) => deleteParticipant(participant)}>
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
          </div>
        ) : (
          <p className="no_participants">There are no participants in this interview yet!</p>
        )}
      </div>

      <div className="included_participants">
        <h3>Add Participants</h3>

        {participants.length > 0 ? (
          <div className="participants_table">
            <div className="header">
              <div className="p_id">Participant Id</div>
              <div className="p_name">Participant Name</div>
              <div className="p_email">Participant Email</div>
              <div className="p_remove">Add Participant</div>
            </div>

            {participants.map((participant) => {
              return (
                <div className="data" key={participant.userId}>
                  <div className="p_id">{participant.userId}</div>
                  <div className="p_name">{participant.name}</div>
                  <div className="p_email">{participant.email}</div>
                  <div className="p_remove" style={{ color: "green" }} onClick={(e) => addParticipant(participant)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no_participants">There are no more participants available!</p>
        )}
      </div>

      <button className="schedule_interview_now" onClick={scheduleInterview}>
        {interview._id ? "Reschedule Interview" : "Schedule Interview"}
      </button>
    </div>
  );
};

export default ScheduleInterview;
