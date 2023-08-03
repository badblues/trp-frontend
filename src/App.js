import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor";
import { UiContextProvider } from "./contexts/UiContext";
import { ApiContextProvider } from "./contexts/ApiContext";

function App() {
  axios.interceptors.request.use(requestInterceptor);

  return (
    <>
      <UiContextProvider>
        <UserContextProvider>
          <ApiContextProvider>
            <BrowserRouter>
              <div className="page">
                <Navbar />
                <Main />
                <Footer />
              </div>
            </BrowserRouter>
          </ApiContextProvider>
        </UserContextProvider>
      </UiContextProvider>
    </>
  );
}

export default App;
