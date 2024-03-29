import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/item-list.css";

const Disciplines = ({ disciplines, onDisciplineSelect }) => {
  const { theme } = useContext(UiContext);

  return (
    <>
      <div className={`item-list ${theme}`}>
        <h2 className="caption">
          Дисциплины:
        </h2>
        {disciplines.map((discipline) => (
          <div
            className="item-with-border"
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
