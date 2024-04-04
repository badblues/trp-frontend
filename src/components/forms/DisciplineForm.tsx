import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/form.css";
import { Discipline } from "../../models/domain/Discipline.ts";
import { DisciplineDTO } from "../../models/DTO/DisciplineDTO.ts";
import { HalfYear } from "../../models/domain/HalfYear.ts";

interface Props {
  edit: boolean;
  discipline?: Discipline;
  onFormSubmit: (disciplineDTO: DisciplineDTO, onDone: () => void) => void;
}

const DisciplineForm: React.FC<Props> = ({
  edit,
  discipline,
  onFormSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const onSubmit = (data: any) => {
    setLoading(true);
    onFormSubmit(data as DisciplineDTO, () => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {edit ? "ИЗМЕНЕНИЕ ДИСЦИПЛИНЫ" : "СОЗДАНИЕ ДИСЦИПЛИНЫ"}
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
            defaultValue={edit ? discipline?.name : ""}
            {...register("name", {
              required: "Необходимо ввести название дисциплины",
            })}
          />
          <p className="form-text">{errors.name?.message as string}</p>
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
            defaultValue={edit ? discipline?.year : currentYear}
            {...register("year", {
              required: "Необходимо ввести год",
            })}
          />
          <p className="form-text">{errors.year?.message as string}</p>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="halfYear">
            Полугодие:
          </label>
          <select
            id="halfYear"
            className="form-input"
            defaultValue={edit ? discipline?.halfYear : HalfYear.First}
            {...register("halfYear", {
              required: "Необходимо ввести полугодие",
            })}
          >
            <option value={HalfYear.First}>Первое</option>
            <option value={HalfYear.Second}>Второе</option>
          </select>
          <p className="form-text">{errors.halfYear?.message as string}</p>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? (
            <Loader />
          ) : edit ? (
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
