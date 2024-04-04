import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/item-list.css";
import { Discipline } from "../../models/domain/Discipline.ts";
import { HalfYear } from "../../models/domain/HalfYear.ts";

interface Props {
  disciplines: Discipline[];
  onDisciplineSelect: (discipline: Discipline) => void;
}

const Disciplines: React.FC<Props> = ({ disciplines, onDisciplineSelect }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`item-list ${theme}`}>
      <h2 className="caption">Дисциплины:</h2>
      {disciplines.map((discipline) => (
        <div
          className="item-with-border"
          onClick={() => onDisciplineSelect(discipline)}
          key={discipline.id}
        >
          <p>{discipline.name}</p>
          <p>{discipline.year}</p>
          <p>
            Полугодие:{" "}
            {discipline.halfYear === HalfYear.First ? "Первое" : "Второе"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Disciplines;
