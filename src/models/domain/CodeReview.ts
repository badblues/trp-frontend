import { TaskMessage } from "./TaskMessage";
import { CodeThread } from "./CodeThread";

export interface CodeReview {
  id: number;
  code: string;
  taskMessages: TaskMessage[];
  codeThreads: CodeThread[];
}
