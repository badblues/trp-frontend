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
  onVariantClick: (variant: LabWorkVariant, team: Team) => void;
}

const TeamLabWorkAppointments: React.FC<Props> = ({
  teamAppointments,
  labWorks,
  onVariantClick,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;

  teamAppointments.sort((t1, t2): number => {
    return t1.team.id - t2.team.id;
  });

  const teamIds = Array.from(
    new Set(teamAppointments.map((appointment) => appointment.team.id))
  );

  return (
    <div className={`team-lab-work-appointments-container ${theme}`}>
      {teamIds.map((teamId, index) => (
        <div key={index} className="team-container">
          <div className="team-name">
            <p className="team-title">Бригада {teamId}:</p>
            {teamAppointments
              .filter((appointment) => appointment.team.id == teamId)[0]
              .team.students.map((student) => (
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
                          appointment.team.id === teamId
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
                      onClick={() =>
                        onVariantClick(
                          variant,
                          teamAppointments.filter((t) => t.team.id === teamId)[0]
                            .team
                        )
                      }
                    >
                      <p
                        className={`variant-title ${
                          teamAppointments.some(
                            (appointment) =>
                              variant.id === appointment.labWorkVariant.id &&
                              appointment.team.id === teamId
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
