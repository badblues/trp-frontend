import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import AdminDisciplinePage from "./AdminDisciplinePage";
import TeacherDisciplinePage from "./TeacherDisciplinePage";
import StudentDisciplinePage from "./StudentDisciplinePage";
import { UiContext } from "../../../contexts/UiContext";

const DisciplinePage = () => {
  const { disciplineId } = useParams();
  const { showErrorAlert } = useContext(UiContext);
  const navigate = useNavigate();
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { disciplineApiService } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      try {
        const disciplineResponse = await disciplineApiService.getDiscipline(
          disciplineId
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
    [Roles.Admin]: AdminDisciplinePage,
    [Roles.Teacher]: TeacherDisciplinePage,
    [Roles.SeniorTeacher]: TeacherDisciplinePage,
    [Roles.Student]: StudentDisciplinePage,
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
