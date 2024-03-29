import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "../../styles/form.css";

const GroupForm = ({ group, onFormSubmit }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext);
  const [loading, setLoading] = useState(false);

  const onDone = () => {
    setLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (group != null)
      data.id = group.id;
    onFormSubmit(data, onDone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {group ? "ИЗМЕНЕНИЕ ГРУППЫ" : "СОЗДАНИЕ ГРУППЫ"}
        </h1>
        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название группы
          </label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={group ? group.name : ""}
            {...register("name", {
              required: "Необходимо ввести название группы",
            })}
          />
          <label className="form-text">
            {errors.name?.message}
          </label>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? <Loader /> : group ? "ИЗМЕНИТЬ ГРУППУ" : "СОЗДАТЬ ГРУППУ"}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
