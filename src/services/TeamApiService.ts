import http from "axios";
import { Team } from "../models/domain/Team";
import { TeamDTO } from "../models/DTO/TeamDTO";

export class TeamApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teams";
  disciplineApiUrl = "http://212.20.47.147:8080/api/v2/disciplines";

  async getTeamsByDiscipline(disciplineId: number): Promise<Team[]> {
    let url = this.disciplineApiUrl + `/${disciplineId}/teams`;
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
