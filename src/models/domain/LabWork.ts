import { LabWorkVariant } from "./LabWorkVariant";

export interface LabWork {
  id: number;
  disciplineId: number;
  title: string;
  maxRating: number;
  variants: LabWorkVariant[];
}