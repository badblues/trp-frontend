import React, { ReactNode, useContext, useState } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import { LabWork } from "../../models/domain/LabWork.ts";
import rightArrow from "../../images/right-arrow.png";
import downArrow from "../../images/down-arrow.png";
import binImg from "../../images/bin.png";
import editImg from "../../images/edit.png";
import plusImg from "../../images/plus.png";
import "../../styles/lab-works-list.css";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";

interface Props {
  labWorks: LabWork[];
  onAddLabWorkVariantClick: (labWork: LabWork) => void;
  onLabWorkVariantSelect: (labWorkVariant: LabWorkVariant) => void;
}

const LabWorks: React.FC<Props> = ({ labWorks, onAddLabWorkVariantClick, onLabWorkVariantSelect }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openLabWorks, setOpenLabWorks] = useState<Set<LabWork>>(new Set());

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
    console.log(labWork);
    console.log(openLabWorks);
    if (openLabWorks.has(labWork)) {
      openLabWorks.delete(labWork);
    } else {
      openLabWorks.add(labWork);
    }
    setOpenLabWorks(new Set(openLabWorks));
  };

  return (
    <div className={`lab-work-list ${theme}`}>
      {labWorks.map((labWork) => (
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
            <div className="buttons-container">
              <button className="button-with-image">
                <img
                  onClick={() => {
                    onAddLabWorkVariantClick(labWork);
                  }}
                  className="icon"
                  src={plusImg}
                  alt="Add variant"
                  width="13"
                />
              </button>
              <button className="button-with-image">
                <img className="icon" src={editImg} alt="Edit" width="13" />
              </button>
              <button className="button-with-image">
                <img className="icon" src={binImg} alt="Delete" width="13" />
              </button>
            </div>
          </div>
          {openLabWorks.has(labWork)
            ? labWork.variants.map((variant) => (
                <div className="variant" key={variant.id}>
                  <p
                    onClick={() => onLabWorkVariantSelect(variant)}
                    className="variant-title"
                  >
                    {variant.title}
                  </p>
                </div>
              ))
            : null}
        </div>
      ))}
    </div>
  );
};

export default LabWorks;
