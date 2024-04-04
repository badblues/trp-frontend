import { Argument } from "./Argument";
import { Language } from "./Language";
import { CType } from "./Type";

export interface LabWorkVariant {
  id: number;
  labWorkId: number;
  title: string;
  description: string;
  language: Language;
  functionName: string;
  returnType: CType;
  arguments: Argument[];
  inputRegex: string;
  outputRegex: string;
  testable: boolean;
}
