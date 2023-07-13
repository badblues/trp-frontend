import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import RequireAuth from "./guards/RequireAuth";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthApiService from "./services/AuthApiService";
import { Roles } from "./models/Roles";

function App() {
  const authService = new AuthApiService();

  return (
    <>
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
