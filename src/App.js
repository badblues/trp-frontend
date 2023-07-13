import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RequireAuth from "./Guards/RequireAuth";
import CreateUser from "./components/CreateUser";
import { UserContextProvider } from "./Contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthService from "./services/AuthService";

function App() {
  const authService = new AuthService();

  return (
    <>
      <UserContextProvider authService={authService}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              element={
                <RequireAuth
                  allowedRoles={["ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"]}
                />
              }
            >
              <Route path="/" element={<Main />} exact />
            </Route>
            <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
              <Route
                path="/create-user"
                element={<CreateUser authService={authService} />}
                exact
              />
            </Route>
            <Route element={<RequireAuth allowedRoles={[""]} />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
