import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/fake-item-list.css";

function FakeItemsList() {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`fake-list ${theme}`}>
      <div className="fake-caption"></div>
      <div className="fake-item"></div>
      <div className="fake-item"></div>
      <div className="fake-item"></div>
      <div className="fake-item"></div>
      <div className="fake-item"></div>
      <div className="fake-item"></div>
    </div>
  );
}

export default FakeItemsList;
