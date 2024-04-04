import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/item-list.css";
import { Teacher } from "../../models/domain/Teacher.ts";

interface Props {
  teachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
}

const Teachers: React.FC<Props> = ({ teachers, onTeacherSelect }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`item-list ${theme}`}>
      <h2 className="caption">Преподаватели:</h2>
      {teachers.map((teacher) => (
        <div
          className="item-with-border"
          onClick={() => onTeacherSelect(teacher)}
          key={teacher.id}
        >
          <p>{teacher.fullName}</p>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
