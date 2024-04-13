import React, { useContext, useState } from "react";
import { LabWork } from "../../models/domain/LabWork.ts";
import "../../styles/team-lab-work-appointments.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { TeamWithVariants } from "../../models/domain/TeamWithVariants.ts";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";

interface Props {
  teamsWithVariants: TeamWithVariants[];
  labWorks: LabWork[];
  onVariantClick: (team: TeamWithVariants, variant: LabWorkVariant) => void;
}

interface TeamLabWork {
  teamId: number;
  labWorkId: number;
}

const TeamLabWorkAppointments: React.FC<Props> = ({
  teamsWithVariants,
  labWorks,
  onVariantClick,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openTeamLabWorks, setOpenTeamLabWorks] = useState<TeamLabWork[]>([]);

  teamsWithVariants.sort((t1, t2): number => {
    return t1.team.id - t2.team.id;
  });

  const onTeamLabWorkSelect = (teamWithVariants, labWork: LabWork): void => {
    if (
      openTeamLabWorks.some(
        (tlw) =>
          tlw.teamId === teamWithVariants.id && tlw.labWorkId === labWork.id
      )
    ) {
      setOpenTeamLabWorks(
        openTeamLabWorks.filter(
          (tlw) =>
            !(
              tlw.teamId === teamWithVariants.id && tlw.labWorkId === labWork.id
            )
        )
      );
    } else if (
      openTeamLabWorks.some((tlw) => tlw.teamId === teamWithVariants.id)
    ) {
      openTeamLabWorks.forEach((tlw) => {
        if (tlw.teamId === teamWithVariants.id) tlw.labWorkId = labWork.id;
      });
      setOpenTeamLabWorks([...openTeamLabWorks]);
    } else {
      openTeamLabWorks.push({
        teamId: teamWithVariants.id,
        labWorkId: labWork.id,
      });
      setOpenTeamLabWorks([...openTeamLabWorks]);
    }
  };

  return (
    <div className={`team-lab-work-appointments-container ${theme}`}>
      {teamsWithVariants.map((teamWithVariants, index) => (
        <div key={index} className="team-container">
          <div className="team-name">
            <p className="team-title">Бригада {teamWithVariants.team.id}:</p>
            {teamWithVariants.team.students.map((student) => (
              <p className="student-name">{student.fullName}</p>
            ))}
          </div>
          <div className="lab-works-with-variants-container">
            <div className="lab-works-container">
              {labWorks.map((labWork, index) => (
                <div key={index}>
                  <p
                    className={`lab-work-title ${
                      teamWithVariants.variants.some((v1) =>
                        labWork.variants.some((v2) => v1.id === v2.id)
                      )
                        ? "appointed"
                        : "not-appointed"
                    }`}
                    onClick={() =>
                      onTeamLabWorkSelect(teamWithVariants.team, labWork)
                    }
                  >
                    {labWork.title}
                  </p>
                </div>
              ))}
            </div>
            {openTeamLabWorks.some(
              (tlw) => tlw.teamId === teamWithVariants.team.id
            ) ? (
              <div className="variants-container">
                {labWorks
                  .filter((lW) =>
                    openTeamLabWorks.some(
                      (tlw) =>
                        tlw.labWorkId === lW.id &&
                        tlw.teamId === teamWithVariants.team.id
                    )
                  )[0]
                  .variants.map((variant, index) => (
                    <div
                      key={index}
                      className={`variant ${
                        teamWithVariants.variants.some(
                          (v) => v.id === variant.id
                        )
                          ? "appointed"
                          : "not-appointed"
                      }`}
                    >
                      <p
                        className="variant-title"
                        onClick={() => {
                          onVariantClick(teamWithVariants, variant);
                        }}
                      >
                        {variant.title}
                      </p>
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

export default TeamLabWorkAppointments;
