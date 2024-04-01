import http from "axios";
import { User } from "../models/domain/User";

export default class TeacherApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/teachers";

  async getTeachers(): Promise<Array<User>> {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getTeacher(id: number): Promise<User> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
