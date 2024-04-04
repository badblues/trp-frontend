import React, { useContext, useState } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import TestForm from "../forms/TestForm.tsx";
import binImg from "../../images/bin.png";
import editImg from "../../images/edit.png";
import "../../styles/test-list.css";
import { LabWorkVariantTest } from "../../models/domain/LabWorkVariantTest.ts";
import { LabWorkVariantTestDTO } from "../../models/DTO/LabWorkVariantTestDTO.ts";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";

interface Props {
  tests: LabWorkVariantTest[];
  labWorkVariant: LabWorkVariant;
  onAddTest: (testDTO: LabWorkVariantTestDTO, onDone: () => void) => void;
  onDeleteTest: (test: LabWorkVariantTest) => void;
  onUpdateTest: (
    testId: number,
    testDTO: LabWorkVariantTestDTO,
    onDone: () => void
  ) => void;
  inputRegex: string;
  outputRegex: string;
}

const Tests: React.FC<Props> = ({
  tests,
  labWorkVariant,
  onAddTest,
  onDeleteTest,
  onUpdateTest,
  inputRegex,
  outputRegex,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTest, setEditingTest] = useState<LabWorkVariantTest | null>(
    null
  );

  const updateTest = (
    testDTO: LabWorkVariantTestDTO,
    onDone: () => void
  ): void => {
    if (editingTest != null) {
      const testId = editingTest.id;
      onUpdateTest(testId, testDTO, () => {
        setEditingTest(null);
        onDone();
      });
    }
  };

  return (
    <div className={`test-list ${theme}`}>
      <div className="add-test-container">
        <button
          onClick={() => setIsAddingTest(!isAddingTest)}
          className="open-test-form-button"
        >
          {isAddingTest ? "ЗАКРЫТЬ" : "ДОБАВИТЬ ТЕСТЫ"}
        </button>
        {isAddingTest ? (
          <TestForm
            edit={false}
            onFormSubmit={(test, onDone) => onAddTest(test, onDone)}
            labWorkVariant={labWorkVariant}
            inputRegex={inputRegex}
            outputRegex={outputRegex}
          />
        ) : null}
      </div>

      {tests.map((test) => (
        <div className="item" key={test.id}>
          {editingTest === test ? (
            <div>
              <TestForm
                edit={true}
                test={test}
                onFormSubmit={updateTest}
                labWorkVariant={labWorkVariant}
                inputRegex={inputRegex}
                outputRegex={outputRegex}
              />
              <button onClick={() => setEditingTest(null)} className="button">
                ОТМЕНА
              </button>
            </div>
          ) : (
            <div>
              <span className="bold-text">In: </span>
              <span>{test.input}</span>
              <br />
              <span className="bold-text">Out: </span>
              <span>{test.output}</span>
              <div>
                <button
                  onClick={() => onDeleteTest(test)}
                  className="button-with-image"
                >
                  <img className="icon" src={binImg} alt="Delete" width="17" />
                </button>
                <button
                  onClick={() => {
                    setEditingTest(test);
                  }}
                  className="button-with-image"
                >
                  <img className="icon" src={editImg} alt="Edit" width="17" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tests;
