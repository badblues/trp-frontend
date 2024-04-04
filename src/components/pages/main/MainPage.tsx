import React, { useContext } from "react";
import AdminMainPage from "./AdminMainPage.tsx";
import TeacherMainPage from "./TeacherMainPage.tsx";
import StudentMainPage from "./StudentMainPage.tsx";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import { Role } from "../../../models/domain/Role.ts";

const MainPage = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const pages = {
    [Role.Admin]: AdminMainPage,
    [Role.Teacher]: TeacherMainPage,
    [Role.SeniorTeacher]: TeacherMainPage,
    [Role.Student]: StudentMainPage,
  };

  const Page = pages[user.role] || null;

  return <>{Page && <Page />}</>;
};

export default MainPage;
