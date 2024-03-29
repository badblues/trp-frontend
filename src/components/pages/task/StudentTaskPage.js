import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import CodeEditor from "../../CodeEditor";
import Loader from "../../Loader";
import "../../../styles/student-task-page.css";

const StudentTaskPage = ({ defaultTask }) => {
  const { theme, showSuccessAlert, showErrorAlert } = useContext(UiContext);
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
    <div className={`task-page ${theme}`}>
      <div className="task-information">
        <h1>{defaultTask.title}</h1>
        <h2>Название функции: {defaultTask.functionName}</h2>
        <h2>Язык: {defaultTask.language}</h2>
        <h2>Задание:</h2>
        <p>{defaultTask.description}</p>
      </div>
      <div className="task-ide">
        <div className="editor-and-output">
          <CodeEditor solutionCode={code} onCodeChange={handleCodeChange} />
          <textarea
            value={outputText}
            disabled={true}
            className="output"
          ></textarea>
        </div>
        <div className="control-panel">
          <button className="control-button" onClick={saveCode}>
            СОХРАНИТЬ
          </button>
          <button className="control-button" onClick={executeSolution}>
            ЗАПУСТИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTaskPage;
