import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Teachers.css";

const Teachers = ({ teachers, onTeacherSelect }) => {
  const { darkMode } = useContext(UiContext);

  return (
    <>
      <div className="teachers-container">
        <h2 className={`teachers-caption ${darkMode ? "dark-mode" : ""}`}>
          Преподаватели:
        </h2>
        {teachers.map((teacher) => (
          <div
            className={`teacher-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => onTeacherSelect(teacher)}
            key={teacher.id}
          >
            <p>{teacher.fullName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teachers;
