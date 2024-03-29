import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/fake-task-appointments.css";

function FakeTaskAppointments() {
  const { theme } = useContext(UiContext);

  return (
    <div className={`fake-task-appointments-list ${theme}`}>
      <div className="fake-group-name"></div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
      <div className="fake-task-appointment">
        <div className="fake-student-name"></div>
        <div className="fake-appointment"></div>
      </div>
    </div>
  );
}

export default FakeTaskAppointments;
