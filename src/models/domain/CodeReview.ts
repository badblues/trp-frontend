import { TaskMessage } from "./TaskMessage";
import { CodeThread } from "./CodeThread";
import { CodeReviewStatus } from "./CodeReviewStatus";

export interface CodeReview {
  id: number;
  code: string;
  taskMessages: TaskMessage[];
  codeThreads: CodeThread[];
  createdAt: string;
  status: CodeReviewStatus;
}
