import http from "axios";
import { CodeReview } from "../models/domain/CodeReview";
import urls from "./urls.ts";
import { CodeReviewMessageDTO } from "../models/DTO/CodeReviewMessageDTO.ts";
import { CodeMessageDTO } from "../models/DTO/CodeMessageDTO.ts";

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

  async sendMessage(
    codeReviewId: number,
    message: string
  ): Promise<CodeReview> {
    let url = this.apiUrl + `/${codeReviewId}/note?note=${message}`;
    try {
      const response = await http.post(url, message);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async sendCodeMessage(
    codeReviewId: number,
    message: CodeMessageDTO
  ): Promise<CodeReview> {
    let url = this.apiUrl + `/${codeReviewId}/multiline-note`;
    try {
      const response = await http.post(url, message);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async approve(codeReviewId: number): Promise<void> {
    let url = this.apiUrl + `/${codeReviewId}/approve`;
    try {
      const response = await http.put(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async close(codeReviewId: number): Promise<void> {
    let url = this.apiUrl + `/${codeReviewId}/close`;
    try {
      const response = await http.put(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default CodeReviewApiService;
