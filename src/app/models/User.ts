import { AuthData } from "./AuthData";

export interface User extends AuthData{
  fullName: string;
  role?: string;
}