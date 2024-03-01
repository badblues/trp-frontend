import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./Groups.css";
import { useNavigate } from "react-router-dom";
import FakeItemsList from "../loaders/FakeItemsList";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { groupApiService } = useContext(ApiContext);
  const navigate = useNavigate();

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
      <div>
        <FakeItemsList />
      </div>
    );
  }

  return (
    <>
      <div className="groups-container">
        <h2 className={`groups-caption ${darkMode ? "dark-mode" : ""}`}>
          Группы:
        </h2>
        {groups.map((group) => (
          <div
            className={`group-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => navigate(`/groups/${group.id}`)}
            key={group.id}
          >
            <p>
              {group.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups;
