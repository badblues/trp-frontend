import http from "axios";
import { Team } from "../models/domain/Team";
import { TeamDTO } from "../models/DTO/TeamDTO";
import { Student } from "../models/domain/Student";

export class TeamApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teams";
  disciplineApiUrl = "http://212.20.47.147:8080/api/v2/disciplines";
  studentApiUrl = "http://212.20.47.147:8080/api/v2/students";

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

  async createTeam(team: TeamDTO): Promise<Team> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, team);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default TeamApiService;
