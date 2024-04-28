import React, { useContext } from "react";
import { LabWork } from "../../models/domain/LabWork.ts";
import "../../styles/team-lab-works.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { TeamAppointment } from "../../models/domain/TeamAppointment.ts";
import { Team } from "../../models/domain/Team.ts";

interface Props {
  teamAppointments: TeamAppointment[];
  labWorks: LabWork[];
  teams: Team[];
  onVariantClick: (teamAppointment: TeamAppointment) => void;
}

const TeamLabWorks: React.FC<Props> = ({
  teamAppointments,
  labWorks,
  teams,
  onVariantClick,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;

  teams.sort((t1, t2): number => {
    return t1.id - t2.id;
  });

  //Works only if team has 1 variant per labWork
  return (
    <div className={`team-lab-works-container ${theme}`}>
      {teams.map((team) => (
        <div key={team.id} className="team-container">
          <div className="team-name">
            <p className="team-title">Бригада {team.id}:</p>
            {team.students.map((student) => (
              <p className="student-name">{student.fullName}</p>
            ))}
          </div>

          <div className="lab-works-container">
            {teamAppointments
              .filter((appointment) => appointment.team.id == team.id)
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
                            {appointment.labWorkVariant.title}{" "}
                            {`${appointment.status}`}
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
