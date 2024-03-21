import http from "axios";

export default class TaskTestApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/task-tests";
  taskApiUrl = "http://212.20.47.147:8080/api/v2/tasks";

  async getTaskTestsByTask(id) {
    let url = this.taskApiUrl + `/${id}/tests`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createTaskTest(taskTest) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, taskTest);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateTaskTest(id, taskTest) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, taskTest);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteTaskTest(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
