import http from "axios";
import { TeamAppointment } from "../models/domain/TeamAppointment";
import { TeamAppointmentDTO } from "../models/DTO/TeamAppointmentDTO";
import urls from "./urls.ts";

export class TeamAppointmentApiService {
  apiUrl = urls.teamAppointmentsUrl;
  disciplinesUrl = urls.disciplinesUrl;

  async getTeamAppointmentsByDiscipline(
    disciplineId: number
  ): Promise<TeamAppointment[]> {
    let url = this.disciplinesUrl + `/${disciplineId}/team-appointments`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getTeamAppointmentsByDisciplineAndGroup(
    disciplineId: number,
    groupId: number
  ): Promise<TeamAppointment[]> {
    let url = this.apiUrl + `?disciplineId=${disciplineId}&groupId=${groupId}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createAppointment(
    appointment: TeamAppointmentDTO
  ): Promise<TeamAppointment> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, appointment);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default TeamAppointmentApiService;
