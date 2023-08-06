import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import { useNavigate } from "react-router-dom";
import { Roles } from "../models/Roles";
import DarkModeToggle from "./DarkModeToggle";
import AdminMenu from "./menus/AdminMenu";
import ProfessorMenu from "./menus/ProfessorMenu";
import StudentMenu from "./menus/StudentMenu";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { darkMode } = useContext(UiContext);
  const navigate = useNavigate();

  const menus = {
    [Roles.Admin]: AdminMenu,
    [Roles.Professor]: ProfessorMenu,
    [Roles.Student]: StudentMenu,
  };

  const Menu = menus[user.role] || null;

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className={`navbar-container ${darkMode ? "dark-mode" : ""}`}>
          <div className="logo">
            <img src="images/logo.png" alt="hapi" width="17"></img>
            <Link
              to="/"
              className={`clickable logo-text ${darkMode ? "dark-mode" : ""}`}
            >
              TERPI
            </Link>
            <DarkModeToggle className="dark-mode-toggle" />
          </div>
          <div className="menu">{Menu && <Menu />}</div>
          <div className="profile">
            {user.loggedIn ? (
              <label className="username clickable">{user.fullName}</label>
            ) : null}
            {user.loggedIn ? (
              <label className="logout clickable" onClick={onLogout}>
                Выйти
              </label>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
