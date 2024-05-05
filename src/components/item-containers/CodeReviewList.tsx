import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/code-review-list.css";

interface Props {
  codeReviewIds: number[];
  onCodeReviewSelect: (codeReviewId: number) => void;
}

const CodeReviewList: React.FC<Props> = ({
  codeReviewIds,
  onCodeReviewSelect,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`code-review-list-container ${theme}`}>
      {codeReviewIds.map((cR) => (
        <h4 className="code-review-link" onClick={() => onCodeReviewSelect(cR)}>
          Код Ревью {cR}
        </h4>
      ))}
    </div>
  );
};

export default CodeReviewList;
