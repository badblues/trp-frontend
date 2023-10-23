import http from "axios";
import { Roles } from "../models/Roles";


//TODO possibly rename
export class UserApiService {
  apiUrl = "http://212.20.47.147:8080/admin";

  constructor() {
    http.interceptors.request.use();
  }

  async register(user, role) {
    const url = this.getRegistrationUrl(role);
    try {
      const response = await http.post(url, user);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  getRegistrationUrl(role) {
    let url = this.apiUrl;
    switch (role) {
      case Roles.Admin:
        url += "/registration/admin";
        break;
      case Roles.Professor:
        url += "/registration/teacher";
        break;
      case Roles.Student:
        url += "/registration/student";
        break;
      default:
        break;
    }
    return url;
  }
}

export default UserApiService;
