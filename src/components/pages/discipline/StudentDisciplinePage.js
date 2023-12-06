import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import "./DisciplinePage.css";
import Tasks from "../../Tasks";

const StudentDisciplinePage = ({ discipline }) => {
  const { darkMode } = useContext(UiContext);

  return (
    <div>
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Лабораторные работы:</h2>
      <Tasks disciplineId={discipline.id}/>
    </div>
  );
}

export default StudentDisciplinePage;