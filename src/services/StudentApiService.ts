import http from "axios";
import { Student } from "../models/domain/Student";

export default class StudentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/students";

  async getStudents(): Promise<Array<Student>> {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getStudent(id: number): Promise<Student> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getStudentsByGroup(groupId: number): Promise<Array<Student>> {
    const students = await this.getStudents();
    return students.filter((s) => (s.group.id = groupId));
  }
}
