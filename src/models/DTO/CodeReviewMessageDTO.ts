import { TaskMessageDTO } from "./TaskMessageDTO";
import { CodeMessageDTO } from "./CodeMessageDTO";

export interface CodeReviewMessageDTO {
  taskMessages: TaskMessageDTO[];
  codeMessages: CodeMessageDTO[];
}
