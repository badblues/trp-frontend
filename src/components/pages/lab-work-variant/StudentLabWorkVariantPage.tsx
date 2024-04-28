import React, { useContext, useState, useEffect } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import { useParams } from "react-router-dom";
import CodeEditor from "../../CodeEditor.tsx";
import Loader from "../../Loader.tsx";
import "../../../styles/student-lab-work-variant-page.css";
import { SolutionDTO } from "../../../models/DTO/SolutionDTO.ts";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";
import { TeamAppointment } from "../../../models/domain/TeamAppointment.ts";
import StudentTestList from "../../item-containers/StudentTestList.tsx";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";
import { useNavigate } from "react-router";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import PageWithTabs from "../../PageWithTabs.tsx";
import { TestResult } from "../../../models/domain/TestResult.ts";

const StudentLabWorkVariantPage = () => {
  const { disciplineId, labWorkVariantId } = useParams();
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const {
    labWorkVariantApiService,
    teamAppointmentApiService,
    labWorkVariantTestApiService,
  } = useContext(ApiContext) as ApiContextType;
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();
  const [isTesting, setIsTesting] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const teamAppointments =
          await teamAppointmentApiService.getTeamAppointmentsByDiscipline(
            Number(disciplineId)
          );
        const teamAppointment = teamAppointments.find(
          (tA) => tA.labWorkVariant.id === Number(labWorkVariantId)
        );
        if (teamAppointment === undefined) {
          navigate("/not-found");
          return;
        }
        const testsResponse =
          await labWorkVariantTestApiService.getOpenLabWorkVariantTestsByLabWorkVariant(
            Number(labWorkVariantId)
          );
        const solution = await labWorkVariantApiService.getSolution(
          Number(labWorkVariantId)
        );
        //TEMPORARY
        teamAppointment.codeReviewIds = [1, 2];
        setTests(testsResponse);
        setTeamAppointment(teamAppointment);
        setCode(solution.code);
      } catch (error) {}
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
        teamAppointment!.labWorkVariant.id,
        solutionDTO
      );
      showSuccessAlert("Решение сохранено");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const executeSolution = async () => {
    try {
      setIsTesting(true);
      const testResult = await labWorkVariantApiService.executeSolution(
        teamAppointment!.labWorkVariant.id
      );
      const testSuccess = testResult.totalTests === testResult.testPassed;
      setOutputText(
        `\nПройдено ${testResult.testPassed}/${testResult.totalTests} тестов` +
          `${
            testSuccess
              ? "\nУспешно"
              : `\nИдентификаторы проваленных тестов: ${testResult.failedTestIds.map(
                  (id) => id.toString()
                )}`
          }`
      );
      setIsTesting(false);
    } catch (error) {
      showErrorAlert(error.error);
      const testResult = error.data as TestResult;
      setOutputText(`${testResult.errorMessage}`);
      setIsTesting(false);
    }
  };

  const sendToReview = async () => {
    try {
      await teamAppointmentApiService.sendToCodeReview(teamAppointment!.id);
    } catch {}
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
      <div className="left-container">
        <PageWithTabs titles={["Задание", "КодРевью"]}>
          <div className="lab-work-variant-information">
            <h1>{teamAppointment!.labWorkVariant.title}</h1>
            <h2>Язык: {teamAppointment!.labWorkVariant.language}</h2>
            <h2>Задание:</h2>
            <p>{teamAppointment!.labWorkVariant.description}</p>
            {teamAppointment!.labWorkVariant.testable ? (
              <>
                <h2>
                  Функция: {teamAppointment!.labWorkVariant.returnType}{" "}
                  {teamAppointment!.labWorkVariant.functionName}(
                  {teamAppointment!.labWorkVariant.arguments.map(
                    (argument, index) => (
                      <>
                        <span>
                          {argument.type} {argument.name}
                        </span>
                        {index <
                        teamAppointment!.labWorkVariant.arguments.length - 1 ? (
                          <span>, </span>
                        ) : null}
                      </>
                    )
                  )}
                  )
                </h2>
                <h2>Примеры тестов:</h2>
                <StudentTestList tests={tests} />
              </>
            ) : null}
          </div>
          <div className="lab-work-variant-information">
            {teamAppointment?.codeReviewIds.map((cR) => (
              <h4
                className="code-review-link"
                onClick={() =>
                  navigate(
                    `/disciplines/${disciplineId}/team-appointments/${teamAppointment.id}/code-review/${cR}`
                  )
                }
              >
                Код Ревью {cR}
              </h4>
            ))}
          </div>
        </PageWithTabs>
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
          {teamAppointment?.status === TeamAppointmentStatus.InProgress ||
          teamAppointment?.status === TeamAppointmentStatus.Tested ? (
            <button className="control-button" onClick={saveCode}>
              СОХРАНИТЬ
            </button>
          ) : null}
          {teamAppointment?.status === TeamAppointmentStatus.InProgress ||
          teamAppointment?.status === TeamAppointmentStatus.Tested ? (
            <button
              className="control-button"
              onClick={executeSolution}
              disabled={isTesting}
            >
              {isTesting ? <Loader /> : "ЗАПУСТИТЬ"}
            </button>
          ) : null}
          {teamAppointment?.status === TeamAppointmentStatus.Tested &&
          user?.id === teamAppointment.team.leaderStudentId ? (
            <button className="send-to-review-button" onClick={sendToReview}>
              НА ПРОВЕРКУ
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StudentLabWorkVariantPage;
