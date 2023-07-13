import http from "axios";
import { Roles } from "../models/Roles";

export class AuthApiService {
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
    switch (role) {
      case Roles.Admin:
        apiUrl += "/registration/admin";
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

export default AuthApiService;
