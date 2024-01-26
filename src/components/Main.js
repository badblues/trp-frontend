import React, { useContext } from "react";
import LoginPage from "./LoginPage";
import CreateUser from "./forms/CreateUser";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth";
import { Roles } from "../models/Roles";
import { UiContext } from "../contexts/UiContext";
import "./Main.css";
import MainPage from "./pages/main/MainPage";
import CreateDiscipline from "./forms/CreateDiscipline";
import CreateGroup from "./forms/CreateGroup";
import CreateTask from "./forms/CreateTask";
import AppointTeacher from "./forms/AppointTeacher";
import TeacherPage from "./pages/teacher/TeacherPage";
import DisciplinePage from "./pages/discipline/DisciplinePage";
import TaskPage from "./pages/task/TaskPage";
import AdminGroupPage from "./pages/group/AdminGroupPage";
import TeacherDisciplineGroupPage from "./pages/discipline-group/TeacherDisciplineGroupPage";

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
              allowedRoles={[Roles.Admin]}
            />
          }
        >
          <Route path="/teachers/:id" element={<TeacherPage />} exact />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Admin]}
            />
          }
        >
          <Route path="/groups/:groupId" element={<AdminGroupPage />} exact />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Admin, Roles.Teacher, Roles.Student]}
            />
          }
        >
          <Route path="/disciplines/:id" element={<DisciplinePage />} exact />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Teacher]}
            />
          }
        >
          <Route path="/disciplines/:disciplineId/groups/:groupId" element={<TeacherDisciplineGroupPage/>} exact />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Roles.Teacher, Roles.Student]}
            />
          }
        >
          <Route path="/tasks/:taskId" element={<TaskPage />} exact />
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
          <Route path="/create-group" element={<CreateGroup />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="/assign-teacher" element={<AppointTeacher />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Teacher]} />}>
          <Route path="/disciplines/:disciplineId/create-task" element={<CreateTask />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[""]} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
