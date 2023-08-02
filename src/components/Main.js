import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import "./Main.css";

const Main = () => {
  const { user } = useContext(UserContext);

  const { darkMode } = useContext(UiContext);

  return (
    <>
      <div className={`main-container ${darkMode ? 'dark-mode' : ''}`}>
        <p>{user.username}</p>
        <p>{user.fullName}</p>
        <p>{user.role}</p>
      </div>
    </>
  );
};

export default Main;
