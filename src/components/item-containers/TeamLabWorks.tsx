import React, { useContext, useState } from "react";
import { LabWork } from "../../models/domain/LabWork";
import { Team } from "../../models/domain/Team";
import "../../styles/team-lab-works.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";

interface Props {
  teams: Team[];
  labWorks: LabWork[];
}

interface TeamLabWork {
  teamId: number;
  labWorkId: number;
}

const TeamLabWorks: React.FC<Props> = ({ teams, labWorks }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openTeamLabWorks, setOpenTeamLabWorks] = useState<TeamLabWork[]>([]);

  const onTeamLabWorkSelect = (team: Team, labWork: LabWork): void => {
    if (
      openTeamLabWorks.some(
        (tlw) => tlw.teamId === team.id && tlw.labWorkId === labWork.id
      )
    ) {
      setOpenTeamLabWorks(
        openTeamLabWorks.filter(
          (tlw) => !(tlw.teamId === team.id && tlw.labWorkId === labWork.id)
        )
      );
    } else if (openTeamLabWorks.some((tlw) => tlw.teamId === team.id)) {
      openTeamLabWorks.forEach((tlw) => {
        if (tlw.teamId === team.id) tlw.labWorkId = labWork.id;
      });
      setOpenTeamLabWorks([...openTeamLabWorks]);
    } else {
      openTeamLabWorks.push({ teamId: team.id, labWorkId: labWork.id });
      setOpenTeamLabWorks([...openTeamLabWorks]);
    }
  };

  return (
    <div className={`team-lab-works-container ${theme}`}>
      {teams.map((team) => (
        <div className="team-container">
          <p className="team-title">Бригада {team.id}</p>
          <div className="lab-works-with-variants-container">
            <div className="lab-works-container">
              {labWorks.map((labWork) => (
                <div>
                  <p
                    className="lab-work-title"
                    onClick={() => onTeamLabWorkSelect(team, labWork)}
                  >
                    {labWork.title}
                  </p>
                </div>
              ))}
            </div>
            {openTeamLabWorks.some((tlw) => tlw.teamId === team.id) ? (
              <div className="variants-container">
                {labWorks
                  .filter((lW) =>
                    openTeamLabWorks.some(
                      (tlw) => tlw.labWorkId === lW.id && tlw.teamId === team.id
                    )
                  )[0]
                  .variants.map((variant) => (
                    <div className="variant">
                      <p className="variant-title">{variant.title}</p>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLabWorks;
