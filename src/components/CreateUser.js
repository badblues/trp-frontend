import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Roles } from "../models/Roles";
import { ApiContext } from "../contexts/ApiContext";
import { UiContext } from "../contexts/UiContext";
import Loader from "./Loader";

const CreateUser = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const selectedRole = watch("role");
  const { groupApiService, userApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await groupApiService.getGroups();
      setGroups(groups);
      setGroupsLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    let user = {
      username: data.username,
      fullName: data.fullName,
      password: data.password,
    };
    if (data.role === Roles.Student) {
      user.groupId = data.groupId;
    }
    setLoading(true);
    try {
      await userApiService
        .register(user, data.role)
        .then((response) => alert(`Success, ${response.username} created`));
    } catch (error) {
      alert(error.error);
    } finally {
      setLoading(false);
    }
  };

  if (groupsLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <p className="form-name">СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ</p>
        <div className="form-input-container">
          <label className="form-label" htmlFor="role">
            Тип пользователя:
          </label>
          <select
            id="role"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            {...register("role")}
          >
            <option value={Roles.Admin}>Админ</option>
            <option value={Roles.Teacher}>Преподаватель</option>
            <option value={Roles.Student}>Студент</option>
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="username">
            Имя пользователя:
          </label>
          <input
            id="username"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Имя пользователя..."
            autoComplete="off"
            {...register("username", {
              required: "Необходимо ввести имя пользователя",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.username?.message}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="password">
            Пароль:
          </label>
          <input
            id="password"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="Пароль..."
            autoComplete="off"
            {...register("password", {
              required: "Необходимо ввести пароль",
            })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.password?.message}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="fullName">
            ФИО:
          </label>
          <input
            id="fullName"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            type="text"
            placeholder="ФИО..."
            autoComplete="off"
            {...register("fullName", { required: "Необходимо ввести ФИО" })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.fullName?.message}
          </label>
        </div>

        {selectedRole === Roles.Student && (
          <div className="form-input-container">
            <label className="form-label" htmlFor="group">
              Группа:
            </label>
            <select
              id="group"
              className={`form-input ${darkMode ? "dark-mode" : ""}`}
              {...register("groupId")}
            >
              {groups.map((group) => (
                <option
                  key={group.id}
                  value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        )}



        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader/> : "Создать пользователя"}
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
