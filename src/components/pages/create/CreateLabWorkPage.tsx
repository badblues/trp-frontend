import React, { useContext, useEffect, useState } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import LabWorkForm from "../../forms/LabWorkForm.tsx";
import { Discipline } from "../../../models/domain/Discipline.ts";
import Loader from "../../Loader.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { LabWorkDTO } from "../../../models/DTO/LabWorkDTO";
import "../../../styles/create-item-page.css";

const CreateLabWorkPage = () => {
  const { disciplineId } = useParams();
  const navigate = useNavigate();
  const { showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { disciplineApiService, labWorkApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const [discipline, setDiscipline] = useState<Discipline>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplineResponse = await disciplineApiService.getDiscipline(
          Number(disciplineId)
        );
        setDiscipline(disciplineResponse);
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createLabWork = async (labWorkDTO: LabWorkDTO, onDone: () => void) => {
    try {
      await labWorkApiService
        .createLabWork(labWorkDTO)
        .then((response) =>
          showSuccessAlert(`Лабораторная работа: ${response.title} создана`)
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="create-page">
      <LabWorkForm
        edit={false}
        discipline={discipline!}
        onFormSubmit={createLabWork}
      />
    </div>
  );
};

export default CreateLabWorkPage;
