import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Tests.css";
import TestForm from "../forms/TestForm";

const Tests = ({ tests, task, onAddTest }) => {
  const { darkMode } = useContext(UiContext);

  return (
    <div className="tests-container">
      {tests.map((test, id) => (
        <div
          className={`test-item ${darkMode ? "dark-mode" : ""}`}
          key={test.id}
        >
          <p>{id + 1 + " : " + test.input + " => " + test.output}</p>
        </div>
      ))}

      <TestForm onFormSubmit={(test, onDone) => onAddTest(test, onDone)} task={task}/>
    </div>
  );
};

export default Tests;
