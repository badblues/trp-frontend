import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "./TestForm.css";

const TestForm = ({ test, onFormSubmit, task }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { darkMode } = useContext(UiContext);
  const [loading, setLoading] = useState(false);

  const onDone = () => {
    setLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (test != null) {
      data.id = test.id;
    }
    if (task != null) {
      data.taskId = task.id;
    }
    onFormSubmit(data, onDone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="test-form">
        <div className="test-form-input-container">
          <input
            className={`test-form-input ${darkMode ? "dark-mode" : ""}`}
            id="input"
            type="text"
            placeholder="Вход..."
            autoComplete="off"
            defaultValue={test ? test.input : ""}
            {...register("input", {
              required: "Необходимо ввести входные данные",
            })}
          />
          <label>{errors.input?.message}</label>
        </div>

        <div className="test-form-input-container">
          <input
            className={`test-form-input ${darkMode ? "dark-mode" : ""}`}
            id="output"
            type="text"
            placeholder="Выход..."
            autoComplete="off"
            defaultValue={test ? test.output : ""}
            {...register("output", {
              required: "Необходимо ввести выходные данные",
            })}
          />
          <label>{errors.output?.message}</label>
        </div>

        <button disabled={loading} className="button" type="submit">
          {loading ? <Loader /> : test ? "ИЗМЕНИТЬ" : "ДОБАВИТЬ"}
        </button>
      </div>
    </form>
  );
};

export default TestForm;
