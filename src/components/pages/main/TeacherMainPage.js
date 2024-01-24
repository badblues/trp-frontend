import React from "react";
import "./MainPage.css";
import Disciplines from "../../Disciplines";
import Groups from "../../Groups";
import Tasks from "../../Tasks";

const TeacherMainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-item">
        <Disciplines/>
      </div>

    </div>
  );
};

export default TeacherMainPage;
