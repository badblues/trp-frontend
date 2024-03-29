import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../contexts/UiContext";
import logoImg from "../../images/logo.png";
import showImg from "../../images/show.png";
import hideImg from "../../images/hide.png";
import Loader from "../Loader";
import "../../styles/form.css";

const LoginForm = ({ onFormSubmit }) => {
  const { theme } = useContext(UiContext);
  const { register, handleSubmit, formState } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    onFormSubmit(data, () => setLoading(false));
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
          <label className="form-text">{errors.username?.message}</label>
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
          <label className="form-text">{errors.password?.message}</label>
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
