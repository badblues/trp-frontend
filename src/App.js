import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor";
import { responseErrorInterceptor } from "./interceptors/ResponseInterceptor";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { logout } = useContext(UserContext);

  //TODO probably may be better
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(
    (response) => response,
    (error) => responseErrorInterceptor(error, logout)
  );

  return (
    <div className="page">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
