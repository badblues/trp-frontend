import { CodeMessage } from "./CodeMessage";

export interface CodeThread {
  messages: CodeMessage[];
  beginLineNumber: number;
  endLineNumber: number;
}
