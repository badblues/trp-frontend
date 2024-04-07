import { LabWorkVariant } from "./LabWorkVariant";
import { Team } from "./Team";

export interface TeamWithVariants {
  team: Team;
  variants: LabWorkVariant[];
}