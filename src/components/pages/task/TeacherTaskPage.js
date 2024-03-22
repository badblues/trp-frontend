import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import TaskForm from "../../forms/TaskForm";
import "./Task.css";
import Loader from "../../Loader";
import { UserContext } from "../../../contexts/UserContext";
import { Roles } from "../../../models/Roles";
import Tests from "../../item-containers/Tests";

const TeacherTaskPage = ({ defaultTask }) => {
  const { darkMode, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { taskApiService, disciplineApiService, taskTestApiService } =
    useContext(ApiContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [task, setTask] = useState(defaultTask);
  const [discipline, setDiscipline] = useState(null);
  const [tests, setTests] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplineRespoinse = await disciplineApiService.getDiscipline(
          task.disciplineId
        );
        const testsResponse = await taskTestApiService.getTaskTestsByTask(
          task.id
        );
        setTests(testsResponse);
        setDiscipline(disciplineRespoinse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTask = async (updatedTask, onUpdate) => {
    try {
      await taskApiService
        .updateTask(updatedTask.id, updatedTask)
        .then((updatedTask) => {
          showSuccessAlert(`Задание ${updatedTask.title} обновлено`);
          setTask(updatedTask);
        });
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onUpdate();
      setUpdating(false);
    }
  };

  const deleteTask = async () => {
    try {
      await taskApiService.deleteTask(task.id);
      showSuccessAlert("Задание удалено");
      navigate("/");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const addTest = async (test, onDone) => {
    try {
      const createdTest = await taskTestApiService.createTaskTest(test);
      showSuccessAlert("Тест добавлен");
      setTests([...tests, createdTest]);
      onDone();
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const deleteTest = async (test, onDone) => {
    try {
      await taskTestApiService.deleteTaskTest(test.id);
      showSuccessAlert("Тест удален");
      setTests(tests.filter((t) => t.id !== test.id));
      onDone();
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const updateTest = async (test, onDone) => {
    try {
      await taskTestApiService.updateTaskTest(test.id, test);
      showSuccessAlert("Тест обновлен");
      setTests(tests.map((t) => (t.id === test.id ? test : t)));
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
      <div className="task-container">
        <div className="task-update-form">
          <TaskForm
            discipline={discipline}
            onFormSubmit={updateTask}
            task={task}
          />
        </div>
        <button className="button" onClick={() => setUpdating(false)}>
          ЗАКРЫТЬ
        </button>
      </div>
    );
  }

  return (
    <div className="task-container">
      <div className="task-information">
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{task.title}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Название функции: {task.functionName}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Язык: {task.language}
        </h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Задание:</h2>
        <p className={`task-description ${darkMode ? "dark-mode" : ""}`}>
          {task.description}
        </p>
        <h2>Тесты:</h2>
        <Tests
          tests={tests}
          task={task}
          onAddTest={addTest}
          onUpdateTest={updateTest}
          onDeleteTest={deleteTest}
        />
      </div>
      {user.role === Roles.SeniorTeacher ? (
        <div className="task-controll">
          <button
            className="button control-button"
            onClick={() => setUpdating(true)}
          >
            ИЗМЕНИТЬ ЗАДАНИЕ
          </button>
          <button className="button control-button" onClick={deleteTask}>
            УДАЛИТЬ ЗАДАНИЕ
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TeacherTaskPage;
