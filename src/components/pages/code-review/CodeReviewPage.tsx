import React, { useContext } from "react";
import { Role } from "../../../models/domain/Role.ts";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import TeacherCodeReviewPage from "./TeacherCodeReviewPage.tsx";
import StudentCodeReviewPage from "./StudentCodeReviewPage.tsx";

const CodeReviewPage = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const pages = {
    [Role.Teacher]: TeacherCodeReviewPage,
    [Role.SeniorTeacher]: TeacherCodeReviewPage,
    [Role.Student]: StudentCodeReviewPage,
  };

  const Page = pages[user.role] || null;

  return <>{Page && <Page />} </>;
};

export default CodeReviewPage;
