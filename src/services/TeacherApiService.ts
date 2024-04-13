import http from "axios";
import { User } from "../models/domain/User";
import urls from "./urls.ts";

export default class TeacherApiService {
  apiUrl = urls.teachersUrls;

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
