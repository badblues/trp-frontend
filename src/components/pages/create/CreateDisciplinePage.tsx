import React, { useContext } from "react";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import DisciplineForm from "../../forms/DisciplineForm.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/create-item-page.css";
import { DisciplineDTO } from "../../../models/DTO/DisciplineDTO.ts";

const CreateDisciplinePage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { disciplineApiService } = useContext(ApiContext) as ApiContextType;

  const createDiscipline = async (
    disciplineDTO: DisciplineDTO,
    onDone: () => void
  ) => {
    try {
      await disciplineApiService
        .createDiscipline(disciplineDTO)
        .then((response) =>
          showSuccessAlert(`Дисциплина ${response.name} создана`)
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  return (
    <div className="create-page">
      <DisciplineForm edit={false} onFormSubmit={createDiscipline} />
    </div>
  );
};

export default CreateDisciplinePage;
