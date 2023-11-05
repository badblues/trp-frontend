import React, { useContext, useState, useEffect } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import { UiContext } from "../../contexts/UiContext";

const AdminMenu = () => {
  const { darkMode } = useContext(UiContext);

  const [createOpen, setCreateOpen] = useState(false);
  const [appointOpen, setAppointOpen] = useState(false);

  return (
    <div className="menu">
      <label
        className={`sub-menu-btn menu-option ${darkMode ? "dark-mode" : ""}`}
        onClick={() => {
          setCreateOpen(!createOpen);
          setAppointOpen(false);
        }}
      >
        Создать
      </label>
      {createOpen ? (
        <div
          onClick={() => setCreateOpen(!createOpen)}
          className={`sub-menu ${darkMode ? "dark-mode" : ""}`}
        >
          <Link
            to="/create-user"
            className={`sub-menu-option ${darkMode ? "dark-mode" : ""}`}
          >
            Пользователя
          </Link>
          <Link
            to="/create-discipline"
            className={`sub-menu-option ${darkMode ? "dark-mode" : ""}`}
          >
            Дисциплину
          </Link>
          <Link
            to="/create-group"
            className={`sub-menu-option ${darkMode ? "dark-mode" : ""}`}
          >
            Группу
          </Link>
        </div>
      ) : null}
      <label 
        onClick={() => {
          setAppointOpen(!appointOpen);
          setCreateOpen(false);
        }}
        className={`menu-option ${darkMode ? "dark-mode" : ""}`}
      >
        Назначить
      </label>
      {appointOpen ? (
        <div
          onClick={() => setAppointOpen(!appointOpen)}
          className={`sub-menu ${darkMode ? "dark-mode" : ""}`}
        >
          <Link
            to="/assign-teacher"
            className={`sub-menu-option ${darkMode ? "dark-mode" : ""}`}
          >
            Преподавателя
          </Link>
        </div>
      ) : null}
      <label className={`menu-option ${darkMode ? "dark-mode" : ""}`}>
        Опция 2
      </label>
    </div>
  );
};

export default AdminMenu;
