import { Role } from "./Role";

export interface User {
  id: number;
  fullName: string;
  username: string;
  role: Role;
}