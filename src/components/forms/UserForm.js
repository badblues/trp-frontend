import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Roles } from "../../models/Roles";
import { ApiContext } from "../../contexts/ApiContext";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import dices from "../../images/dices.png";
import "./Form.css";

const UserForm = ({ user, onFormSubmit }) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const selectedRole = watch("role");
  const { groupApiService } = useContext(ApiContext);
  const { darkMode, showErrorAlert } = useContext(UiContext);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await groupApiService.getGroups();
      setGroups(groups);
      setGroupsLoading(false);
    };
    fetchData();
  }, [groupApiService]);

  const onDone = () => {
    setLoading(false);
  };

  const randomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    setPassword(password);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (data) => {
    if (password === "") {
      showErrorAlert("Введите пароль");
      return;
    }
    const newUser = {
      fullName: data.fullName,
      password: password,
      username: data.username,
    };
    if (data.role === Roles.Student) {
      newUser.groupId = data.groupId;
    } else if (user && user.role === Roles.Student) {
      newUser.groupId = data.groupId;
    }
    const role = user ? user.role : selectedRole;
    setLoading(true);
    console.log(newUser);
    onFormSubmit(newUser, role, onDone);
  };

  if (groupsLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <form className="big-form" onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <h1 className="form-name">
          {user ? "ИЗМЕНЕНИЕ ИНФОРМАЦИИ" : "СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ"}
        </h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="role">
            Тип пользователя:
          </label>
          <select
            id="role"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            defaultValue={user ? user.role : Roles.Admin}
            disabled={user}
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
            defaultValue={user ? user.username : ""}
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
          <div className="input-with-button-container">
            <input
              value={password}
              onInput={onPasswordChange}
              id="password"
              className={`form-input ${darkMode ? "dark-mode" : ""}`}
              type="text"
              placeholder="Пароль..."
              autoComplete="off"
              defaultValue={user ? user.password : ""}
            />
            <button
              className="button button-with-image"
              title="Сгенерировать случайный пароль"
              type="button"
              onClick={randomPassword}
            >
              <img src={dices} alt="rnd" width="20" />
            </button>
          </div>
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
            defaultValue={user ? user.fullName : ""}
            {...register("fullName", { required: "Необходимо ввести ФИО" })}
          />
          <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
            {errors.fullName?.message}
          </label>
        </div>

        {(selectedRole === Roles.Student ||
          (user && user.role === Roles.Student)) && (
          <div className="form-input-container">
            <label className="form-label" htmlFor="group">
              Группа:
            </label>
            <select
              id="group"
              className={`form-input ${darkMode ? "dark-mode" : ""}`}
              defaultValue={user ? user.group.id : ""}
              {...register("groupId")}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? (
            <Loader />
          ) : user ? (
            "ИЗМЕНИТЬ ИНФОРМАЦИЮ"
          ) : (
            "СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
