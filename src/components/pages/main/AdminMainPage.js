import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";
import Disciplines from "../../item-containers/Disciplines";
import Groups from "../../item-containers/Groups";
import Teachers from "../../item-containers/Teachers";
import "./MainPage.css";
import FakeItemsList from "../../loaders/FakeItemsList";
import { UiContext } from "../../../contexts/UiContext";

const AdminMainPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showErrorAlert } = useContext(UiContext);
  const { groupApiService, teacherApiService, disciplineApiService } =
    useContext(ApiContext);

  useEffect(() => {
    (async () => {
      try {
        const groupsResponse = await groupApiService.getGroups();
        const teachersResponse = await teacherApiService.getTeachers();
        const disciplinesResponse = await disciplineApiService.getDisciplines();
        setGroups(groupsResponse);
        setTeachers(teachersResponse);
        setDisciplines(disciplinesResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGroup = (group) => {
    navigate(`/groups/${group.id}`);
  };

  const selectTeacher = (teacher) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const selectDiscipline = (discipline) => {
    navigate(`/disciplines/${discipline.id}`);
  };

  return (
    <div className="main-page-container">
      <div className="main-page-item">
        {loading ? (
          <FakeItemsList />
        ) : (
          <Disciplines
            disciplines={disciplines}
            onDisciplineSelect={selectDiscipline}
          />
        )}
      </div>
      <div className="main-page-item">
        {loading ? (
          <FakeItemsList />
        ) : (
          <Teachers teachers={teachers} onTeacherSelect={selectTeacher} />
        )}
      </div>
      <div className="main-page-item">
        {loading ? (
          <FakeItemsList />
        ) : (
          <Groups groups={groups} onGroupSelect={selectGroup} />
        )}
      </div>
    </div>
  );
};

export default AdminMainPage;
