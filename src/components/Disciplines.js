import React, { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
import { UiContext } from "../contexts/UiContext";
import { ApiContext } from "../contexts/ApiContext";
import "./Disciplines.css";

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(UiContext);
  const { disciplineApiService } = useContext(ApiContext);

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
      <div className="disciplines-container">
        <Loader />
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
            key={discipline.id}
          >
            <p>
              {discipline.name} {discipline.year} {discipline.halfYear}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Disciplines;
