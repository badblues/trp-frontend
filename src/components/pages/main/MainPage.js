import React, { useContext } from "react";
import AdminMainPage from "./AdminMainPage";
import TeacherMainPage from "./TeacherMainPage";
import StudentMainPage from "./StudentMainPage";
import { UserContext } from "../../../contexts/UserContext";
import { Roles } from "../../../models/Roles";

const MainPage = () => {
  const { user } = useContext(UserContext);

  const pages = {
    [Roles.Admin]: AdminMainPage,
    [Roles.Teacher]: TeacherMainPage,
    [Roles.SeniorTeacher]: TeacherMainPage,
    [Roles.Student]: StudentMainPage,
  };

  const Page = pages[user.role] || null;

  return <>{Page && <Page />}</>;
};

export default MainPage;
