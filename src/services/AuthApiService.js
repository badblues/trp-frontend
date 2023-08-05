import http from "axios";

export class AuthApiService {
  apiUrl = "http://212.20.47.147:8080/auth";

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  async login(authData) {
    const url = this.apiUrl + "/login";
    try {
      const response = await http.post(url, authData);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default AuthApiService;
