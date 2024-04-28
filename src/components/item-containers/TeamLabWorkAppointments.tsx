import React, { useContext, useState } from "react";
import { LabWork } from "../../models/domain/LabWork.ts";
import "../../styles/team-lab-work-appointments.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";
import { TeamAppointment } from "../../models/domain/TeamAppointment.ts";
import { Team } from "../../models/domain/Team.ts";

interface Props {
  teamAppointments: TeamAppointment[];
  labWorks: LabWork[];
  teams: Team[];
  onVariantClick: (variant: LabWorkVariant, team: Team) => void;
}

const TeamLabWorkAppointments: React.FC<Props> = ({
  teamAppointments,
  labWorks,
  teams,
  onVariantClick,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;

  teams.sort((t1, t2): number => {
    return t1.id - t2.id;
  });
  console.log(teams);

  return (
    <div className={`team-lab-work-appointments-container ${theme}`}>
      {teams.map((team) => (
        <div key={team.id} className="team-container">
          <div className="team-name">
            <p className="team-title">Бригада {team.id}:</p>
            {team.students.map((student) => (
              <p className="student-name">{student.fullName}</p>
            ))}
          </div>
          <div className="lab-works-container">
            {labWorks.map((labWork) => (
              <>
                <p
                  className={`lab-work-title ${
                    labWork.variants.some((variant) =>
                      teamAppointments.some(
                        (appointment) =>
                          variant.id === appointment.labWorkVariant.id &&
                          appointment.team.id === team.id
                      )
                    )
                      ? "appointed"
                      : "not-appointed"
                  }`}
                >
                  {labWork.title}
                </p>
                <div className="variants-container">
                  {labWork.variants.map((variant) => (
                    <div
                      className="variant"
                      onClick={() => onVariantClick(variant, team)}
                    >
                      <p
                        className={`variant-title ${
                          teamAppointments.some(
                            (appointment) =>
                              variant.id === appointment.labWorkVariant.id &&
                              appointment.team.id === team.id
                          )
                            ? "appointed"
                            : "not-appointed"
                        }`}
                      >
                        {variant.title}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLabWorkAppointments;
