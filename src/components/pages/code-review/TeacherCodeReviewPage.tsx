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
import CodeReviewCode from "../../CodeReviewCode.tsx";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";
import { RatingDTO } from "../../../models/DTO/RatingDTO.ts";
import { StatusToTextMap } from "../../../models/domain/StatusToTextMap.ts";
import CodeReviewList from "../../item-containers/CodeReviewList.tsx";
import { CodeMessageDTO } from "../../../models/DTO/CodeMessageDTO.ts";

const TeacherCodeReviewPage = () => {
  const { disciplineId, groupId, teamAppointmentId, codeReviewId } =
    useParams();
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const {
    codeReviewApiService,
    labWorkApiService,
    teamAppointmentApiService,
    labWorkVariantTestApiService,
  } = useContext(ApiContext) as ApiContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageSending, setMessageSending] = useState<boolean>(false);
  const [codeReview, setCodeReview] = useState<CodeReview>();
  const [teamAppointment, setTeamAppointment] = useState<TeamAppointment>();
  const [messageText, setMessageText] = useState<string>("");
  const [labWork, setLabWork] = useState<LabWork>();
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);
  const [reboot, setReboot] = useState<boolean>();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
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
        if (
          teamAppointment.codeReviewIds.length &&
          teamAppointment.codeReviewIds[0] === Number(codeReviewId)
        ) {
          setActive(true);
        } else {
          setActive(false);
        }
        setTeamAppointment(teamAppointment);
        //rework
        const testsResponse =
          await labWorkVariantTestApiService.getLabWorkVariantTestsByLabWorkVariant(
            teamAppointment.labWorkVariant.id
          );
        const labWorkResponse = await labWorkApiService.getLabWork(
          teamAppointment.labWorkVariant.labWorkId
        );
        const codeReviewResponse = await codeReviewApiService.getCodeReview(
          Number(codeReviewId)
        );

        codeReviewResponse.taskMessages.sort(
          (m1, m2) => Date.parse(m1.createdAt) - Date.parse(m2.createdAt)
        );
        setLabWork(labWorkResponse);
        setTests(testsResponse);
        setCodeReview(codeReviewResponse);
        setLoading(false);
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reboot, codeReviewId]);

  const onMessageTextChange = (event): void => {
    setMessageText(event.target.value);
  };

  const sendMessage = async (): Promise<void> => {
    if (messageText && messageText.length) {
      try {
        setMessageSending(true);
        const codeReviewResponse = await codeReviewApiService.sendMessage(
          Number(codeReviewId),
          messageText
        );
        codeReviewResponse.taskMessages.sort(
          (m1, m2) => Date.parse(m1.createdAt) - Date.parse(m2.createdAt)
        );
        setCodeReview(codeReviewResponse);
        setMessageSending(false);
        setMessageText("");
      } catch (error) {
        showErrorAlert(error.error);
      }
    }
  };

  const sendCodeMessage = async (
    message: CodeMessageDTO,
    onDone: () => void
  ): Promise<void> => {
    try {
      const codeReviewResponse = await codeReviewApiService.sendCodeMessage(
        Number(codeReviewId),
        message
      );
      setCodeReview(codeReviewResponse);
      onDone();
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const reject = async () => {
    try {
      await codeReviewApiService.close(Number(codeReviewId));
      setReboot(!reboot);
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const approve = async (ratings: RatingDTO, onDone: () => void) => {
    try {
      if (teamAppointment?.status !== TeamAppointmentStatus.WaitingForGrade)
        await codeReviewApiService.approve(Number(codeReviewId));
      await teamAppointmentApiService.rate(Number(teamAppointmentId), ratings);
      setReboot(!reboot);
      onDone();
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
    <div className={`teacher-code-review-page ${theme}`}>
      <div className="left-container">
        <PageWithTabs titles={["Чат", "Задание", "Код ревью"]}>
          <div className="info-container">
            <div className="team-container">
              {active ? (
                <p className={`status ${teamAppointment!.status}`}>
                  {StatusToTextMap[teamAppointment!.status]}
                </p>
              ) : null}
              <h3 className="team-title">
                Бригада {teamAppointment?.team.id}:
              </h3>
              {teamAppointment!.team.students.map((student) => (
                <p className="student-name">
                  {student.fullName}{" "}
                  {active &&
                  teamAppointment!.status === TeamAppointmentStatus.Graded &&
                  teamAppointment!.ratings.length ? (
                    <span>
                      {" - "}
                      {
                        <span className="grade">
                          {
                            teamAppointment?.ratings.find(
                              (r) => r.studentId === student.id
                            )?.grade
                          }
                        </span>
                      }
                      /{teamAppointment?.ratings[0].maxRating}
                    </span>
                  ) : null}
                  {teamAppointment!.team.leaderStudentId === student.id
                    ? " (ЛИДЕР)"
                    : ""}
                </p>
              ))}
            </div>
            <div className="chat-container">
              <div className="chat-messages">
                {codeReview?.taskMessages?.map((taskMessage) => (
                  <p
                    className={`message ${
                      taskMessage.author.role === Role.Student
                        ? "left"
                        : "right"
                    }`}
                  >
                    {taskMessage.author.fullName}
                    <br />
                    {taskMessage.message}
                  </p>
                ))}
              </div>
              {active &&
              (teamAppointment!.status === TeamAppointmentStatus.CodeReview ||
                teamAppointment!.status ===
                  TeamAppointmentStatus.WaitingForGrade ||
                teamAppointment!.status ===
                  TeamAppointmentStatus.SentToCodeReview) ? (
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
              ) : null}
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
          <div>
            <CodeReviewList
              codeReviewIds={teamAppointment!.codeReviewIds}
              onCodeReviewSelect={(codeReviewId) =>
                navigate(
                  `/disciplines/${disciplineId}/groups/${groupId}/team-appointments/${
                    teamAppointment!.id
                  }/code-review/${codeReviewId}`
                )
              }
            />
          </div>
        </PageWithTabs>
      </div>
      <div className="right-container">
        <div className="code-container">
          <CodeReviewCode
            canSendMessages={
              active &&
              (teamAppointment!.status === TeamAppointmentStatus.CodeReview ||
                teamAppointment!.status ===
                  TeamAppointmentStatus.WaitingForGrade ||
                teamAppointment!.status ===
                  TeamAppointmentStatus.SentToCodeReview)
            }
            code={codeReview!.code}
            codeThreads={codeReview!.codeThreads}
            onSendMessage={sendCodeMessage}
          />
        </div>
        {active &&
        (teamAppointment!.status === TeamAppointmentStatus.CodeReview ||
          teamAppointment!.status === TeamAppointmentStatus.WaitingForGrade ||
          teamAppointment!.status ===
            TeamAppointmentStatus.SentToCodeReview) ? (
          <div className="buttons-container">
            <GradeForm
              students={teamAppointment!.team.students}
              onFormSubmit={approve}
              maxGrade={labWork!.maxRating}
            />
            <button className="reject-button" onClick={reject}>
              На доработку
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherCodeReviewPage;
