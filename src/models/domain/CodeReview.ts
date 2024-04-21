import { TaskMessage } from "./TaskMessage";
import { CodeThread } from "./CodeThread";

export interface CodeReview {
  code: string;
  taskMessages: TaskMessage[];
  codeThreads: CodeThread[];
}
