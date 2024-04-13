import React, { useContext, useState, useEffect } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import CodeEditor from "../../CodeEditor.tsx";
import Loader from "../../Loader.tsx";
import "../../../styles/student-lab-work-variant-page.css";
import { SolutionDTO } from "../../../models/DTO/SolutionDTO.ts";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";

const StudentLabWorkVariantPage = ({ defaultLabWorkVariant }) => {
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { labWorkVariantApiService, labWorkVariantTestApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const [code, setCode] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const solution = await labWorkVariantApiService.getSolution(
          defaultLabWorkVariant.id
        );
        const testsResponse =
          await labWorkVariantTestApiService.getLabWorkVariantTestsByLabWorkVariant(
            defaultLabWorkVariant.id
          );
        setTests(testsResponse);
        console.log(testsResponse);
        setCode(solution.code);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCodeChange = (code: string) => {
    setCode(code);
  };

  const saveCode = async () => {
    const solutionDTO: SolutionDTO = {
      code: code,
    };
    try {
      await labWorkVariantApiService.postSolution(
        defaultLabWorkVariant.id,
        solutionDTO
      );
      showSuccessAlert("Решение сохранено");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const executeSolution = async () => {
    try {
      setOutputText("");
      const response = await labWorkVariantApiService.executeSolution(
        defaultLabWorkVariant.id
      );
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
    <div className={`lab-work-variant-page ${theme}`}>
      <div className="lab-work-variant-information">
        <h1>{defaultLabWorkVariant.title}</h1>
        <h2>Язык: {defaultLabWorkVariant.language}</h2>
        <h2>Задание:</h2>
        <p>{defaultLabWorkVariant.description}</p>
        {defaultLabWorkVariant.testable ? (
          <>
            <h2>
              Функция: {defaultLabWorkVariant.returnType}{" "}
              {defaultLabWorkVariant.functionName}(
              {defaultLabWorkVariant.arguments.map((argument, index) => (
                <>
                  <span>
                    {argument.type} {argument.name}
                  </span>
                  {index < defaultLabWorkVariant.arguments.length - 1 ? (
                    <span>, </span>
                  ) : null}
                </>
              ))}
              )
            </h2>
          </>
        ) : null}
      </div>
      <div className="lab-work-variant-ide">
        <div className="editor-and-output">
          <CodeEditor solutionCode={code} onCodeChange={handleCodeChange} />
          <textarea
            id="output"
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

export default StudentLabWorkVariantPage;
