import React from "react";
import "./MainPage.css";
import Disciplines from "../../Disciplines";
import Groups from "../../Groups";
import Teachers from "../../Teachers";
import Students from "../../Students";

const AdminMainPage = () => {
  return (
    <div className="main-page-container">
      <Disciplines className="disciplines" />
      <Groups/>
      <Teachers/>
      <Students/>
    </div>
  );
};

export default AdminMainPage;
