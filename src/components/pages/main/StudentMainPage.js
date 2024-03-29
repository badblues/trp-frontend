import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";
import Disciplines from "../../item-containers/Disciplines";
import FakeItemsList from "../../loaders/FakeItemsList";
import { UiContext } from "../../../contexts/UiContext";
import "../../../styles/main-page.css";

const StudentMainPage = () => {
  const navigate = useNavigate();
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { disciplineApiService } = useContext(ApiContext);
  const { showErrorAlert } = useContext(UiContext);

  useEffect(() => {
    (async () => {
      try {
        const disciplinesResponse = await disciplineApiService.getDisciplines();
        setDisciplines(disciplinesResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};

export default StudentMainPage;
