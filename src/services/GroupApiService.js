import http from "axios";

export class GroupApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/groups";

  async getGroups() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getGroup(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createGroup(group) {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, group);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateGroup(id, group) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, group);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteGroup(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default GroupApiService;
