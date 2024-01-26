import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "./Form.css";

const TaskForm = ({ task, onFormSubmit, discipline }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(false);

  const onDone = () => {
    setLoading(false);
  }

  const onSubmit = (data) => {
    setLoading(true);
    data.disciplineId = discipline.id;
    onFormSubmit(data, onDone);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <h1 className="form-name">СОЗДАНИЕ ЗАДАНИЯ</h1>
        <h2 className="form-name">{discipline.name} {discipline.year}</h2>
      
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
            defaultValue={task ? task.title : ""}
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
            defaultValue={task ? task.description : ""}
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
            defaultValue={task ? task.functionName : ""}
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
            defaultValue={task ? task.language : ""}
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

export default TaskForm