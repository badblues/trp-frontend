import http from "axios";

export class AuthApiService {
  apiUrl = "http://212.20.47.147:8080/auth";

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  async login(authData) {
    try {
      const url = this.apiUrl + "/login";
      const response = await http.post(url, authData);
      return response.data.data;
    } catch (error) {
      alert(error.response.data.error);
    }
  }
}

export default AuthApiService;
