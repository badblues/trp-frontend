import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { UserContext, UserContextType } from "../contexts/UserContext.tsx";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../contexts/ApiContext.tsx";
import { useNavigate } from "react-router-dom";
import { Role } from "../models/domain/Role.ts";
import logoImg from "../images/logo.png";
import DarkModeToggle from "./DarkModeToggle.tsx";
import AdminMenu from "./menus/AdminMenu.tsx";
import TeacherMenu from "./menus/TeacherMenu.tsx";
import StudentMenu from "./menus/StudentMenu.tsx";
import Loader from "./Loader.tsx";
import { Group } from "../models/domain/Group.ts";

const Navbar = () => {
  const { loggedIn, user, logout } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const { studentApiService } = useContext(ApiContext) as ApiContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    (async () => {
      try {
        if (user?.role === Role.Student) {
          const student = await studentApiService.getStudent(user.id);
          setGroup(student.group);
        }
        setLoading(false);
      } catch (error) {
        showErrorAlert(error.error);
      }
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
    [Role.Admin]: AdminMenu,
    [Role.Teacher]: TeacherMenu,
    [Role.Student]: StudentMenu,
  };

  //TODO FIX THIS BULLSHIT
  const role = user?.role ?? Role.Student;

  const Menu = menus[role] || null;

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
          {loggedIn ? <div>{Menu && <Menu />}</div> : null}
          <div className="profile-container">
            {loggedIn ? (
              <div className="mini-profile">
                <p className="username">{user?.fullName}</p>
                {user?.role === Role.Student ? <p>{group?.name}</p> : null}
              </div>
            ) : null}
            {loggedIn ? (
              <p className="logout" onClick={onLogout}>
                Выйти
              </p>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
