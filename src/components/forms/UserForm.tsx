import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Role } from "../../models/domain/Role.ts";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import dices from "../../images/dices.png";
import "../../styles/form.css";
import { User } from "../../models/domain/User";
import { Student } from "../../models/domain/Student";
import {
  StudentRegistrationDTO,
  UserRegistrationDTO,
} from "../../models/DTO/RegistrationDTO.ts";

interface Props {
  edit: boolean;
  user?: User;
  groups?: any;
  onFormSubmit: any;
}

const UserForm: React.FC<Props> = ({edit, user, groups, onFormSubmit}) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const selectedRole = watch("role");
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const onSubmit = (data: any) => {
    if (password === "") {
      showErrorAlert("Введите пароль");
      return;
    }
    data.password = password;
    const role = edit ? user?.role : selectedRole;
    let newUser: UserRegistrationDTO = data;
    if (data.role === Role.Student || user?.role === Role.Student) {
      let newUser = data as StudentRegistrationDTO;
      newUser.groupId = data.groupId;
    }
    setLoading(true);
    onFormSubmit(newUser, role, () => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {edit ? "ИЗМЕНЕНИЕ ИНФОРМАЦИИ" : "СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ"}
        </h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="role">
            Тип пользователя:
          </label>
          <select
            id="role"
            className="form-input"
            defaultValue={edit ? user?.role : Role.Admin}
            disabled={edit}
            {...register("role")}
          >
            <option value={Role.Admin}>Админ</option>
            <option value={Role.Teacher}>Преподаватель</option>
            <option value={Role.SeniorTeacher}>Лектор</option>
            <option value={Role.Student}>Студент</option>
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="username">
            Имя пользователя:
          </label>
          <input
            id="username"
            className="form-input"
            type="text"
            placeholder="Имя пользователя..."
            autoComplete="off"
            defaultValue={edit ? user?.username : ""}
            {...register("username", {
              required: "Необходимо ввести имя пользователя",
            })}
          />
          <label className="form-text">
            {errors.username?.message as string}
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
              className="form-input"
              type="text"
              placeholder="Пароль..."
              autoComplete="off"
            />
            <button
              className="button-with-image"
              title="Сгенерировать случайный пароль"
              type="button"
              onClick={randomPassword}
            >
              <img src={dices} alt="rnd" width="20" />
            </button>
          </div>
          <label className="form-text">
            {errors.password?.message as string}
          </label>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="fullName">
            ФИО:
          </label>
          <input
            id="fullName"
            className="form-input"
            type="text"
            placeholder="ФИО..."
            autoComplete="off"
            defaultValue={edit ? user?.fullName : ""}
            {...register("fullName", { required: "Необходимо ввести ФИО" })}
          />
          <label className="form-text">
            {errors.fullName?.message as string}
          </label>
        </div>

        {(selectedRole === Role.Student ||
          (edit && user?.role === Role.Student)) && (
          <div className="form-input-container">
            <label className="form-label" htmlFor="group">
              Группа:
            </label>
            <select
              id="group"
              className="form-input"
              defaultValue={edit ? (user as Student).group.id : ""}
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

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? (
            <Loader />
          ) : edit ? (
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
