import http from "axios";
import { LabWork } from "../models/domain/LabWork";
import { LabWorkDTO } from "../models/DTO/LabWorkDTO";
import urls from "./urls.ts";

export class LabWorkApiService {
  apiUrl = urls.labWorksUrl;
  disciplineApiUrl = urls.disciplinesUrl;

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
