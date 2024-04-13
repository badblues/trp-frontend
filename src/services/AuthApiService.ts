import http from "axios";
import { AuthDTO } from "../models/DTO/AuthDTO";
import urls from "./urls.ts";

export class AuthApiService {
  apiUrl = urls.authUrl;

  async login(AuthDTO: AuthDTO): Promise<string> {
    const url = this.apiUrl + "/login";
    try {
      const response = await http.post(url, AuthDTO);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default AuthApiService;
