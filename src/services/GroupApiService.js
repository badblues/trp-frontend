import http from "axios";

//TODO fix endpoints

export class GroupApiService {
  apiUrl = "http://212.20.47.147:8080";

  async getGroups() {
    let url = this.apiUrl + "/teacher/groups";
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async getGroup(id) {
    let url = this.apiUrl + `/teacher/groups/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {}
  }

  async createGroup(group) {
    let url = this.apiUrl + "/admin/groups";
    try {
      const response = await http.post(url, group);
      return response.data.data;
    } catch (error) {}
  }

  async updateGroup(id, group) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, group);
      return response.data.data;
    } catch (error) {}
  }

  async deleteGroup(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {}
  }
}

export default GroupApiService;
