export interface TestInfo {
  id: number;
  stdout: string;
  stderr: string;
  open: boolean;
  input: string;
  output: string;
  expected: string;
}