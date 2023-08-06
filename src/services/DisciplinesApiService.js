import http from "axios";
import { Roles } from "../models/Roles";

export class DisciplinesApiService {
  apiUrl = "http://212.20.47.147:8080";

  constructor() {
    http.interceptors.request.use();
  }

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  async getDisciplines(role) {
    let url = this.apiUrl;
    switch (role) {
      case Roles.Admin:
        url += "/admin";
        break;
      case Roles.Professor:
        url += "/teacher";
        break;
      case Roles.Student:
        url += "/student";
        break;
      default:
        break;
    }
    url += "/disciplines";
    try {
      const response = await http.get(url, this.httpOptions);
      return response.data.data;
    } catch (error) {}
  }
}

export default DisciplinesApiService;
