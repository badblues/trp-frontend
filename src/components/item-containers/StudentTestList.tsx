import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/test-list.css";
import { LabWorkVariantTest } from "../../models/domain/LabWorkVariantTest.ts";

interface Props {
  tests: LabWorkVariantTest[];
}

const StudentTestList: React.FC<Props> = ({ tests }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  console.log(tests);

  tests.sort((t1, t2): number => {
    if (t1.open && t2.open) return 0;
    else if (t1.open && !t2.open) return -1;
    else if (!t1.open && t2.open) return 1;
    else return 0;
  });

  return (
    <div className={`test-list ${theme}`}>
      <div className="tests">
        {tests.map((test) => (
          <div className="item" key={test.id}>
            <div>
              <p className="bold-text">Тест {test.id}:</p>
              <span className="bold-text">In: </span>
              <span className="test-content">{test.input}</span>
              <br />
              <span className="bold-text">Out: </span>
              <span className="test-content">{test.output}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTestList;
