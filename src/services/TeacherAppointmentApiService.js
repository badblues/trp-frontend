import http from "axios";

export class TeacherAppointmentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teacher-appointments";

  async getAppointments() {
    let url = this.apiUrl + `/all`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async getAppointment(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async createAppointment(appointment) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, appointment);
      return response.data.data;
    } catch (error) {}
  }

  async updateAppointment(id, appointment) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, appointment);
      return response.data.data;
    } catch (error) {}
  }

  async deleteAppointment(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {}
  }
}

export default TeacherAppointmentApiService;
