import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data).then(() => navigate("/"));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-container">
          <p className="form-name">АВТОРИЗАЦИЯ</p>
          <div className="form-input-container">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              className="form-input"
              type="text"
              placeholder="  username..."
              {...register("username", {
                required: "Необходимо ввести имя пользователя",
              })}
            />
            <p className="form-text">{errors.username?.message}</p>
          </div>
          <div className="form-input-container">
            <label htmlFor="password">Пароль:</label>
            <input
              className="form-input"
              type="password"
              placeholder="  password..."
              {...register("password", {
                required: "Необходимо ввести пароль",
              })}
            />
            <p className="form-text">{errors.password?.message}</p>
          </div>
          <img src="/images/logo.png" alt="logo" width="100px"></img>
          <button className="button form-button">ВОЙТИ</button>
        </div>
      </form>
    </>
  );
};

export default Login;
