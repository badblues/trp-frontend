import { LabWorkVariant } from "./LabWorkVariant";
import { Team } from "./Team";
import { TeamAppointmentStatus } from "./TeamAppointmentStatus";

export interface TeamAppointment {
  id: number;
  team: Team;
  status: TeamAppointmentStatus;
  labWorkVariant: LabWorkVariant;
  codeReviewIds: number[];
}
