import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Roles } from "../models/Roles";
import { ApiContext } from "../contexts/ApiContext";

const CreateUser = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const selectedRole = watch("role");
  const { userApiService } = useContext(ApiContext);

  const onSubmit = (data) => {
    let user = {
      username: data.username,
      fullName: data.fullName,
      password: data.password,
    };
    if (data.role === Roles.Student) {
      user.studyGroup = data.group;
    }
    userApiService.register(user, data.role).then((response) => alert("Success"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <p className="form-name">СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ</p>
        <div className="form-input-container">
          <label htmlFor="role">Тип пользователя:</label>
          <select id="role" className="form-input" {...register("role")}>
            <option value={Roles.Admin}>Админ</option>
            <option value={Roles.Professor}>Преподаватель</option>
            <option value={Roles.Student}>Студент</option>
          </select>
        </div>

        <div className="form-input-container">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            id="username"
            className="form-input"
            type="text"
            placeholder="  Имя пользователя..."
            {...register("username", {
              required: "Необходимо ввести имя пользователя",
            })}
          />
          <p className="form-text">{errors.username?.message}</p>
        </div>
        <div className="form-input-container">
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            className="form-input"
            type="text"
            placeholder="  Пароль..."
            {...register("password", {
              required: "Необходимо ввести пароль",
            })}
          />
          <p className="form-text">{errors.password?.message}</p>
        </div>
        <div className="form-input-container">
          <label htmlFor="fullName">ФИО:</label>
          <input
            id="fullName"
            className="form-input"
            type="text"
            placeholder="  ФИО..."
            {...register("fullName", { required: "Необходимо ввести ФИО" })}
          />
          <p className="form-text">{errors.fullName?.message}</p>
        </div>

        {selectedRole === Roles.Student && (
          <div className="form-input-container">
            <label htmlFor="group">Группа:</label>
            <input
              id="group"
              className="form-input"
              type="text"
              placeholder="  Группа..."
              {...register("group", {
                required: "Необходимо ввести группу",
              })}
            />
            <p className="form-text">{errors.group?.message}</p>
          </div>
        )}

        <button className="button form-button" type="submit">
          Создать пользователя
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
