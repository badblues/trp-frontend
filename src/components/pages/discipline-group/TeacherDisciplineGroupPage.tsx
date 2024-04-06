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
import LabWorks from "../../item-containers/LabWorks.tsx";
import { TeamDTO } from "../../../models/DTO/TeamDTO.ts";
import PageWithTabs from "../../PageWithTabs.tsx";
import { LabWork } from "../../../models/domain/LabWork.ts";
import TeamLabWorks from "../../item-containers/TeamLabWorks.tsx";

const TeacherDisciplineGroupPage = () => {
  const { disciplineId, groupId } = useParams();
  const navigate = useNavigate();
  const {
    studentApiService,
    groupApiService,
    disciplineApiService,
    teamApiService,
    labWorkApiService,
  } = useContext(ApiContext) as ApiContextType;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [group, setGroup] = useState<Group>();
  const [discipline, setDiscipline] = useState<Discipline>();
  const [studentsWithoutTeam, setStudentsWithoutTeam] = useState<Student[]>();
  const [teams, setTeams] = useState<Team[]>();
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
        setTeams(teamsResponse);
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
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

  if (loading) {
    return (
      <div>
        <FakeTaskAppointments />
      </div>
    );
  }

  return (
    <PageWithTabs titles={["Студенты", "Назначения"]}>
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
      <div className={`discipline-group-page ${theme}`}>
        <div>
          <h1>{group!.name}</h1>
          <h2>
            {discipline!.name} {discipline!.year}
          </h2>
          <h2>Бригады:</h2>
          <TeamLabWorks teams={teams!} labWorks={labWorks} />
        </div>
        <div className="info-container">
          <h2>
            {discipline!.name} {discipline!.year}
          </h2>
          <h4 className="status-text status-not-appointed">Не назначено</h4>
          <h4 className="status-text status-appointed">Назначено</h4>
          <h4 className="status-text status-in-progress">В процессе</h4>
          <h4 className="status-text status-finished">Выполнено</h4>
          <h4 className="status-text status-done">Зачтено</h4>
        </div>
      </div>
    </PageWithTabs>
  );
};

export default TeacherDisciplineGroupPage;
