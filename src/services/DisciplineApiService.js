import http from "axios";

export class DisciplineApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/disciplines";

  constructor() {
    http.interceptors.request.use();
  }

  async getDisciplines() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async getDiscipline(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async createDiscipline(discipline) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, discipline);
      return response.data.data;
    } catch (error) {}
  }

  async updateDiscipline(id, discipline) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, discipline);
      return response.data.data;
    } catch (error) {}
  }

  async deleteDiscipline(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {}
  }
}

export default DisciplineApiService;
