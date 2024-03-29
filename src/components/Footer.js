import React from "react";
import { useContext } from "react";
import { UiContext } from "../contexts/UiContext";
import "../styles/footer.css";

const Footer = () => {
  const { theme } = useContext(UiContext);

  return <div className={`footer ${theme}`}></div>;
};

export default Footer;
