import http from "axios";

export class StudentAppointmentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/student-appointments";

  async getAppointments() {
    let url = this.apiUrl;
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

  async deleteAppointment(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default StudentAppointmentApiService;
