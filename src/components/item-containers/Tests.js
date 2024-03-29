import React, { useContext, useState } from "react";
import { UiContext } from "../../contexts/UiContext";
import TestForm from "../forms/TestForm";
import binImg from "../../images/bin.png";
import editImg from "../../images/edit.png";
import "../../styles/test-list.css";

const Tests = ({ tests, task, onAddTest, onDeleteTest, onUpdateTest }) => {
  const { theme } = useContext(UiContext);
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTestId, setEditingTestId] = useState(-1);

  const updateTest = (test, onDone) => {
    onUpdateTest(test, (...args) => {
      setEditingTestId(-1);
      onDone(...args);
    });
  };

  return (
    <div className={`test-list ${theme}`}>
      <div className="add-test-container">
        <button
          onClick={() => setIsAddingTest(!isAddingTest)}
          className="open-test-form-button"
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
          className="item"
          key={test.id}
        >
          {editingTestId === test.id ? (
            <div>
              <TestForm test={test} onFormSubmit={updateTest} task={task}/>
              <button onClick={() => setEditingTestId(-1)} className="button">
                ОТМЕНА
              </button>
            </div>
          ) : (
            <div>
              <span className="bold-text">In: </span>
              <span>{test.input}</span>
              <br />
              <span className="bold-text">Out: </span>
              <span>{test.output}</span>
              <div>
                <button
                  onClick={() => onDeleteTest(test)}
                  className="button-with-image"
                >
                  <img
                    className="icon"
                    src={binImg}
                    alt="Delete"
                    width="17"
                  ></img>
                </button>
                <button
                  onClick={() => {
                    setEditingTestId(test.id);
                  }}
                  className="button-with-image"
                >
                  <img
                    className="icon"
                    src={editImg}
                    alt="Edit"
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
