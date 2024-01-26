import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ApiContext } from "../../../contexts/ApiContext";
import TaskForm from "../../forms/TaskForm";
import Loader from "../../Loader";


const CreateTaskPage = () => {
  const { disciplineId } = useParams();
  const { taskApiService, disciplineApiService } = useContext(ApiContext);
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await disciplineApiService.getDiscipline(disciplineId);
      setDiscipline(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  const createTask = async (task, onCreate) => {
    try {
      await taskApiService
        .createTask(task)
        .then((response) => alert(`Success, ${response.title} created`));
    } catch (error) {
      alert(error.error);
    } finally {
      onCreate();
    }
  };

  if (loading) {
    return (
      <div>
        <Loader/>
      </div>
    );
  }

  return (
   <TaskForm onFormSubmit={createTask} discipline={discipline}/>
  );
}

export default CreateTaskPage