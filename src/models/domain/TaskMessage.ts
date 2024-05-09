import { User } from "./User";

export interface TaskMessage {
  message: string;
  author: User;
  createdAt: string;
}