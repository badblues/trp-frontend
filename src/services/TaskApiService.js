import http from "axios";

export default class TaskApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/tasks";
  disciplineApiUrl = "http://212.20.47.147:8080/api/v2/disciplines";

  async getTasks() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getTask(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getTasksByDiscipline(id){
    let url = this.disciplineApiUrl + `/${id}/tasks`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createTask(task) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, task);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateTask(id, task) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, task);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteTask(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async postSolution(taskId, solution) {
    let url = this.apiUrl + `/${taskId}/solution`;
    try {
      const response = await http.post(url, solution);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getSolution(taskId) {
    let url = this.apiUrl + `/${taskId}/solution`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

}
