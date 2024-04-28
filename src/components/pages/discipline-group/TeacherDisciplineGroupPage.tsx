import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import FakeTaskAppointments from "../../loaders/FakeTaskAppointments.tsx";
import "../../../styles/discipline-group-page.css";
import { Group } from "../../../models/domain/Group.ts";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { Student } from "../../../models/domain/Student.ts";
import { Team } from "../../../models/domain/Team.ts";
import Teams from "../../item-containers/Teams.tsx";
import StudentsDraggable from "../../item-containers/StudentsDraggable.tsx";
import TeamForm from "../../forms/TeamForm.tsx";
import { TeamDTO } from "../../../models/DTO/TeamDTO.ts";
import PageWithTabs from "../../PageWithTabs.tsx";
import { LabWork } from "../../../models/domain/LabWork.ts";
import TeamLabWorkAppointments from "../../item-containers/TeamLabWorkAppointments.tsx";
import { LabWorkVariant } from "../../../models/domain/LabWorkVariant.ts";
import { TeamAppointmentDTO } from "../../../models/DTO/TeamAppointmentDTO.ts";
import TeamLabWorks from "../../item-containers/TeamLabWorks.tsx";
import { TeamAppointment } from "../../../models/domain/TeamAppointment.ts";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";

const TeacherDisciplineGroupPage = () => {
  const { disciplineId, groupId } = useParams();
  const navigate = useNavigate();
  const {
    studentApiService,
    groupApiService,
    disciplineApiService,
    teamApiService,
    labWorkApiService,
    teamAppointmentApiService,
  } = useContext(ApiContext) as ApiContextType;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [group, setGroup] = useState<Group>();
  const [discipline, setDiscipline] = useState<Discipline>();
  const [studentsWithoutTeam, setStudentsWithoutTeam] = useState<Student[]>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamAppointments, setTeamAppointments] = useState<TeamAppointment[]>(
    []
  );
  const [labWorks, setLabWorks] = useState<LabWork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const groupResponse = await groupApiService.getGroup(Number(groupId));
        const disciplineResponse = await disciplineApiService.getDiscipline(
          Number(disciplineId)
        );
        const teamsResponse = await teamApiService.getTeamsByDisciplineAndGroup(
          Number(disciplineId),
          Number(groupId)
        );
        const labWorksResponse =
          await labWorkApiService.getLabWorksByDiscipline(Number(disciplineId));
        const studentsResponse = await studentApiService.getStudentsByGroup(
          Number(groupId)
        );
        setGroup(groupResponse);
        setDiscipline(disciplineResponse);
        setLabWorks(labWorksResponse);
        setStudentsWithoutTeam(
          studentsResponse.filter(
            (student) =>
              !teamsResponse.some((team) =>
                team.students.some((member) => member.id === student.id)
              )
          )
        );
        const teamAppointmentsResponse =
          await teamAppointmentApiService.getTeamAppointmentsByDisciplineAndGroup(
            Number(disciplineId),
            Number(groupId)
          );
        setTeamAppointments(teamAppointmentsResponse);
        setTeams(teamsResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTeam = async (teamDTO: TeamDTO, onDone: () => void) => {
    try {
      const createdTeam: Team = await teamApiService.createTeam(teamDTO);
      setStudentsWithoutTeam(
        studentsWithoutTeam!.filter(
          (s) => !teamDTO.studentIds.some((studentId) => studentId === s.id)
        )
      );
      setTeams([createdTeam, ...teams!]);
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  const appointVariant = async (variant: LabWorkVariant, team: Team) => {
    try {
      if (
        teamAppointments.some(
          (appointment) =>
            appointment.team.id === team.id &&
            appointment.labWorkVariant.id === variant.id
        )
      ) {
        //TODO REMOVE APPOINTMENT
      } else {
        const appointment: TeamAppointmentDTO = {
          teamId: team.id,
          labWorkVariantId: variant.id,
        };
        const newAppointment =
          await teamAppointmentApiService.createAppointment(appointment);
        newAppointment.team = team;
        setTeamAppointments([newAppointment, ...teamAppointments]);
      }
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const handleVariantClick = (appointment: TeamAppointment) => {
    if (
      appointment.status === TeamAppointmentStatus.SentToCodeReview ||
      appointment.status === TeamAppointmentStatus.CodeReview ||
      appointment.status === TeamAppointmentStatus.WaitingForGrade ||
      appointment.status === TeamAppointmentStatus.Graded
    )
      navigate(
        `/disciplines/${discipline!.id}/team-appointments/${
          appointment.id
        }/code-review/${appointment.codeReviewIds[0]}`
      );
    else showErrorAlert("Задание не готово к проверке");
  };

  if (loading) {
    return (
      <div>
        <FakeTaskAppointments />
      </div>
    );
  }

  return (
    <PageWithTabs
      titles={["Проверка лабораторных", "Назначение лабораторных", "Бригады"]}
    >
      <div className={`discipline-group-page ${theme}`}>
        <div>
          <TeamLabWorks
            teamAppointments={teamAppointments}
            labWorks={labWorks}
            teams={teams}
            onVariantClick={handleVariantClick}
          />
        </div>
        <div className="info-container">
          <h1>{group!.name}</h1>
          <h2>
            {discipline!.name} {discipline!.year}
          </h2>
        </div>
      </div>
      <div className={`discipline-group-page ${theme}`}>
        <div>
          <TeamLabWorkAppointments
            teamAppointments={teamAppointments}
            labWorks={labWorks}
            teams={teams}
            onVariantClick={appointVariant}
          />
        </div>
        <div className="info-container">
          <h1>{group!.name}</h1>
          <h2>
            {discipline!.name} {discipline!.year}
          </h2>
          <h3 className="status-text status-not-appointed">Не назначено</h3>
          <h3 className="status-text status-appointed">Назначено</h3>
        </div>
      </div>
      <div className={`discipline-group-page ${theme}`}>
        <div>
          <h1>{group!.name}</h1>
          <h2>
            {discipline!.name} {discipline!.year}
          </h2>
          <h2>Бригады:</h2>
          <Teams teams={teams!} />
        </div>
        <div>
          <TeamForm discipline={discipline!} onFormSubmit={createTeam} />
          <h2>Студенты без бригад:</h2>
          <StudentsDraggable students={studentsWithoutTeam!} />
        </div>
      </div>
    </PageWithTabs>
  );
};

export default TeacherDisciplineGroupPage;
