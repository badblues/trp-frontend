import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "./Form.css";

const DisciplineForm = ({ discipline, onFormSubmit }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const onDone = () => {
    setLoading(false);
  }

  const onSubmit = (data) => {
    setLoading(true);
    onFormSubmit(data, onDone);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <h1 className="form-name">{discipline ? "ИЗМЕНЕНИЕ ДИСЦИПЛИНЫ" : "СОЗДАНИЕ ДИСЦИПЛИНЫ"}</h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название дисциплины
          </label>
          <input
            id="name"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={discipline ? discipline.name : ""}
            {...register("name", {
              required: "Необходимо ввести название дисциплины",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.name?.message}
          </label>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="year">
            Год:
          </label>
          <input
            id="year"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="number"
            placeholder="Год..."
            defaultValue={discipline ? discipline.year : currentYear}
            {...register("year", {
              required: "Необходимо ввести год",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.year?.message}
          </label>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="halfYear">
            Полугодие:
          </label>
          <select
            id="halfYear"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Полугодие..."
            defaultValue={discipline ? discipline.halfYear : "FIRST"}
            {...register("halfYear", {
              required: "Необходимо ввести полугодие",
            })}
          >
            <option value="FIRST">Первое</option>
            <option value="SECOND">Второе</option>
          </select>
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.halfYear?.message}
          </label>
        </div>

        {discipline ? (
          <div className="form-checkbox-container">
            <label className="form-label" htmlFor="deprecated">
              Устаревшая:
            </label>
            <input
              id="deprecated"
              className={`form-checkbox ${darkMode ? "dark-mode" : ""}`}
              type="checkbox"
              placeholder="Устаревшая..."
              defaultChecked={discipline ? discipline.deprecated : false}
              {...register("deprecated")}
            />
          </div>) : null}

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader /> : discipline ? "ИЗМЕНИТЬ ДИСЦИПЛИНУ" : "СОЗДАТЬ ДИСЦИПЛИНУ"}
        </button>
      </div>
    </form>
  );
};

export default DisciplineForm;
