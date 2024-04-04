import React from "react";
import { useContext } from "react";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import "../styles/footer.css";

const Footer = () => {
  const { theme } = useContext(UiContext) as UiContextType;

  return <div className={`footer ${theme}`}></div>;
};

export default Footer;
