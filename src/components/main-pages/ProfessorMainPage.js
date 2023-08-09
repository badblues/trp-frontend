import React from "react";
import "./MainPage.css";
import Disciplines from "../Disciplines";
import Groups from "../Groups";

const ProfessorMainPage = () => {
  return (
    <div className="main-page-container">
      <Disciplines className="disciplines" />
      <Groups />
    </div>
  );
};

export default ProfessorMainPage;
