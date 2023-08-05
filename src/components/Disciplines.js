import React, { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
import { UiContext } from "../contexts/UiContext";
import { UserContext } from "../contexts/UserContext";
import { ApiContext } from "../contexts/ApiContext";
import "./Disciplines.css";

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(UiContext);
  const { user } = useContext(UserContext);
  const { disciplinesApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await disciplinesApiService.getDisciplines(user.role);
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
