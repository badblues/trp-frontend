import http from "axios";

export default class TeacherApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teachers";

  async getTeachers() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async getTeacher(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

}
