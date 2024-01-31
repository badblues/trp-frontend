import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import { ApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
import { Roles } from "../models/Roles";
import logoImg  from "../images/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import AdminMenu from "./menus/AdminMenu";
import TeacherMenu from "./menus/TeacherMenu";
import StudentMenu from "./menus/StudentMenu";
import Loader from "./Loader";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState([]);
  const { studentApiService } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user.role === Roles.Student) {
        const student = await studentApiService.getStudent(user.id);
        setGroup(student.group);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const menus = {
    [Roles.Admin]: AdminMenu,
    [Roles.Teacher]: TeacherMenu,
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
            <img src={logoImg} alt="Logo" width="17"></img>
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
              <div className="mini-profile">
                <label className="username clickable">{user.fullName}</label>
                {user.role === Roles.Student ? (
                  <label>{group.name}</label>
                ) : null}
              </div>
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
