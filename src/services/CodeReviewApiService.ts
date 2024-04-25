import http from "axios";
import { CodeReview } from "../models/domain/CodeReview";
import urls from "./urls.ts";

export class CodeReviewApiService {
  apiUrl = urls.codeReviewUrl;

  async getCodeReview(codeReviewId: number): Promise<CodeReview> {
    let url = this.apiUrl + `/${codeReviewId}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async sendMessage(codeReviewId: number): Promise<CodeReview> {
    let url = this.apiUrl + `/${codeReviewId}/message`;
    try {
      const response = await http.post(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default CodeReviewApiService;
