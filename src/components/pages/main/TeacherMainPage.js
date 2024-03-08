import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";
import Disciplines from "../../item-containers/Disciplines";
import "./MainPage.css";
import FakeItemsList from "../../loaders/FakeItemsList";


const TeacherMainPage = () => {

  const navigate = useNavigate();
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { disciplineApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const disciplinesResponse = await disciplineApiService.getDisciplines();
      setDisciplines(disciplinesResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

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
    </div>
  );
};

export default TeacherMainPage;
