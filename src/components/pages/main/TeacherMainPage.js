import React from "react";
import "./MainPage.css";
import Disciplines from "../../item-containers/Disciplines";
import Groups from "../../item-containers/Groups";
import Tasks from "../../item-containers/Tasks";

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
