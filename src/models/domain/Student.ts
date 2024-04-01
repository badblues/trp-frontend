import { Group } from "./Group";
import { User } from "./User"; 

export interface Student extends User {
  group: Group;
}