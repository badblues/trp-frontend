import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { darkMode } = useContext(UiContext);
  const { errors } = formState;
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data).then(() => navigate("/"));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
          <label className="form-name">АВТОРИЗАЦИЯ</label>
          <div className="form-input-container">
            <label className="form-label" htmlFor="username">
              Имя пользователя:
            </label>
            <input
              className={`form-input ${darkMode ? "dark-mode" : ""}`}
              type="text"
              placeholder="username..."
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
              className={`form-input ${darkMode ? "dark-mode" : ""}`}
              type="password"
              placeholder="password..."
              {...register("password", {
                required: "Необходимо ввести пароль",
              })}
            />
            <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
              {errors.password?.message}
            </label>
          </div>
          <img src="/images/logo.png" alt="logo" width="100px"></img>
          <button className="button form-button">ВОЙТИ</button>
        </div>
      </form>
    </>
  );
};

export default Login;
