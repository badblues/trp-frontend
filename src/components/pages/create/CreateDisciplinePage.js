import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import DisciplineForm from "../../forms/DisciplineForm";

const CreateDisciplinePage = () => {
  const { disciplineApiService } = useContext(ApiContext);

  const createDiscipline = async (discipline, onCreate) => {
    try {
      await disciplineApiService
        .createDiscipline(discipline)
        .then((response) => alert(`Success, ${response.name} created`));
    } catch (error) {
      alert(error.error);
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
