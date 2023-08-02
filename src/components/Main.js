import React, { useContext } from "react";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth";
import { Roles } from "../models/Roles";
import { UiContext } from "../contexts/UiContext";
import AdminApiService from "../services/AdminApiService";
import "./Main.css";

const Main = () => {
  const adminApiService = new AdminApiService();
  const { darkMode } = useContext(UiContext);

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : ""}`}>
      <Routes>
        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Admin, Roles.Professor, Roles.Student]}
            />}>
          {/* <Route path="/" element={<Main />} exact /> */}
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
    </div>
  );
};

export default Main;
