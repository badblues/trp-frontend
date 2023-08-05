import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";


function App() {
  const { logout } = useContext(UserContext);

  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response.status === 403) {
        logout();
        return;
      }
      throw error;
    }
  );

  return (
    <div className="page">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
