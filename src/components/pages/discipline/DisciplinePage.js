import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import "./DisciplinePage.css";
import AdminDisciplinePage from "./AdminDisciplinePage";
import TeacherDisciplinePage from "./TeacherDisciplinePage";
import StudentDisciplinePage from "./StudentDisciplinePage";

const DisciplinePage = () => {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { disciplineApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const disciplienResponse = await disciplineApiService.getDiscipline(id);
      setDiscipline(disciplienResponse);
      setLoading(false);
    };
    fetchData();
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
