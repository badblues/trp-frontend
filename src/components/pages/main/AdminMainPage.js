import React from "react";
import Disciplines from "../../Disciplines";
import Groups from "../../Groups";
import Teachers from "../../Teachers";
import "./MainPage.css";

const AdminMainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-item">
        <Disciplines/>
      </div>
      <div className="main-page-item">
        <Groups/>
      </div>
      <div className="main-page-item">
        <Teachers/>
      </div>
    </div>
  );
};

export default AdminMainPage;
