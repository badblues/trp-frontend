export interface TestResult {
  testPassed: number;
  totalTests: number;
  passed: boolean;
  error: boolean;
  output: string;
  filedTestIds: number[];
}