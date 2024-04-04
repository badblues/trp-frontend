import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/form.css";
import { LabWorkDTO } from "../../models/DTO/LabWorkDTO.ts";
import { LabWork } from "../../models/domain/LabWork.ts";
import { Discipline } from "../../models/domain/Discipline.ts";

interface Props {
  edit: boolean;
  labWork?: LabWork;
  discipline: Discipline;
  onFormSubmit: (labWorkDTO: LabWorkDTO, onDone: () => void) => void;
}

const LabWorkForm: React.FC<Props> = ({
  edit,
  labWork,
  onFormSubmit,
  discipline,
}) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    data.disciplineId = discipline.id;
    onFormSubmit(data as LabWorkDTO, () => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {edit
            ? "ИЗМЕНЕНИЕ ЛАБОРАТОРНОЙ РАБОТЫ"
            : "СОЗДАНИЕ ЛАБОРАТОРНОЙ РАБОТЫ"}
        </h1>
        <h2 className="form-name">
          {discipline.name} {discipline.year}
        </h2>

        <div className="form-input-container">
          <label className="form-label" htmlFor="title">
            Название:
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={edit ? labWork?.title : ""}
            {...register("title", {
              required: "Необходимо ввести название",
            })}
          />
          <p className="form-text">{errors.title?.message as string}</p>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="maxRating">
            Максимальный балл:
          </label>
          <input
            id="maxRating"
            className="form-input"
            type="number"
            placeholder="Максимальный балл..."
            autoComplete="off"
            defaultValue={edit ? labWork?.maxRating : ""}
            {...register("maxRating", {
              required: "Необходимо ввести максимальный балл",
            })}
          />
          <p className="form-text">
            {errors.maxRating?.message as string}
          </p>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? <Loader /> : edit ? "ИЗМЕНИТЬ" : "СОЗДАТЬ"}
        </button>
      </div>
    </form>
  );
};

export default LabWorkForm;
