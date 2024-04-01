import http from "axios";
import { LabWorkVariantTest } from "../models/domain/LabWorkVariantTest";
import { LabWorkVariantTestDTO } from "../models/DTO/LabWorkVariantTestDTO";

export default class LabWorkVariantTestApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/lab-work-variant-tests";
  labWorkVariantApiUrl = "http://212.20.47.147:8080/api/v2/lab-work-variants";

  async getLabWorkVariantTestsByLabWorkVariant(labWorkVariantId: number): Promise<LabWorkVariantTest[]> {
    let url = this.labWorkVariantApiUrl + `/${labWorkVariantId}/tests`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async createLabWorkVariantTest(taskTest: LabWorkVariantTestDTO): Promise<LabWorkVariantTest> {
    let url = this.apiUrl;
    try {
      const response = await http.post(url, taskTest);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
