import React from "react";
import Disciplines from "../../item-containers/Disciplines";
import Groups from "../../item-containers/Groups";
import Teachers from "../../item-containers/Teachers";
import "./MainPage.css";

const AdminMainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-item">
        <Disciplines/>
      </div>
      <div className="main-page-item">
        <Teachers/>
      </div>
      <div className="main-page-item">
        <Groups/>
      </div>
    </div>
  );
};

export default AdminMainPage;
