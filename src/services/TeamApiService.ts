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

  async getTeamsByDisciplineAndGroup(
    disciplineId: number,
    groupId: number
  ): Promise<Team[]> {
    let url = this.apiUrl + `?disciplineId=${disciplineId}&groupId=${groupId}`;
    try {
      const response = await http.get(url);
      return response.data.data;
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
