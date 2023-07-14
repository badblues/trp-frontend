import http from "axios";
import { Roles } from "../models/Roles";

export class AdminApiService {
  apiUrl = "http://212.20.47.147:8080/admin";

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  register(user, role) {
    const url = this.getRegistrationUrl(role);
    return http.post(url, user);
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
    }
    return url;
  }
}

export default AdminApiService;
