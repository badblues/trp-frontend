import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import { ApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
import { Roles } from "../models/Roles";
import logoImg from "../images/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import AdminMenu from "./menus/AdminMenu";
import TeacherMenu from "./menus/TeacherMenu";
import StudentMenu from "./menus/StudentMenu";
import Loader from "./Loader";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { theme, showErrorAlert } = useContext(UiContext);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState([]);
  const { studentApiService } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user.role === Roles.Student) {
          const student = await studentApiService.getStudent(user.id);
          setGroup(student.group);
        }
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <div className="loader-container">
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
      <nav>
        <div className={`navbar-container ${theme}`}>
          <div className="logo-container">
            <img className="logo-image" src={logoImg} alt="Logo" width="25" />
            <Link to="/" className="logo-text">
              TRP
            </Link>
            <DarkModeToggle />
          </div>
          <div>{Menu && <Menu />}</div>
          <div className="profile-container">
            {user.loggedIn ? (
              <div className="mini-profile">
                <label className="username">{user.fullName}</label>
                {user.role === Roles.Student ? (
                  <label>{group.name}</label>
                ) : null}
              </div>
            ) : null}
            {user.loggedIn ? (
              <label className="logout" onClick={onLogout}>
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
