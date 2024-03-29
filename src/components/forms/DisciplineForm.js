import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "../../styles/form.css";

const DisciplineForm = ({ discipline, onFormSubmit }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const onDone = () => {
    setLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (discipline != null) data.id = discipline.id;
    onFormSubmit(data, onDone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {discipline ? "ИЗМЕНЕНИЕ ДИСЦИПЛИНЫ" : "СОЗДАНИЕ ДИСЦИПЛИНЫ"}
        </h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название дисциплины
          </label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={discipline ? discipline.name : ""}
            {...register("name", {
              required: "Необходимо ввести название дисциплины",
            })}
          />
          <label className="form-text">{errors.name?.message}</label>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="year">
            Год:
          </label>
          <input
            id="year"
            className="form-input"
            type="number"
            placeholder="Год..."
            defaultValue={discipline ? discipline.year : currentYear}
            {...register("year", {
              required: "Необходимо ввести год",
            })}
          />
          <label className="form-text">{errors.year?.message}</label>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="halfYear">
            Полугодие:
          </label>
          <select
            id="halfYear"
            className="form-input"
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
          <label className="form-text">{errors.halfYear?.message}</label>
        </div>

        {discipline ? (
          <div className="form-checkbox-container">
            <label className="form-label" htmlFor="deprecated">
              Устаревшая:
            </label>
            <input
              id="deprecated"
              className={`form-checkbox ${theme}`}
              type="checkbox"
              placeholder="Устаревшая..."
              defaultChecked={discipline ? discipline.deprecated : false}
              {...register("deprecated")}
            />
          </div>
        ) : null}

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? (
            <Loader />
          ) : discipline ? (
            "ИЗМЕНИТЬ ДИСЦИПЛИНУ"
          ) : (
            "СОЗДАТЬ ДИСЦИПЛИНУ"
          )}
        </button>
      </div>
    </form>
  );
};

export default DisciplineForm;
