import http from "axios";

export default class TaskApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/tasks";

  async getTasks() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async getTask(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async createTask(task) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, task);
      return response.data.data;
    } catch (error) {}
  }

  async updateTask(id, task) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, task);
      return response.data.data;
    } catch (error) {}
  }

  async deleteTask(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {}
  }

}
