import http from "axios";

export class StudentApiService {
  apiUrl = "http://212.20.47.147:8080/student";

  constructor() {
    http.interceptors.request.use();
  }

  httpOptions = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  async getDisciplines() {
    const url = this.apiUrl + "/disciplines";
    const response = await http.get(url, this.httpOptions);
    return response.data.data;
  }
}

export default StudentApiService;
