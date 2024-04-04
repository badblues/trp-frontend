import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../contexts/UserContext.tsx";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import "../styles/login.css";
import { AuthDTO } from "../models/DTO/AuthDTO";

const LoginPage = () => {
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const { login } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const onLogin = async (authDTO: AuthDTO, onDone: () => void) => {
    try {
      await login(authDTO).then(() => {
        navigate("/");
      });
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  return (
    <div className="login-page">
      <LoginForm onFormSubmit={onLogin} />
    </div>
  );
};

export default LoginPage;
