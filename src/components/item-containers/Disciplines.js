import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Disciplines.css";

const Disciplines = ({ disciplines, onDisciplineSelect }) => {
  const { darkMode } = useContext(UiContext);

  return (
    <>
      <div className="disciplines-container">
        <h2 className={`disciplines-caption ${darkMode ? "dark-mode" : ""}`}>
          Дисциплины:
        </h2>
        {disciplines.map((discipline) => (
          <div
            className={`discipline-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => onDisciplineSelect(discipline)}
            key={discipline.id}
          >
            <p>{discipline.name}</p>
            <p>{discipline.year}</p>
            <p>
              Полугодие: {discipline.halfYear === "FIRST" ? "Первое" : "Второе"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Disciplines;
