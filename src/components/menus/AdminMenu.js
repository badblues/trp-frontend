import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const navigate = useNavigate();
  const onCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <div className="menu">
      <p className="menu-option" onClick={onCreateUser}>
        Создать пользователя
      </p>
    </div>
  );
};

export default AdminMenu;
