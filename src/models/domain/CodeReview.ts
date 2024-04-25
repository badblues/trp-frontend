import { TaskMessage } from "./TaskMessage";
import { CodeThread } from "./CodeThread";

export interface CodeReview {
  id: number;
  code: string;
  messages: TaskMessage[];
  codeThreads: CodeThread[];
}
