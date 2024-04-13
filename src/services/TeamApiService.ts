import http from "axios";
import { Team } from "../models/domain/Team";
import { TeamDTO } from "../models/DTO/TeamDTO";
import { Student } from "../models/domain/Student";
import urls from "./urls.ts";

export class TeamApiService {
  apiUrl = urls.teamsUrl;
  disciplineApiUrl = urls.disciplinesUrl;
  studentApiUrl = urls.studentsUrl;

  async getTeamsByDiscipline(disciplineId: number): Promise<Team[]> {
    let url = this.disciplineApiUrl + `/${disciplineId}/teams`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  //TODO refactor
  async getTeamsByDisciplineAndGroup(
    disciplineId: number,
    groupId: number
  ): Promise<Team[]> {
    let url = this.disciplineApiUrl + `/${disciplineId}/teams`;
    try {
      const response = await http.get(url);
      const teamsByDiscipline: Team[] = response.data.data;
      await Promise.all(
        teamsByDiscipline.map(async (team) => {
          team.students = [];
          await Promise.all(
            team.studentIds.map(async (studentId) => {
              const studentResponse = await http.get(
                this.studentApiUrl + `/${studentId}`
              );
              team.students.push(studentResponse.data.data);
            })
          );
        })
      );
      return teamsByDiscipline.filter((team: Team) =>
        team.students.every((s: Student) => s.group.id == groupId)
      );
    } catch (error) {
      throw error.response.data;
    }
  }

  //TODO refactor
  async createTeam(team: TeamDTO): Promise<Team> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, team);
      const createdTeam: Team = response.data.data;
      createdTeam.students = [];
      await Promise.all(
        createdTeam.studentIds.map(async (studentId) => {
          const studentResponse = await http.get(
            this.studentApiUrl + `/${studentId}`
          );
          createdTeam.students.push(studentResponse.data.data);
        })
      );
      return createdTeam;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default TeamApiService;
