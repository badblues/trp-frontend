import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { CodeReview } from "../../../models/domain/CodeReview.ts";
import { Role } from "../../../models/domain/Role.ts";
import "../../../styles/student-code-review-page.css";
import ReactCodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { java } from "@codemirror/lang-java";
import { TeamAppointment } from "../../../models/domain/TeamAppointment.ts";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";
import { Language } from "../../../models/domain/Language.ts";
import { CType } from "../../../models/domain/Type.ts";
import PageWithTabs from "../../PageWithTabs.tsx";
import StudentTestList from "../../item-containers/StudentTestList.tsx";
import Loader from "../../Loader.tsx";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";

const StudentCodeReviewPage = () => {
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [codeReview, setCodeReview] = useState<CodeReview>();
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();
  const [messageText, setMessageText] = useState<string>("");
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setTests([
          {
            id: 5,
            labWorkVariantId: 1,
            input: "1, 2",
            output: "3",
            open: true,
          },
          {
            id: 7,
            labWorkVariantId: 1,
            input: "1, 2",
            output: "3",
            open: true,
          },
        ]);
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
          codeReviewIds: [],
        });
        setCodeReview({
          id: 1,
          code: "int func(int a, int b) {\n\treturn a + b;\n}",
          taskMessages: [
            {
              message: "Hello",
              roleType: Role.Student,
            },
            {
              message: "Hellor there ",
              roleType: Role.Teacher,
            },
          ],
          codeThreads: [],
        });
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMessageTextChange = (event): void => {
    setMessageText(event.target.value);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`code-review-page ${theme}`}>
      <div className="left-container">
        <PageWithTabs titles={["Чат", "Задание"]}>
          <div className="info-container">
            <div className="team-container">
              <h3 className="team-title">
                Бригада {teamAppointment?.team.id}:
              </h3>
              {teamAppointment?.team.students.map((student) => (
                <p className="student-name">
                  {teamAppointment.team.leaderId === student.id
                    ? "Лидер: "
                    : ""}
                  {student.fullName}
                </p>
              ))}
            </div>
            <div className="chat-container">
              <div className="chat-messages">
                {codeReview?.taskMessages.map((taskMessage) => (
                  <p
                    className={`message ${
                      taskMessage.roleType === Role.Student ? "right" : "left"
                    }`}
                  >
                    <p>
                      {taskMessage.roleType === Role.Student
                        ? "Студенты:"
                        : "Преподаватель:"}
                    </p>
                    {taskMessage.message}
                  </p>
                ))}
              </div>
              <div className="send-message-container">
                <textarea
                  className="message-input"
                  content={messageText}
                  onChange={onMessageTextChange}
                ></textarea>
                <button className="send-message-button">Отправить</button>
              </div>
            </div>
          </div>
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
                <StudentTestList tests={tests!} />
              </>
            ) : null}
          </div>
        </PageWithTabs>
      </div>
      <div className="code-container">
        <ReactCodeMirror
          value={codeReview?.code}
          editable={false}
          theme={dracula}
          minHeight="400px"
          minWidth="600px"
          extensions={[java()]}
        />
      </div>
    </div>
  );
};

export default StudentCodeReviewPage;
