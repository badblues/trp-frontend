import React, { useContext } from "react";
import "../src/styles/app.css";
import Main from "./components/Main.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor.tsx";
import { responseErrorInterceptor } from "./interceptors/ResponseInterceptor.tsx";
import { UserContext, UserContextType } from "./contexts/UserContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext) as UserContextType;

  //TODO may be better
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(
    (response) => response,
    (error) => responseErrorInterceptor(error, logout, navigate)
  );

  return (
    <div className="page">
      <Navbar />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
