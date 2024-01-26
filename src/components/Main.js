import React, { useContext } from "react";
import LoginPage from "./LoginPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth";
import { Roles } from "../models/Roles";
import { UiContext } from "../contexts/UiContext";
import "./Main.css";
import MainPage from "./pages/main/MainPage";
import TeacherPage from "./pages/teacher/TeacherPage";
import DisciplinePage from "./pages/discipline/DisciplinePage";
import TaskPage from "./pages/task/TaskPage";
import AdminGroupPage from "./pages/group/AdminGroupPage";
import TeacherDisciplineGroupPage from "./pages/discipline-group/TeacherDisciplineGroupPage";
import CreateGroupPage from "./pages/create/CreateGroupPage";
import CreateDisciplinePage from "./pages/create/CreateDisciplinePage";
import CreateUserPage from "./pages/create/CreateUserPage";
import CreateTeacherAppointment from "./pages/create/CreateTeacherAppointment";
import CreateTaskPage from "./pages/create/CreateTaskPage";

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
          <Route path="/create-user" element={<CreateUserPage />} exact />
        </Route>
        
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route
            path="/create-discipline"
            element={<CreateDisciplinePage />}
            exact
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="/create-group" element={<CreateGroupPage />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="/assign-teacher" element={<CreateTeacherAppointment />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.Teacher]} />}>
          <Route path="/disciplines/:disciplineId/create-task" element={<CreateTaskPage />} exact />
        </Route>

        <Route element={<RequireAuth allowedRoles={[""]} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
