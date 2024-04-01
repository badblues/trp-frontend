import http from "axios";
import { Discipline } from "../models/domain/Discipline";
import { DisciplineDTO } from "../models/DTO/DisciplineDTO";

export class DisciplineApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/disciplines";

  async getDisciplines(): Promise<Discipline[]> {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getDiscipline(id: number): Promise<Discipline> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createDiscipline(discipline: DisciplineDTO): Promise<Discipline> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, discipline);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updateDiscipline(id: number, discipline: DisciplineDTO): Promise<Discipline> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.put(url, discipline);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deleteDiscipline(id: number): Promise<void> {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.delete(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default DisciplineApiService;
