import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./FakeTaskAppointments.css";

function FakeTaskAppointments() {
  const { darkMode } = useContext(UiContext);

  return (
    <div className="fake-task-appointments-list">
      <div className={`fake-group-name ${darkMode ? "dark-mode" : ""}`}></div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
      <div className="fake-task-appointment">
        <div
          className={`fake-student-name ${darkMode ? "dark-mode" : ""}`}
        ></div>
        <div
          className={`fake-appointment ${darkMode ? "dark-mode" : ""}`}
        ></div>
      </div>
    </div>
  );
}

export default FakeTaskAppointments;
