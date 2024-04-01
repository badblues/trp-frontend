import http from "axios";
import { LabWork } from "../models/domain/LabWork";
import { LabWorkDTO } from "../models/DTO/LabWorkDTO";

export class LabWorkApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/lab-works";
  disciplineApiUrl = "http://212.20.47.147:8080/api/v2/disciplines";

  async getLabWork(id: number): Promise<LabWork> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getLabWorksByDiscipline(disciplineId: number): Promise<LabWork[]> {
    let url = this.disciplineApiUrl + `/${disciplineId}/lab-works`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createLabWork(discipline: LabWorkDTO): Promise<LabWork> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, discipline);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  
}

export default LabWorkApiService;
