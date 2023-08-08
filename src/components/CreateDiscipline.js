import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Roles } from "../models/Roles";
import { ApiContext } from "../contexts/ApiContext";
import { UiContext } from "../contexts/UiContext";
import Loader from "./Loader";

const CreateDiscipline = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let discipline = {
      name: data.name,
      year: data.year,
      halfYear: data.halfYear,
      deprecated: data.deprecated,
    };
    setLoading(true);
    try {
      console.log(discipline);
      await disciplineApiService
        .createDiscipline(discipline)
        .then((response) => alert(`Success, ${response.name} created`));
    } catch (error) {
      alert(error.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <p className="form-name">СОЗДАНИЕ ДИСЦИПЛИНЫ</p>

        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название дисциплины
          </label>
          <input
            id="name"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Название..."
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

        <div className="form-checkbox-container">
          <label className="form-label" htmlFor="deprecated">
            Устаревшая:
          </label>
          <input
            id="deprecated"
            className={`form-checkbox ${darkMode ? "dark-mode" : ""}`}
            type="checkbox"
            placeholder="Устаревшая..."
            {...register("deprecated")}
          />
        </div>

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader /> : "Создать пользователя"}
        </button>
      </div>
    </form>
  );
};

export default CreateDiscipline;
