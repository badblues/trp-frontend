import http from "axios";

export class TeacherAppointmentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teacher-appointments";

  async getAppointments() {
    let url = this.apiUrl + `/all`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getAppointment(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createAppointment(appointment) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, appointment);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateAppointment(id, appointment) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, appointment);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteAppointment(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getAppointmentsByGroup(groupId) {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.group.id === groupId);
  }

  async getAppointmentsByDiscipline(disciplineId) {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.discipline.id === disciplineId);
  }

  async getAppointmentsByTeacher(teacherId) {
    const appointments = await this.getAppointments();
    return appointments.filter((a) => a.teacher.id === teacherId);
  }
}

export default TeacherAppointmentApiService;
