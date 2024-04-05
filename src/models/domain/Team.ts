import { Student } from "./Student";

export interface Team {
  id: number;
  disciplineId: number;
  students: Student[];
}