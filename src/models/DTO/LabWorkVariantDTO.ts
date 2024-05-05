import { Argument } from "../domain/Argument";
import { Language } from "../domain/Language";
import { CType } from "../domain/Type";

export interface LabWorkVariantDTO {
  labWorkId: number;
  title: string;
  description: string;
  language: Language;
  functionName: string;
  returnType: CType | undefined;
  arguments: Argument[] | undefined;
  testable: boolean;
}
