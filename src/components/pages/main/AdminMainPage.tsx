import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Disciplines from "../../item-containers/Disciplines.tsx";
import Groups from "../../item-containers/Groups.tsx";
import Teachers from "../../item-containers/Teachers.tsx";
import FakeItemsList from "../../loaders/FakeItemsList.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/main-page.css";
import { Group } from "../../../models/domain/Group.ts";
import { Teacher } from "../../../models/domain/Teacher.ts";
import { Discipline } from "../../../models/domain/Discipline.ts";

const AdminMainPage = () => {
  const navigate = useNavigate();
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const { groupApiService, teacherApiService, disciplineApiService } =
    useContext(ApiContext) as ApiContextType;
  const [groups, setGroups] = useState<Group[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);

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

  const selectGroup = (group: Group) => {
    navigate(`/groups/${group.id}`);
  };

  const selectTeacher = (teacher: Teacher) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const selectDiscipline = (discipline: Discipline) => {
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
