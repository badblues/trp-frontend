import React, { useContext } from "react";
import LoginPage from "./LoginPage.tsx";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth.tsx";
import { Role } from "../models/domain/Role.ts";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import "../styles/main.css";
import MainPage from "./pages/main/MainPage.tsx";
import TeacherPage from "./pages/teacher/TeacherPage.tsx";
import DisciplinePage from "./pages/discipline/DisciplinePage.tsx";
import LabWorkVariantPage from "./pages/lab-work-variant/LabWorkVariantPage.tsx";
import AdminGroupPage from "./pages/group/AdminGroupPage.tsx";
import TeacherDisciplineGroupPage from "./pages/discipline-group/TeacherDisciplineGroupPage.tsx";
import CreateGroupPage from "./pages/create/CreateGroupPage.tsx";
import CreateDisciplinePage from "./pages/create/CreateDisciplinePage.tsx";
import CreateUserPage from "./pages/create/CreateUserPage.tsx";
import CreateTeacherAppointment from "./pages/create/CreateTeacherAppointment.tsx";
import NotFoundPage from "./pages/errors/NotFoundPage.tsx";
import CreateLabWorkPage from "./pages/create/CreateLabWorkPage.tsx";
import CreateLabWorkVariantPage from "./pages/create/CreateLabWorkVariantPage.tsx";
import ReviewPage from "./pages/review-page/ReviewPage.tsx";

const Main = () => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`main-container ${theme}`}>
      <Routes>
        <Route
          element={
            <RequireAuth
              allowedRoles={[
                Role.Admin,
                Role.Teacher,
                Role.SeniorTeacher,
                Role.Student,
              ]}
            />
          }
        >
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route path="/teachers/:teacherId" element={<TeacherPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route path="/groups/:groupId" element={<AdminGroupPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                Role.Admin,
                Role.Teacher,
                Role.SeniorTeacher,
                Role.Student,
              ]}
            />
          }
        >
          <Route
            path="/disciplines/:disciplineId"
            element={<DisciplinePage />}
          />
        </Route>

        <Route
          element={
            <RequireAuth allowedRoles={[Role.Teacher, Role.SeniorTeacher]} />
          }
        >
          <Route
            path="/disciplines/:disciplineId/groups/:groupId"
            element={<TeacherDisciplineGroupPage />}
          />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Role.Teacher, Role.SeniorTeacher, Role.Student]}
            />
          }
        >
          <Route
            path="/lab-work-variants/:labWorkVariantId"
            element={<LabWorkVariantPage />}
          />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[Role.Teacher, Role.SeniorTeacher, Role.Student]}
            />
          }
        >
          <Route path="/review" element={<ReviewPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route path="/create-user" element={<CreateUserPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route path="/create-discipline" element={<CreateDisciplinePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route path="/create-group" element={<CreateGroupPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
          <Route
            path="/assign-teacher"
            element={<CreateTeacherAppointment />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.SeniorTeacher]} />}>
          <Route
            path="/disciplines/:disciplineId/create-lab-work"
            element={<CreateLabWorkPage />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.SeniorTeacher]} />}>
          <Route
            path="/lab-works/:labWorkId/create-lab-work-variant"
            element={<CreateLabWorkVariantPage />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[]} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                Role.Admin,
                Role.Teacher,
                Role.SeniorTeacher,
                Role.Student,
              ]}
            />
          }
        >
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
