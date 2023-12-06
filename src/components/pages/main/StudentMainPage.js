import React from "react";
import Disciplines from "../../Disciplines";
import "./MainPage.css";

const StudentMainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-item">
        <Disciplines/>
      </div>
    </div>
  );
};

export default StudentMainPage;
