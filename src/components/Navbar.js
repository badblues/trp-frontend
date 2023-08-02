import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import { useNavigate } from "react-router-dom";
import { Roles } from "../models/Roles";
import DarkModeToggle from "./DarkModeToggle";
import AdminMenu from "./AdminMenu";
import ProfessorMenu from "./ProfessorMenu";
import StudentMenu from "./StudentMenu";

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
            <Link to="/" className="logo-text clickable">
              TERPI
            </Link>
            <DarkModeToggle />
          </div>
          <div className="menu">{Menu && <Menu />}</div>
          <div className="profile">
            {user.loggedIn ? (
              <p className="username clickable">{user.fullName}</p>
            ) : null}
            {user.loggedIn ? (
              <p className="logout clickable" onClick={onLogout}>
                logout
              </p>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
