import React, { useContext, useState } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { LabWork } from "../../models/domain/LabWork.ts";
import rightArrow from "../../images/right-arrow.png";
import downArrow from "../../images/down-arrow.png";
import "../../styles/lab-works-list.css";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";
import { TeamAppointment } from "../../models/domain/TeamAppointment.ts";
import { StatusToTextMap } from "../../models/domain/StatusToTextMap.ts";
import { UserContext, UserContextType } from "../../contexts/UserContext.tsx";

interface Props {
  labWorks: LabWork[];
  teamAppointments: TeamAppointment[];
  onLabWorkVariantSelect: (labWorkVariant: LabWorkVariant) => void;
}

const StudentLabWorksList: React.FC<Props> = ({
  labWorks,
  teamAppointments,
  onLabWorkVariantSelect,
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { theme } = useContext(UiContext) as UiContextType;
  const [openLabWorks, setOpenLabWorks] = useState<Set<LabWork>>(
    new Set(labWorks)
  );

  labWorks.sort((a: LabWork, b: LabWork) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const onLabWorkSelect = (labWork: LabWork): void => {
    if (openLabWorks.has(labWork)) {
      openLabWorks.delete(labWork);
    } else {
      openLabWorks.add(labWork);
    }
    setOpenLabWorks(new Set(openLabWorks));
  };

  return (
    <div className={`lab-work-list ${theme}`}>
      {labWorks.map((labWork) =>
        teamAppointments.some(
          (tA) => tA.labWorkVariant.labWorkId === labWork.id
        ) ? (
          <div className="lab-work" key={labWork.id}>
            <div className="lab-work-container">
              <div
                className="title-container"
                onClick={() => onLabWorkSelect(labWork)}
              >
                {openLabWorks.has(labWork) ? (
                  <img
                    className="arrow"
                    src={downArrow}
                    width="13px"
                    height="13px"
                  />
                ) : (
                  <img
                    className="arrow"
                    src={rightArrow}
                    width="13px"
                    height="13px"
                  />
                )}
                <h4 className="title">{labWork.title}</h4>
              </div>
            </div>
            {openLabWorks.has(labWork)
              ? labWork.variants.map((variant) => (
                  <div className="variant" key={variant.id}>
                    <p
                      onClick={() => onLabWorkVariantSelect(variant)}
                      className="variant-title"
                    >
                      {variant.title}{" "}
                      <span
                        className={`status ${
                          teamAppointments.find(
                            (tA) => tA.labWorkVariant.labWorkId === labWork.id
                          )?.status
                        }`}
                      >
                        {`${
                          StatusToTextMap[
                            teamAppointments.find(
                              (tA) => tA.labWorkVariant.labWorkId === labWork.id
                            )!.status
                          ]
                        }`}
                        {"  "}
                        {/* TODO REWORK */}
                        <span className="grade">
                          {teamAppointments.find(
                            (tA) => tA.labWorkVariant.labWorkId === labWork.id
                          )!.ratings?.length
                            ? teamAppointments
                                .find(
                                  (tA) =>
                                    tA.labWorkVariant.labWorkId === labWork.id
                                )!
                                .ratings.find((r) => r.studentId === user?.id)
                                ?.grade +
                              "/" +
                              teamAppointments
                                .find(
                                  (tA) =>
                                    tA.labWorkVariant.labWorkId === labWork.id
                                )!
                                .ratings.find((r) => r.studentId === user?.id)
                                ?.maxRating
                            : null}
                        </span>
                      </span>
                    </p>
                  </div>
                ))
              : null}
          </div>
        ) : null
      )}
    </div>
  );
};

export default StudentLabWorksList;
