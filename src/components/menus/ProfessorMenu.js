import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { UiContext } from "../../contexts/UiContext";

const ProfessorMenu = () => {
  const { darkMode } = useContext(UiContext);

  return (
    <div className="menu">
    </div>
  );
};

export default ProfessorMenu;
