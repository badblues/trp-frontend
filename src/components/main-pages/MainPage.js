import React, { useContext } from "react";
import AdminMainPage from "./AdminMainPage";
import ProfessorMainPage from "./ProfessorMainPage";
import StudentMainPage from "./StudentMainPage";
import { UserContext } from "../../contexts/UserContext";
import { Roles } from "../../models/Roles";

const MainPage = () => {
  const { user } = useContext(UserContext);

  const pages = {
    [Roles.Admin]: AdminMainPage,
    [Roles.Professor]: ProfessorMainPage,
    [Roles.Student]: StudentMainPage,
  };

  const Page = pages[user.role] || null;

  return <>{Page && <Page />}</>;
};

export default MainPage;
