import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ApiContext } from "../contexts/ApiContext";
import { UiContext } from "../contexts/UiContext";
import Loader from "./Loader";

const CreateTask = () => {
  const { disciplineId } = useParams();
  const [ discipline, setDiscipline ] = useState(null);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { taskApiService, disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await disciplineApiService.getDiscipline(disciplineId);
      setDiscipline(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    let task = {
      disciplineId: disciplineId,
      title: data.title,
      description: data.description,
      functionName: data.functionName,
      language: data.language,
    };
    setLoading(true);
    try {
      await taskApiService
        .createTask(task)
        .then((response) => alert(`Success, ${response.title} created`));
    } catch (error) {
      alert(error.error);
    } finally {
      setLoading(false);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <p className="form-name">СОЗДАНИЕ ЗАДАНИЯ</p>
        <p className="form-name">{discipline.name} {discipline.year}</p>
      
        <div className="form-input-container">
          <label className="form-label" htmlFor="title">
            Название:
          </label>
          <input
            id="title"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Название..."
            autoComplete="off"
            {...register("title", {
              required: "Необходимо ввести название",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.title?.message}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="description">
            Описание:
          </label>
          <input
            id="description"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Описание..."
            autoComplete="off"
            {...register("description", {
              required: "Необходимо ввести описание",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.description?.message}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="functionName">
            Название функции:
          </label>
          <input
            id="functionName"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Название функции..."
            autoComplete="off"
            {...register("functionName", {
              required: "Необходимо ввести название функции",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.functionName?.message}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="language">
            Язык программирования:
          </label>
          <input
            id="language"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Язык программирования..."
            autoComplete="off"
            {...register("language", {
              required: "Необходимо ввести язык программирования",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.language?.message}
          </label>
        </div>

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader/> : "Создать задание"}
        </button>
      </div>
    </form>
  );
}

export default CreateTask