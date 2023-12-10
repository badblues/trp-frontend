import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import "./DisciplinePage.css";
import Tasks from "../../Tasks";
import { useNavigate } from "react-router-dom";

const StudentDisciplinePage = ({ discipline }) => {
  const { darkMode } = useContext(UiContext);
  const navigate = useNavigate();

  const navigateToTask = (task) => {
    navigate(`/tasks/${task.id}`)
  }

  return (
    <div className="page-container">
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Лабораторные работы:</h2>
        <Tasks disciplineId={discipline.id} onSelect={navigateToTask}/>
      </div>
    </div>
  );
}

export default StudentDisciplinePage;