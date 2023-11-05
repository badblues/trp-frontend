import React, { useContext } from "react";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth";
import { Roles } from "../models/Roles";
import { UiContext } from "../contexts/UiContext";
import "./Main.css";
import MainPage from "./pages/main-pages/MainPage";
import CreateDiscipline from "./CreateDiscipline";
import CreateGroup from "./CreateGroup";
import AppointTeacher from "./AppointTeacher";
import TeacherPage from "./pages/TeacherPage";

const Main = () => {
  const { darkMode } = useContext(UiContext);

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : ""}`}>
      <Routes>
        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Admin, Roles.Teacher, Roles.Student]}
            />
          }
        >
          <Route path="/" element={<MainPage />} exact />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Admin, Roles.Teacher, Roles.Student]}
            />
          }
        >
          <Route path="/teachers/:id" element={<TeacherPage />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="/create-user" element={<CreateUser />} exact />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route
            path="/create-discipline"
            element={<CreateDiscipline />}
            exact
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route
            path="/create-group"
            element={<CreateGroup />}
            exact
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route
            path="/assign-teacher"
            element={<AppointTeacher />}
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
