import React from "react";
import "./Footer.css";
import { useContext } from "react";
import { UiContext } from "../contexts/UiContext";

const Footer = () => {
  const { darkMode } = useContext(UiContext);

  return <div className={`footer ${darkMode ? "dark-mode" : ""}`}></div>;
};

export default Footer;
