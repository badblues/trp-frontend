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
import PageWithTabs from "../../PageWithTabs.tsx";
import Loader from "../../Loader.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";
import StudentTestList from "../../item-containers/StudentTestList.tsx";
import { CodeReviewMessageDTO } from "../../../models/DTO/CodeReviewMessageDTO.ts";

const StudentCodeReviewPage = () => {
  const { disciplineId, teamAppointmentId, codeReviewId } = useParams();
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const {
    teamAppointmentApiService,
    codeReviewApiService,
    labWorkVariantTestApiService,
  } = useContext(ApiContext) as ApiContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [codeReview, setCodeReview] = useState<CodeReview>();
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();
  const [messageText, setMessageText] = useState<string>("");
  const [messageSending, setMessageSending] = useState<boolean>(false);
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const teamAppointments =
          await teamAppointmentApiService.getTeamAppointmentsByDiscipline(
            Number(disciplineId)
          );
        const teamAppointment = teamAppointments.find(
          (tA) => tA.id === Number(teamAppointmentId)
        );
        if (teamAppointment === undefined) {
          navigate("/not-found");
          return;
        }
        const codeReviewResponse = await codeReviewApiService.getCodeReview(
          Number(codeReviewId)
        );

        const testsResponse =
          await labWorkVariantTestApiService.getOpenLabWorkVariantTestsByLabWorkVariant(
            teamAppointment.labWorkVariant.id
          );
        setTests(testsResponse);
        setCodeReview(codeReviewResponse);
        setTeamAppointment(teamAppointment);
      } catch (error) {
        console.log(error, "EROEROEJOR");
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

  const sendMessage = async (): Promise<void> => {
    if (messageText && messageText.length) {
      try {
        const messageDTO: CodeReviewMessageDTO = {
          taskMessages: [{ message: messageText }],
          codeMessages: [],
        };
        setMessageSending(true);
        const codeReviewResponse = await codeReviewApiService.sendMessage(
          Number(codeReviewId),
          messageDTO
        );
        setCodeReview(codeReviewResponse);
        setMessageSending(false);
        setMessageText("");
        console.log("asdfhjkas");
      } catch (error) {
        console.log(error);
        showErrorAlert(error.error);
      }
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
    <div className={`code-review-page ${theme}`}>
      <div className="left-container">
        <PageWithTabs titles={["Чат", "Задание"]}>
          <div className="info-container">
            <div className="team-container">
              <h3 className="team-title">
                Бригада {teamAppointment?.team.id}:
              </h3>
              {teamAppointment!.team.students.map((student) => (
                <p className="student-name">
                  {teamAppointment!.team.leaderId === student.id
                    ? "Лидер: "
                    : ""}
                  {student.fullName}
                </p>
              ))}
            </div>
            <div className="chat-container">
              <div className="chat-messages">
                {codeReview!.messages.map((taskMessage) => (
                  <p
                    className={`message ${
                      taskMessage.user.role === Role.Student ? "right" : "left"
                    }`}
                  >
                    <p>{taskMessage.user.fullName}</p>
                    {taskMessage.message}
                  </p>
                ))}
              </div>
              <div className="send-message-container">
                <textarea
                  className="message-input"
                  value={messageText}
                  onChange={onMessageTextChange}
                />
                <button
                  className="send-message-button"
                  disabled={messageSending}
                  onClick={sendMessage}
                >
                  {messageSending ? <Loader /> : "Отправить"}
                </button>
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
                <StudentTestList tests={tests} />
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
