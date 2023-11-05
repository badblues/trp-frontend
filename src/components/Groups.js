import React, { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
import { UiContext } from "../contexts/UiContext";
import { ApiContext } from "../contexts/ApiContext";
import "./Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(UiContext);
  const { groupApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await groupApiService.getGroups();
      setGroups(response);
      setLoading(false);
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="groups-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="groups-container">
        <label className={`groups-caption ${darkMode ? "dark-mode" : ""}`}>
          Группы:
        </label>
        {groups.map((discipline) => (
          <div
            className={`group-item ${darkMode ? "dark-mode" : ""}`}
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

export default Groups;
