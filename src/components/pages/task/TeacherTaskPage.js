import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UiContext } from '../../../contexts/UiContext';
import { ApiContext } from '../../../contexts/ApiContext';
import TaskForm from '../../forms/TaskForm';
import "./Task.css";
import Loader from '../../Loader';
import { UserContext } from '../../../contexts/UserContext';
import { Roles } from '../../../models/Roles';

const TeacherTaskPage = ({ defaultTask }) => {

  const { darkMode, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { user } = useContext(UserContext);
  const { taskApiService,
          disciplineApiService } = useContext(ApiContext);
  const navigate = useNavigate();
  const [task, setTask] = useState(defaultTask);
  const [discipline, setDiscipline] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const disciplineRespoinse = await disciplineApiService.getDiscipline(task.disciplineId);
      setDiscipline(disciplineRespoinse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateTask = async (updatedTask, onUpdate) => {
    try {
      await taskApiService
        .updateTask(task.id, updatedTask)
        .then((updatedTask) => {
          showSuccessAlert(`Задание ${updatedTask.title} обновлено`);
          setTask(updatedTask);
        });
    } catch(errorData) {
      showErrorAlert(errorData.error);
    } finally {
      onUpdate();
      setUpdating(false);
    }
  }

  const deleteTask = async () => {
    try {
      await taskApiService.deleteTask(task.id);
      showSuccessAlert("Задание удалено");
      navigate("/");
    } catch (errorData) {
      showErrorAlert(errorData.error);
    }
  }

  if (loading) { 
    return (
      <div className='loader-container'> 
        <Loader/>
      </div>
    )
  }

  if (updating) {
    return (
      <div className='task-container'>
        <div className='task-update-form'>
          <TaskForm
            discipline={discipline}
            onFormSubmit={updateTask}
            task={task}/>
        </div>
        <button
          className='button'
          onClick={() => setUpdating(false)}>
          ЗАКРЫТЬ
        </button>
      </div>
    )
  }

  return (
    <div className='task-container'>
      <div className='task-desctiption'>
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>
          {task.title}
        </h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Название функции: {task.functionName}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Язык: {task.language}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Задание:
        </h2>
        <p className={`${darkMode ? "dark-mode" : ""}`}>
          {task.description}
        </p>
      </div>
      {user.role === Roles.SeniorTeacher ? (
        <div div className='task-controll'>
          <button
            className='button'
            onClick={() => setUpdating(true)}>
            ИЗМЕНИТЬ ЗАДАНИЕ
          </button>
          <button
            className='button'>
            ИЗМЕНИТЬ ТЕСТЫ
          </button>
          <button
            className='button'
            onClick={deleteTask}>
            УДАЛИТЬ ЗАДАНИЕ
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default TeacherTaskPage