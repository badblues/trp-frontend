import http from "axios";

export class AuthService {
  apiUrl = "http://212.20.47.147:8080/";

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  login(authData) {
    return http.post(this.apiUrl + "auth/login", authData).catch((error) => {
      console.error(error);
      alert(error["response"]["data"]["authenticationError"]);
    });
  }
}

export default AuthService;
