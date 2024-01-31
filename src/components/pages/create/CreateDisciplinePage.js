import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import DisciplineForm from "../../forms/DisciplineForm";
import { UiContext } from "../../../contexts/UiContext";

const CreateDisciplinePage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { disciplineApiService } = useContext(ApiContext);

  const createDiscipline = async (discipline, onCreate) => {
    try {
      await disciplineApiService
        .createDiscipline(discipline)
        .then((response) => showSuccessAlert(`Дисциплина ${response.title} создана`));
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreate();
    }
  };

  return (
    <div>
      <DisciplineForm onFormSubmit={createDiscipline} />
    </div>
  );
};

export default CreateDisciplinePage;
