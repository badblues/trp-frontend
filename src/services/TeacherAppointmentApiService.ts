import http, { AxiosError } from "axios";
import { TeacherAppointment } from "../models/domain/TeacherAppointment";
import { TeacherAppointmentDTO } from "../models/DTO/TeacherAppointmentDTO";
import urls from "./urls.ts";

export class TeacherAppointmentApiService {
  apiUrl = urls.teacherAppointmentsUrl;

  async getAppointments(): Promise<Array<TeacherAppointment>> {
    let url = this.apiUrl + `/all`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createAppointment(
    appointment: TeacherAppointmentDTO
  ): Promise<TeacherAppointmentDTO> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, appointment);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteAppointment(id: number): Promise<void> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getAppointmentsByGroup(
    groupId: number
  ): Promise<Array<TeacherAppointment>> {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.group.id === groupId);
  }

  async getAppointmentsByDiscipline(
    disciplineId: number
  ): Promise<Array<TeacherAppointment>> {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.discipline.id === disciplineId);
  }

  async getAppointmentsByTeacher(
    teacherId: number
  ): Promise<Array<TeacherAppointment>> {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.teacher.id === teacherId);
  }
}

export default TeacherAppointmentApiService;
