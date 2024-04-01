import http from "axios";
import { Group } from "../models/domain/Group";
import { GroupDTO } from "../models/DTO/GroupDTO";

export class GroupApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/groups";

  async getGroups(): Promise<Group[]> {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getGroup(id: number): Promise<Group> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createGroup(group: GroupDTO): Promise<Group> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, group);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateGroup(id: number, group: GroupDTO): Promise<Group> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, group);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteGroup(id: number): Promise<void> {
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
