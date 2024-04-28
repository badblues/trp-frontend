import React, { useContext, useState } from "react";
import { LabWork } from "../../models/domain/LabWork.ts";
import "../../styles/team-lab-works.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";
import { TeamAppointment } from "../../models/domain/TeamAppointment.ts";

interface Props {
  teamAppointments: TeamAppointment[];
  labWorks: LabWork[];
  onVariantClick: (teamAppointment: TeamAppointment) => void;
}

const TeamLabWorks: React.FC<Props> = ({
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

  //Works only if team has 1 variant per labWork
  return (
    <div className={`team-lab-works-container ${theme}`}>
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
            {teamAppointments
              .filter((appointment) => appointment.team.id == teamId)
              .map((appointment) =>
                labWorks.map((labWork) =>
                  labWork.variants.some(
                    (variant) => variant.id === appointment.labWorkVariant.id
                  ) ? (
                    <>
                      <p className="lab-work-title">{labWork.title}</p>
                      <div className="variants-container">
                        <div
                          className="variant"
                          onClick={() => onVariantClick(appointment)}
                        >
                          <p className="variant-title">
                            {appointment.labWorkVariant.title} {`${appointment.status}`}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null
                )
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLabWorks;
