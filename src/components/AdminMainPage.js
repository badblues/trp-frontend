import React from "react";
import "./MainPage.css";
import Disciplines from "./Disciplines";

const AdminMainPage = () => {
  return (
    <div className="main-page-container">
      <Disciplines className="disciplines" />
    </div>
  );
};

export default AdminMainPage;
