import React, { useContext } from "react";
import { UiContext } from "../contexts/UiContext";
import "./Disciplines.css";

const Disciplines = (props) => {

  const {darkMode} = useContext(UiContext);
  const { disciplines } = props;

  return (
    <>
      <div className="disciplines-container">
        {disciplines.map((discipline) => (
          <div className={`discipline-item ${darkMode ? "dark-mode" : ""}`} key={discipline.id}>
            <p>{discipline.name} {discipline.year} {discipline.halfYear}</p> 
          </div>
        ))}
      </div>
    </>
  );
};

export default Disciplines;
