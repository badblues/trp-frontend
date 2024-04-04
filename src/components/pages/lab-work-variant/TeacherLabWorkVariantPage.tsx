import React, { useContext, useState, useEffect } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Loader from "../../Loader.tsx";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import { Role } from "../../../models/domain/Role.ts";
import Tests from "../../item-containers/Tests.tsx";
import "../../../styles/teacher-lab-work-variant-page.css";
import { LabWorkVariant } from "../../../models/domain/LabWorkVariant.ts";
import { LabWorkVariantTest } from "../../../models/domain/LabWorkVariantTest.ts";
import { LabWorkVariantTestDTO } from "../../../models/DTO/LabWorkVariantTestDTO.ts";
import LabWorkVariantForm from "../../forms/LabWorkVariantForm.tsx";

interface Props {
  defaultLabWorkVariant: LabWorkVariant;
}

const TeacherLabWorkVariantPage: React.FC<Props> = ({
  defaultLabWorkVariant,
}) => {
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { labWorkVariantApiService, labWorkVariantTestApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [labWorkVariant, setLabWorkVariant] = useState(defaultLabWorkVariant);
  const [tests, setTests] = useState<LabWorkVariantTest[]>([]);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const testsResponse =
          await labWorkVariantTestApiService.getLabWorkVariantTestsByLabWorkVariant(
            labWorkVariant.id
          );
        setTests(testsResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const updateLabWorkVariant = async (updatedLabWorkVariant, onUpdate) => {
  //   try {
  //     await labWorkVariantApiService
  //       .updateLabWorkVariant(updatedLabWorkVariant.id, updatedLabWorkVariant)
  //       .then((updatedLabWorkVariant) => {
  //         showSuccessAlert(`Задание ${updatedLabWorkVariant.title} обновлено`);
  //         setLabWorkVariant(updatedLabWorkVariant);
  //       });
  //   } catch (error) {
  //     showErrorAlert(error.error);
  //   } finally {
  //     onUpdate();
  //     setUpdating(false);
  //   }
  // };

  // const deleteLabWorkVariant = async () => {
  //   try {
  //     await labWorkVariantApiService.deleteLabWorkVariant(labWorkVariant.id);
  //     showSuccessAlert("Задание удалено");
  //     navigate("/");
  //   } catch (error) {
  //     showErrorAlert(error.error);
  //   }
  // };

  const addTest = async (test: LabWorkVariantTestDTO, onDone: () => void) => {
    try {
      const createdTest =
        await labWorkVariantTestApiService.createLabWorkVariantTest(test);
      showSuccessAlert("Тест добавлен");
      setTests([...tests, createdTest]);
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  const deleteTest = async (test: LabWorkVariantTest): Promise<void> => {
    try {
      // await labWorkVariantTestApiService.deleteLabWorkVariantTest(test.id);
      showSuccessAlert("Тест удален(нет)");
      //setTests(tests.filter((t) => t.id !== test.id));
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const updateTest = async (
    testId: number,
    test: LabWorkVariantTestDTO,
    onDone: () => void
  ) => {
    try {
      // await labWorkVariantTestApiService.updateLabWorkVariantTest(
      //   test.id,
      //   test
      // );
      showSuccessAlert("Тест обновлен(нет)");
      //setTests(tests.map((t) => (t.id === test.id ? test : t)));
      onDone();
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="update-lab-work-variant-page">
        <button
          className="close-lab-work-variant-form-button"
          onClick={() => setUpdating(false)}
        >
          ЗАКРЫТЬ
        </button>
      </div>
    );
  }

  return (
    <div className={`lab-work-variant-page ${theme}`}>
      <div className="lab-work-variant-information">
        <h1>{labWorkVariant.title}</h1>
        <h2>Язык: {labWorkVariant.language}</h2>
        <h2>Задание:</h2>
        <p>{labWorkVariant.description}</p>
        {labWorkVariant.testable ? (
          <>
            <h2>
              Функция: {labWorkVariant.returnType} {labWorkVariant.functionName}
              (
              {labWorkVariant.arguments.map((argument, index) => (
                <>
                  <span>
                    {argument.type} {argument.name}
                  </span>
                  {index < labWorkVariant.arguments.length - 1 ? (
                    <span>, </span>
                  ) : null}
                </>
              ))}
              )
            </h2>

            <h2>Тесты:</h2>
            <Tests
              tests={tests}
              labWorkVariant={labWorkVariant}
              onAddTest={addTest}
              onUpdateTest={updateTest}
              onDeleteTest={deleteTest}
              inputRegex={labWorkVariant.inputRegex}
              outputRegex={labWorkVariant.outputRegex}
            />
          </>
        ) : null}
      </div>
      {user!.role === Role.SeniorTeacher ? (
        <div className="control-panel">
          <button className="control-button" onClick={() => setUpdating(true)}>
            ИЗМЕНИТЬ ЗАДАНИЕ
          </button>
          <button className="control-button">УДАЛИТЬ ЗАДАНИЕ</button>
        </div>
      ) : null}
    </div>
  );
};

export default TeacherLabWorkVariantPage;
