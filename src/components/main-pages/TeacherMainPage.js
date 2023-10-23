import React from "react";
import "./MainPage.css";
import Disciplines from "../Disciplines";
import Groups from "../Groups";
import Tasks from "../Tasks";

const TeacherMainPage = () => {
  return (
    <div className="main-page-container">
      <Disciplines className="disciplines" />
      <Groups />
    </div>
  );
};

export default TeacherMainPage;
