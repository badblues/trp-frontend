import { ExecuteInfo } from "./ExecuteInfo";

export interface ExecuteResult {
  errorStatus: number;
  errorMessage: string;
  executeInfo: ExecuteInfo;
}
