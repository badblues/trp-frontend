import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { CodeReview } from "../../../models/domain/CodeReview.ts";
import { Role } from "../../../models/domain/Role.ts";
import "../../../styles/teacher-code-review-page.css";
import { TeamAppointment } from "../../../models/domain/TeamAppointment.ts";
import PageWithTabs from "../../PageWithTabs.tsx";
import Loader from "../../Loader.tsx";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";
import StudentTestList from "../../item-containers/StudentTestList.tsx";
import GradeForm from "../../forms/GradeForm.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import { LabWork } from "../../../models/domain/LabWork.ts";
import { CodeReviewMessageDTO } from "../../../models/DTO/CodeReviewMessageDTO.ts";
import CodeReviewCode from "../../CodeReviewCode.tsx";

const TeacherCodeReviewPage = () => {
  const { disciplineId, groupId, teamAppointmentId, codeReviewId } =
    useParams();
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const { codeReviewApiService, labWorkApiService, teamAppointmentApiService } =
    useContext(ApiContext) as ApiContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageSending, setMessageSending] = useState<boolean>(false);
  const [codeReview, setCodeReview] = useState<CodeReview>();
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();
  const [messageText, setMessageText] = useState<string>("");
  const [labWork, setLabWork] = useState<LabWork>();
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
            open: false,
          },
          {
            id: 7,
            labWorkVariantId: 1,
            input: "1, 2",
            output: "3",
            open: true,
          },
        ]);
        const teamAppointments =
          await teamAppointmentApiService.getTeamAppointmentsByDisciplineAndGroup(
            Number(disciplineId),
            Number(groupId)
          );
        const teamAppointment = teamAppointments.find(
          (tA) => tA.id === Number(teamAppointmentId)
        );
        if (teamAppointment === undefined) {
          navigate("/not-found");
          return;
        }
        setTeamAppointment(teamAppointment);
        //rework
        const labWorkResponse = await labWorkApiService.getLabWork(
          teamAppointment.labWorkVariant.labWorkId
        );
        const codeReviewResponse = await codeReviewApiService.getCodeReview(
          Number(codeReviewId)
        );
        setLabWork(labWorkResponse);
        //TEMPORARY
        const codeReviewTemporary: CodeReview = {
          id: 5,
          code: "int add(int a, int b)\n {return a + b;}",
          messages: [
            {
              message: "Ублюдошные, мертворожденные интерфейсы",
              user: {
                fullName: "Преподаватель преподавателев",
                id: 5,
                username: "",
                role: Role.Teacher,
              },
            },
          ],
          codeThreads: [],
        };
        setCodeReview(codeReviewTemporary);
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
    <div className={`teacher-code-review-page ${theme}`}>
      <div className="left-container">
        <PageWithTabs titles={["Чат", "Задание"]}>
          <div className="info-container">
            <div className="team-container">
              <h3 className="team-title">
                Бригада {teamAppointment?.team.id}:
              </h3>
              {teamAppointment?.team.students.map((student) => (
                <p className="student-name">
                  {teamAppointment.team.leaderStudentId === student.id
                    ? "Лидер: "
                    : ""}
                  {student.fullName}
                </p>
              ))}
            </div>
            <div className="chat-container">
              <div className="chat-messages">
                {codeReview?.messages.map((taskMessage) => (
                  <p
                    className={`message ${
                      taskMessage.user.role === Role.Student ? "left" : "right"
                    }`}
                  >
                    {taskMessage.user.fullName}
                    <br />
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
            <h2>Максимальный балл: {labWork?.maxRating}</h2>
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
      <div className="right-container">
        <div className="code-container">
          <CodeReviewCode
            code={codeReview!.code}
            codeThreads={codeReview!.codeThreads}
          />
        </div>
        <div className="buttons-container">
          <GradeForm
            students={teamAppointment!.team.students}
            onFormSubmit={() => {}}
            maxGrade={labWork!.maxRating}
          />
          <button className="reject-button">На доработку</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCodeReviewPage;
