import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { UiContext } from "../contexts/UiContext";
import "../styles/login.css";
import LoginForm from "./forms/LoginForm";

const LoginPage = () => {
  const { showErrorAlert } = useContext(UiContext);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogin = async (data, onDone) => {
    try {
      await login(data).then(() => {
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
