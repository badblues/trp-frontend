import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import { Role } from "../../../models/domain/Role.ts";
import Loader from "../../Loader.tsx";
import StudentLabWorkVariantPage from "./StudentLabWorkVariantPage.tsx";
import TeacherLabWorkVariantPage from "./TeacherLabWorkVariantPage.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { LabWorkVariant } from "../../../models/domain/LabWorkVariant.ts";
import { Language } from "../../../models/domain/Language.ts";
import { CType } from "../../../models/domain/Type.ts";

const LabWorkVariantPage = () => {
  const { labWorkVariantId } = useParams();
  const navigate = useNavigate();
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const { labWorkVariantApiService } = useContext(ApiContext) as ApiContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [labWorkVariant, setLabWorkVariant] = useState<LabWorkVariant>();

  useEffect(() => {
    (async () => {
      try {
        //TEMPORARY
        // const labWorkVariantResponse =
        //   await labWorkVariantApiService.getLabWorkVariant(
        //     Number(labWorkVariantId)
        //   );
        //setLabWorkVariant(labWorkVariantResponse);
        //TEMPORARY
        setLabWorkVariant({
          id: 1,
          labWorkId: 1,
          title: "1. Функция суммы",
          description:
            "Создайте функцию add, которая принимает два аргумента (числа) и возвращает их сумму.",
          language: Language.C,
          testable: true,
          functionName: "add",
          returnType: CType.Int,
          arguments: [
            {
              name: "a",
              type: "int",
            },
            {
              name: "b",
              type: "int",
            },
          ],
          inputRegex: "",
          outputRegex: "",
        });
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = {
    [Role.Teacher]: TeacherLabWorkVariantPage,
    [Role.SeniorTeacher]: TeacherLabWorkVariantPage,
    [Role.Student]: StudentLabWorkVariantPage,
  };

  const Page = pages[user!.role] || null;

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return <>{Page && <Page defaultLabWorkVariant={labWorkVariant} />} </>;
};

export default LabWorkVariantPage;
