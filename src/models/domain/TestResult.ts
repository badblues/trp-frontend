export interface TestResult {
  testPassed: number;
  totalTests: number;
  errorStatus: number;
  errorMessage: string;
  failedTestIds: number[];
}