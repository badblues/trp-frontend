import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import { Role } from "../../../models/domain/Role.ts";
import AdminDisciplinePage from "./AdminDisciplinePage.tsx";
import TeacherDisciplinePage from "./TeacherDisciplinePage.tsx";
import StudentDisciplinePage from "./StudentDisciplinePage.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { Discipline } from "../../../models/domain/Discipline.ts";

const DisciplinePage = () => {
  const { disciplineId } = useParams();
  const navigate = useNavigate();
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const { disciplineApiService } = useContext(ApiContext) as ApiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [discipline, setDiscipline] = useState<Discipline>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplineResponse = await disciplineApiService.getDiscipline(
          Number(disciplineId)
        );
        setDiscipline(disciplineResponse);
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = {
    [Role.Admin]: AdminDisciplinePage,
    [Role.Teacher]: TeacherDisciplinePage,
    [Role.SeniorTeacher]: TeacherDisciplinePage,
    [Role.Student]: StudentDisciplinePage,
  };

  const Page = pages[user.role] || null;

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return <>{Page && <Page defaultDiscipline={discipline} />} </>;
};

export default DisciplinePage;
