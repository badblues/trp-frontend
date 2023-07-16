import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import RequireAuth from "./guards/RequireAuth";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthApiService from "./services/AuthApiService";
import AdminApiService from "./services/AdminApiService";
import { Roles } from "./models/Roles";
import axios from "axios";
import requestInterceptor from "./interceptors/RequestInterceptor";
import { UiContextProvider } from "./contexts/UiContext";

function App() {
  const authService = new AuthApiService();
  const adminApiService = new AdminApiService();
  axios.interceptors.request.use(requestInterceptor);

  return (
    <>
      <UiContextProvider>
        <UserContextProvider authService={authService}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[Roles.Admin, Roles.Professor, Roles.Student]}
                  />
                }
              >
                <Route path="/" element={<Main />} exact />
              </Route>
              <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
                <Route
                  path="/create-user"
                  element={<CreateUser adminApiService={adminApiService} />}
                  exact
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[""]} />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </UiContextProvider>
    </>
  );
}

export default App;
