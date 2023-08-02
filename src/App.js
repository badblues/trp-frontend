import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import AuthApiService from "./services/AuthApiService";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor";
import { UiContextProvider } from "./contexts/UiContext";

function App() {
  const authService = new AuthApiService();
  axios.interceptors.request.use(requestInterceptor);

  return (
    <>
      <UiContextProvider>
        <UserContextProvider authService={authService}>
          <BrowserRouter>
            <div className="page">
              <Navbar />
              <Main/>
              <Footer />
            </div>
          </BrowserRouter>
        </UserContextProvider>
      </UiContextProvider>
    </>
  );
}

export default App;
