import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";
import TaskForm from "../../forms/TaskForm";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";

const CreateTaskPage = () => {
  const { disciplineId } = useParams();
  const navigate = useNavigate();
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { taskApiService, disciplineApiService } = useContext(ApiContext);
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplineResponse = await disciplineApiService.getDiscipline(
          disciplineId
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

  const createTask = async (task, onCreate) => {
    try {
      await taskApiService
        .createTask(task)
        .then((response) =>
          showSuccessAlert(`Задание ${response.title} создано`)
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreate();
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return <TaskForm onFormSubmit={createTask} discipline={discipline} />;
};

export default CreateTaskPage;
