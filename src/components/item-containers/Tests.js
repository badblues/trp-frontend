import React, { useContext, useState } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Tests.css";
import TestForm from "../forms/TestForm";
import binImg from "../../images/bin.png";
import editImg from "../../images/edit.png";

const Tests = ({ tests, task, onAddTest, onDeleteTest, onUpdateTest }) => {
  const { darkMode } = useContext(UiContext);
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTestId, setEditingTestId] = useState(-1);

  const updateTest = (test, onDone) => {
    onUpdateTest(test, (...args) => {
      setEditingTestId(-1);
      onDone(...args);
    });
  };

  return (
    <div className="tests-container">
      <div className="add-test-container">
        <button
          onClick={() => setIsAddingTest(!isAddingTest)}
          className="button"
        >
          {isAddingTest ? "ЗАКРЫТЬ" : "ДОБАВИТЬ ТЕСТЫ"}
        </button>
        {isAddingTest ? (
          <TestForm
            onFormSubmit={(test, onDone) => onAddTest(test, onDone)}
            task={task}
          />
        ) : null}
      </div>

      {tests.map((test) => (
        <div
          className={`test-item ${darkMode ? "dark-mode" : ""}`}
          key={test.id}
        >
          {editingTestId === test.id ? (
            <div>
              <TestForm test={test} onFormSubmit={updateTest} />
              <button onClick={() => setEditingTestId(-1)} className="button">
                ОТМЕНА
              </button>
            </div>
          ) : (
            <div>
              <span className="bold">In: </span>
              <span>{test.input}</span>
              <br />
              <span className="bold">Out: </span>
              <span>{test.output}</span>
              <div>
                <button
                  onClick={() => onDeleteTest(test)}
                  className="button-with-image margin-5"
                >
                  <img
                    src={binImg}
                    alt="Delete"
                    className={`icon ${darkMode ? "dark-mode" : ""}`}
                    width="17"
                  ></img>
                </button>
                <button
                  onClick={() => {
                    setEditingTestId(test.id);
                  }}
                  className="button-with-image margin-5"
                >
                  <img
                    src={editImg}
                    alt="Edit"
                    className={`icon ${darkMode ? "dark-mode" : ""}`}
                    width="17"
                  ></img>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tests;
