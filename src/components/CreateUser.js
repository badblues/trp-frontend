import React from "react";
import { useForm } from "react-hook-form";

const CreateUser = (props) => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const authService = props;

  const onSubmit = (data) => {
    authService.createUser(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-container">
          <p>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</p>
          <input
            className="form-input"
            type="text"
            placeholder="Username..."
            {...register("username", {
              required: "Необходимо ввести имя пользователя",
            })}
          />
          <p className="form-text">{errors.username?.message}</p>
          <input
            className="form-input"
            type="text"
            placeholder="Full name..."
            {...register("fullName", {
              required: "Необходимо ввести ФИО пользователя",
            })}
          />
          <p className="form-text">{errors.fullName?.message}</p>
          <input
            className="form-input"
            type="text"
            {...register("password", {
              required: "Необходимо ввести пароль",
            })}
            placeholder="Password..."
          />
          <p className="form-text">{errors.password?.message}</p>
          <button className="button form-button">СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</button>
          <img src="images/logo.png" alt="logo" width="100px" />
        </div>
      </form>
    </>
  );
};

export default CreateUser;
