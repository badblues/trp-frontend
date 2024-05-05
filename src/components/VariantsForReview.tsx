import React, { useContext } from "react";
import { TeamAppointment } from "../models/domain/TeamAppointment";
import { Discipline } from "../models/domain/Discipline";
import { Group } from "../models/domain/Group";
import { TeamAppointmentStatus } from "../models/domain/TeamAppointmentStatus.ts";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import { StatusToTextMap } from "../models/domain/StatusToTextMap.ts";
import "../styles/variants-for-review.css";

export interface VariantForReview {
  discipline: Discipline;
  group: Group;
  teamAppointment: TeamAppointment;
}

interface Props {
  variants: VariantForReview[];
  onVariantClick: (variant: VariantForReview) => void;
}

const VariantsForReview: React.FC<Props> = ({ variants, onVariantClick }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  const filteredVariants = variants.filter(
    (v) =>
      v.teamAppointment.status === TeamAppointmentStatus.SentToCodeReview ||
      v.teamAppointment.status === TeamAppointmentStatus.CodeReview ||
      v.teamAppointment.status === TeamAppointmentStatus.WaitingForGrade
  );

  return (
    <div className={`variants-for-review-container ${theme}`}>
      <h2 className="heading">Готовы к проверке:</h2>
      {filteredVariants.map((v) => (
        <div className="variant" onClick={() => onVariantClick(v)}>
          <h3>{v.discipline.name}</h3>
          <h3>{v.group.name}</h3>
          <h3>{v.teamAppointment.labWorkVariant.title}</h3>
          {v.teamAppointment.team.students.map((s) => (
            <p>{s.fullName}</p>
          ))}
          <p className={`status ${v.teamAppointment.status}`}>
            {StatusToTextMap[v.teamAppointment.status]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VariantsForReview;
