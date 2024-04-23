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
import { Role } from "../../../models/domain/Role.ts";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";
import { Language } from "../../../models/domain/Language.ts";
import { CType } from "../../../models/domain/Type.ts";
import { useNavigate } from "react-router";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import PageWithTabs from "../../PageWithTabs.tsx";
import { Discipline } from "../../../models/domain/Discipline.ts";

const StudentLabWorkVariantPage = () => {
  const { disciplineId, labWorkVariantId } = useParams();
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const { labWorkVariantApiService, labWorkVariantTestApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();

  useEffect(() => {
    (async () => {
      try {
        //TEMPORARY
        // const solution = await labWorkVariantApiService.getSolution(
        //   defaultLabWorkVariant.id
        // );
        // setCode(solution.code);
        //TEMPORARY
        setTests([
          {
            id: 1,
            labWorkVariantId: 2,
            input: "in",
            output: "out",
            open: true,
          },
          {
            id: 2,
            labWorkVariantId: 2,
            input: "in2",
            output: "out2",
            open: true,
          },
        ]);
        //TEMPORARY
        setTeamAppointment({
          id: 1,
          team: {
            id: 18,
            disciplineId: 1,
            students: [
              {
                id: 5,
                group: {
                  id: 1,
                  name: "AVTTEMPORARY",
                },
                fullName: "ALEXEY",
                username: "username",
                role: Role.Student,
              },
              {
                id: 38,
                group: {
                  id: 1,
                  name: "AVTTEMPORARY",
                },
                fullName: "asdf",
                username: "username",
                role: Role.Student,
              },
            ],
            leaderId: 38,
          },
          status: TeamAppointmentStatus.InProgress,
          labWorkVariant: {
            id: 1,
            labWorkId: 1,
            title: "1. Функция суммы",
            description:
              "Создайте функцию add, которая принимает два аргумента (числа) и возвращает их сумму.",
            language: Language.C,
            testable: true,
            functionName: "add",
            returnType: CType.Int,
            arguments: [
              {
                name: "a",
                type: "int",
              },
              {
                name: "b",
                type: "int",
              },
            ],
            inputRegex: "",
            outputRegex: "",
          },
          codeReviewIds: [1, 2],
        });
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
      setOutputText("");
      const response = await labWorkVariantApiService.executeSolution(
        teamAppointment!.labWorkVariant.id
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
            <button className="control-button" onClick={executeSolution}>
              ЗАПУСТИТЬ
            </button>
          ) : null}
          {teamAppointment?.status === TeamAppointmentStatus.Tested &&
          user?.id === teamAppointment.team.leaderId ? (
            <button className="send-button" onClick={executeSolution}>
              НА ПРОВЕРКУ
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StudentLabWorkVariantPage;
