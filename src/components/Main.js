import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Main = () => {

  const {username, fullName, role } = useContext(UserContext);

  return (
    <>
      <p>{username}</p>
      <p>{fullName}</p>
      <p>{role}</p>
      <img src="images/hapi.gif" alt="hapi"></img>
      <img src="images/sunboy.gif" alt="реакт гавно"></img>
      <img src="images/jumping_cat.gif" alt="dancin"></img>
    </>
  );
};

export default Main;
