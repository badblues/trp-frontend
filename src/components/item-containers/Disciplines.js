import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./Disciplines.css";
import { useNavigate } from "react-router-dom";
import FakeItemsList from "../loaders/FakeItemsList";

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { disciplineApiService } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await disciplineApiService.getDisciplines();
      setDisciplines(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <FakeItemsList />
      </div>
    );
  }

  return (
    <>
      <div className="disciplines-container">
        <label className={`disciplines-caption ${darkMode ? "dark-mode" : ""}`}>
          Дисциплины:
        </label>
        {disciplines.map((discipline) => (
          <div
            className={`discipline-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => navigate(`/disciplines/${discipline.id}`)}
            key={discipline.id}
          >
            <p>
              {discipline.name} {discipline.year}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Disciplines;
