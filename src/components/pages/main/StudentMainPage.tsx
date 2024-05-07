import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Disciplines from "../../item-containers/Disciplines.tsx";
import FakeItemsList from "../../loaders/FakeItemsList.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/main-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";

const StudentMainPage = () => {
  const navigate = useNavigate();
  const { disciplineApiService } = useContext(ApiContext) as ApiContextType;
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplinesResponse = await disciplineApiService.getDisciplines();
        setDisciplines(disciplinesResponse);
        setLoading(false);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};

export default StudentMainPage;
