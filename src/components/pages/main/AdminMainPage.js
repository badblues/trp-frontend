import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";
import Disciplines from "../../item-containers/Disciplines";
import Groups from "../../item-containers/Groups";
import Teachers from "../../item-containers/Teachers";
import "./MainPage.css";
import FakeItemsList from "../../loaders/FakeItemsList";

const AdminMainPage = () => {

  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { groupApiService,
          teacherApiService,
          disciplineApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const groupsResponse = await groupApiService.getGroups();
      const teachersResponse = await teacherApiService.getTeachers();
      const disciplinesResponse = await disciplineApiService.getDisciplines();
      setGroups(groupsResponse);
      setTeachers(teachersResponse);
      setDisciplines(disciplinesResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const selectGroup = (groupId) => {
    navigate(`/groups/${groupId}`)
  }

  const selectTeacher = (teacherId) => {
    navigate(`/teachers/${teacherId}`)
  }

  const selectDiscipline = (disciplineId) => {
    navigate(`/disciplines/${disciplineId}`);
  }

  return (
    <div className="main-page-container">
      <div className="main-page-item">
        {loading ?
          <FakeItemsList/> :
          <Disciplines
            disciplines={disciplines}
            onDisciplineSelect={selectDiscipline}/>}
      </div>
      <div className="main-page-item">
        {loading ?
          <FakeItemsList/> :
          <Teachers
            teachers={teachers}
            onTeacherSelect={selectTeacher}/>}
      </div>
      <div className="main-page-item">
        {loading ?
          <FakeItemsList/> :
          <Groups
            groups={groups}
            onGroupSelect={selectGroup}/>}
      </div>
    </div>
  );
};

export default AdminMainPage;
