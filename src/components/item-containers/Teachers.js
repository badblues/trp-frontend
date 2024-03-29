import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/item-list.css";

const Teachers = ({ teachers, onTeacherSelect }) => {
  const { theme } = useContext(UiContext);

  return (
    <>
      <div className={`item-list ${theme}`}>
        <h2 className="caption">
          Преподаватели:
        </h2>
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
    </>
  );
};

export default Teachers;
