import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiContext } from "../contexts/ApiContext";
import { UiContext } from "../contexts/UiContext";
import Loader from "./Loader";

const CreateGroup = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { groupApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let group = {
      name: data.name,
    };
    setLoading(true);
    try {
      await groupApiService
        .createGroup(group)
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
        <p className="form-name">СОЗДАНИЕ ГРУППЫ</p>

        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название группы
          </label>
          <input
            id="name"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Название..."
            autoComplete="off"
            {...register("name", {
              required: "Необходимо ввести название группы",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.name?.message}
          </label>
        </div>

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader /> : "Создать группу"}
        </button>
      </div>
    </form>
  );
};

export default CreateGroup;
