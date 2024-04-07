import http from "axios";
import { TeamAppointment } from "../models/domain/TeamAppointment";
import { TeamAppointmentDTO } from "../models/DTO/TeamAppointmentDTO";

export class TeamAppointmentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/team-appointments";

  async getTeamAppointmentsByDiscipline(): Promise<TeamAppointment[]> {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createAppointment(appointment: TeamAppointmentDTO): Promise<TeamAppointment> {
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
