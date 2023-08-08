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
    </div>
  );
};

export default AdminMenu;
