import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import logoImg from "../../images/logo.png";
import showImg from "../../images/show.png";
import hideImg from "../../images/hide.png";
import Loader from "../Loader.tsx";
import "../../styles/form.css";
import { AuthDTO } from "../../models/DTO/AuthDTO.ts";

interface Props {
  onFormSubmit: (authDTO: AuthDTO, onDone: () => void) => void;
}

const LoginForm: React.FC<Props> = ({ onFormSubmit }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const { register, handleSubmit, formState } = useForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errors } = formState;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    onFormSubmit(data as AuthDTO, () => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={`form-container ${theme}`}>
        <label className="form-name">АВТОРИЗАЦИЯ</label>
        <div className="form-input-container">
          <label className="form-label" htmlFor="username">
            Имя пользователя:
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="username..."
            {...register("username", {
              required: "Необходимо ввести имя пользователя",
            })}
          />
          <label className="form-text">{errors.username?.message as string}</label>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="password">
            Пароль:
          </label>
          <div className="input-with-button-container">
            <input
              className="form-input"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="password..."
              {...register("password", {
                required: "Необходимо ввести пароль",
              })}
            />
            <button
              className="button-with-image"
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <img
                className="show-password-icon"
                src={showPassword ? showImg : hideImg}
                alt="show"
                width="25px"
              />
            </button>
          </div>
          <label className="form-text">{errors.password?.message as string}</label>
        </div>
        <img src={logoImg} alt="logo" width="100px" />
        <button disabled={loading} className="submit-button">
          {loading ? <Loader /> : "ВОЙТИ"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
