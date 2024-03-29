import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/menu.css";

const AdminMenu = () => {
  const { theme } = useContext(UiContext);

  const [createOpen, setCreateOpen] = useState(false);
  const [appointOpen, setAppointOpen] = useState(false);

  return (
    <div className={`menu ${theme}`}>
      <label
        className="menu-option"
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
          className="sub-menu move5"
        >
          <Link to="/create-user" className="sub-menu-option">
            Пользователя
          </Link>
          <Link to="/create-discipline" className="sub-menu-option">
            Дисциплину
          </Link>
          <Link to="/create-group" className="sub-menu-option">
            Группу
          </Link>
        </div>
      ) : null}
      <label
        onClick={() => {
          setAppointOpen(!appointOpen);
          setCreateOpen(false);
        }}
        className="menu-option"
      >
        Назначить
      </label>
      {appointOpen ? (
        <div
          onClick={() => setAppointOpen(!appointOpen)}
          className={`sub-menu move90 ${theme}`}
        >
          <Link to="/assign-teacher" className="sub-menu-option">
            Преподавателя
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default AdminMenu;
