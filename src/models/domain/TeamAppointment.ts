import { LabWorkVariant } from "./LabWorkVariant";
import { Team } from "./Team";
import { TeamAppointmentStatus } from "./TeamAppointmentStatus";
import { Grade } from "./Grade";

export interface TeamAppointment {
  id: number;
  team: Team;
  status: TeamAppointmentStatus;
  labWorkVariant: LabWorkVariant;
  codeReviewIds: number[];
  ratings: Grade[];
}
