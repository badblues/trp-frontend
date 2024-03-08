import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import logoImg from "../images/logo.png";
import showImg from "../images/show.png";
import hideImg from "../images/hide.png";
import Loader from "./Loader";
import "./LoginPage.css";

const LoginPage = () => {
  const { darkMode, showErrorAlert } = useContext(UiContext);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onLogin = async (data) => {
    setLoading(true);
    try {
      await login(data).then(() => navigate("/"));
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="big-form" onSubmit={handleSubmit(onLogin)} noValidate>
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
            <div className="form-password-container">
              <input
                className={`password-input form-input ${darkMode ? "dark-mode" : ""}`}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="password..."
                {...register("password", {
                  required: "Необходимо ввести пароль",
                })}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="button button-with-image"
              >
                <img
                  className={`show-password-icon ${darkMode ? "dark-mode" : ""}`}
                  src={showPassword ? showImg : hideImg}
                  alt="show"
                  width="25px"
                />
              </button>
            </div>
            <label className={`form-text ${darkMode ? "dark-mode" : ""}`}>
              {errors.password?.message}
            </label>
          </div>
          <img src={logoImg} alt="logo" width="100px" />
          <button disabled={loading} className="button form-button">
            {loading ? <Loader /> : "ВОЙТИ"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
