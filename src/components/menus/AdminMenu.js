import React, { useContext } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import { UiContext } from "../../contexts/UiContext";

const AdminMenu = () => {
  const { darkMode } = useContext(UiContext);

  return (
    <div className="menu">
      <Link
        to="/create-user"
        className={`menu-option ${darkMode ? "dark-mode" : ""}`}
      >
        Создать пользователя
      </Link>
      <Link
        to="/create-discipline"
        className={`menu-option ${darkMode ? "dark-mode" : ""}`}
      >
        Создать дисциплину
      </Link>
      <Link
        to="/create-group"
        className={`menu-option ${darkMode ? "dark-mode" : ""}`}
      >
        Создать группу
      </Link>
    </div>
  );
};

export default AdminMenu;
