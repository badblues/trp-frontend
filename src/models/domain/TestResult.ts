import { TestInfo } from "./TestInfo";

export interface TestResult {
  testPassed: number;
  totalTests: number;
  errorStatus: number;
  errorMessage: string;
  failedTestIds: number[];
  testsInfo: TestInfo[];
}
