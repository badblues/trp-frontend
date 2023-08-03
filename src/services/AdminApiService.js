import http from "axios";
import { Roles } from "../models/Roles";

export class AdminApiService {
  apiUrl = "http://212.20.47.147:8080/admin";

  constructor() {
    http.interceptors.request.use();
  }

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  register(user, role) {
    const url = this.getRegistrationUrl(role);
    return http.post(url, user, this.httpOptions);
  }

  async getDisciplines() {
    const url = this.apiUrl + "/disciplines";
    const response = await http.get(url, this.httpOptions);
    return response.data.data;
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

export default AdminApiService;
