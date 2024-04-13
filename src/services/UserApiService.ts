import http from "axios";
import { Role } from "../models/domain/Role.ts";
import { UserRegistrationDTO } from "../models/DTO/RegistrationDTO.ts";
import urls from "./urls.ts";

export class UserApiService {
  apiUrl = urls.adminUrl;

  constructor() {
    http.interceptors.request.use();
  }

  async register(RegistrationDTO: UserRegistrationDTO, role: Role) {
    const url = this.getRegistrationUrl(role);
    try {
      const response = await http.post(url, RegistrationDTO);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  getRegistrationUrl(role: Role) {
    let url = this.apiUrl;
    switch (role) {
      case Role.Admin:
        url += "/registration/admin";
        break;
      case Role.Teacher:
        url += "/registration/lab-work-teacher";
        break;
      case Role.SeniorTeacher:
        url += "/registration/lecture-teacher";
        break;
      case Role.Student:
        url += "/registration/student";
        break;
      default:
        break;
    }
    return url;
  }
}

export default UserApiService;
