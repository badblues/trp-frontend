import { Discipline } from "./Discipline";
import { Group } from "./Group";
import { User } from "./User";

export interface TeacherAppointment {
  id: number;
  teacher: User;
  group: Group;
  discipline: Discipline;
}