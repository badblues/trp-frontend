import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/fake-item-list.css";

function FakeItemsList() {
  const { theme } = useContext(UiContext);

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
