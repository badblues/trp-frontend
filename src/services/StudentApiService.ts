import http from "axios";
import { Student } from "../models/domain/Student";
import urls from "./urls.ts";

export default class StudentApiService {
  apiUrl = urls.studentsUrl;
  groupApiUrl = urls.groupsUrl;

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

  async getStudentsByGroup(groupId: number): Promise<Student[]> {
    let url = this.groupApiUrl + `/${groupId}/students`;
    try {
      const response = await http.get(url);
      const groupResponse = await http.get(this.groupApiUrl + `/${groupId}`);
      const students: Student[] = response.data.data;
      students.forEach((s) => (s.group = groupResponse.data.data));
      return students;
    } catch (error) {
      throw error.response.data;
    }
  }
}
