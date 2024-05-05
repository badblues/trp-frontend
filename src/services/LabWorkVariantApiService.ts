import http from "axios";
import { LabWorkVariant } from "../models/domain/LabWorkVariant";
import { LabWorkVariantDTO } from "../models/DTO/LabWorkVariantDTO";
import { TestResult } from "../models/domain/TestResult";
import { Solution } from "../models/domain/Solution";
import { SolutionDTO } from "../models/DTO/SolutionDTO";
import urls from "./urls.ts";

export default class LabWorkVariantApiService {
  apiUrl = urls.labWorkVariantsUrl;
  labWorksApiUrl = urls.labWorksUrl;
  teamApiUrl = urls.teamsUrl;

  async getLabWorkVariantsByLabWork(
    labWorkId: number
  ): Promise<LabWorkVariant[]> {
    let url = this.labWorksApiUrl + `/${labWorkId}/lab-work-variants`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getLabWorkVariant(labWorkVariantId: number): Promise<LabWorkVariant> {
    let url = this.apiUrl + `/${labWorkVariantId}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getLabWorkVariantsByTeam(teamId: number): Promise<LabWorkVariant[]> {
    let url = this.teamApiUrl + `/${teamId}/lab-work-variants`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createLabWorkVariantTestable(task: LabWorkVariantDTO): Promise<LabWorkVariant> {
    let url = this.apiUrl + "/create-testable";
    try {
      const response = await http.post(url, task);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createLabWorkVariantNonTestable(task: LabWorkVariantDTO): Promise<LabWorkVariant> {
    let url = this.apiUrl + "/create-non-testable";
    try {
      const response = await http.post(url, task);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getSolution(labWorkVariantId: number): Promise<Solution> {
    let url = this.apiUrl + `/${labWorkVariantId}/solution`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async postSolution(
    labWorkVariantId: number,
    solutionDTO: SolutionDTO
  ): Promise<string> {
    let url = this.apiUrl + `/${labWorkVariantId}/solution`;
    try {
      const response = await http.post(url, solutionDTO);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async executeSolution(labWorkVariantId: number): Promise<TestResult> {
    let url = this.apiUrl + `/${labWorkVariantId}/solution/new-execute`;
    try {
      const response = await http.post(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
