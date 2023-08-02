import React from "react";
import { useForm } from "react-hook-form";
import { Roles } from "../models/Roles";

const CreateUser = (props) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const selectedRole = watch("role");
  const adminApiService = props.adminApiService;

  const onSubmit = (data) => {
    console.log(data);
    let user = {
      username: data.username,
      fullName: data.fullName,
      password: data.password,
    };
    if (data.role === Roles.Student) {
      user.studyGroup = data.group;
    }
    adminApiService.register(user, data.role);
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

  // const form = useForm();
  // const { register, handleSubmit, formState } = form;
  // const { errors } = formState;
  // const authService = props;

  // const onSubmit = (data) => {
  //   authService.createUser(data);
  // };

  // return (
  //   <>
  //     <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //       <div className="form-container">
  //         <p>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           placeholder="Username..."
  //           {...register("username", {
  //             required: "Необходимо ввести имя пользователя",
  //           })}
  //         />
  //         <p className="form-text">{errors.username?.message}</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           placeholder="Full name..."
  //           {...register("fullName", {
  //             required: "Необходимо ввести ФИО пользователя",
  //           })}
  //         />
  //         <p className="form-text">{errors.fullName?.message}</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           {...register("password", {
  //             required: "Необходимо ввести пароль",
  //           })}
  //           placeholder="Password..."
  //         />
  //         <p className="form-text">{errors.password?.message}</p>
  //         <button className="button form-button">СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</button>
  //         <img src="images/logo.png" alt="logo" width="100px" />
  //       </div>
  //     </form>
  //   </>
  // );
};

export default CreateUser;
