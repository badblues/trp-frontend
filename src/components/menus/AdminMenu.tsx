import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/menu.css";

const AdminMenu = () => {
  const { theme } = useContext(UiContext) as UiContextType;

  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [appointOpen, setAppointOpen] = useState<boolean>(false);

  return (
    <div className={`menu ${theme}`}>
      <p
        className="menu-option"
        onClick={() => {
          setCreateOpen(!createOpen);
          setAppointOpen(false);
        }}
      >
        Создать
      </p>
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
      <p
        onClick={() => {
          setAppointOpen(!appointOpen);
          setCreateOpen(false);
        }}
        className="menu-option"
      >
        Назначить
      </p>
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
