import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import CodeEditor from "../../CodeEditor";
import Loader from "../../Loader";
import "./Task.css";

const StudentTaskPage = ({ defaultTask }) => {
  const { darkMode, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);
  const [code, setCode] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const loadedCode = await taskApiService.getSolution(defaultTask.id);
        setCode(loadedCode.code);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCodeChange = (code) => {
    setCode(code);
    console.log(code);
  };

  const saveCode = async () => {
    const data = {
      code: code,
    };
    try {
      await taskApiService.postSolution(defaultTask.id, data);
      showSuccessAlert("Решение сохранено");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const executeSolution = async () => {
    try {
      setOutputText("");
      const response = await taskApiService.executeSolution(defaultTask.id);
      setOutputText(response);
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="task-container">
      <div className="task-information">
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>
          {defaultTask.title}
        </h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Название функции: {defaultTask.functionName}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Язык: {defaultTask.language}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Задание:</h2>
        <p className={`task-description ${darkMode ? "dark-mode" : ""}`}>
          {defaultTask.description}
        </p>
      </div>
      <div className="right-side-container">
        <div className="editor-and-output">
          <CodeEditor solutionCode={code} onCodeChange={handleCodeChange} />
          <textarea
            value={outputText}
            disabled={true}
            className={`output ${darkMode ? "dark-mode" : ""}`}
          ></textarea>
        </div>
        <div className="control-panel">
          <button
            className="button control-button save-button"
            onClick={saveCode}
          >
            СОХРАНИТЬ
          </button>
          <button
            className="button control-button execute-button"
            onClick={executeSolution}
          >
            ЗАПУСТИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTaskPage;
