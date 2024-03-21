import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Groups.css";

const Groups = ({ groups, onGroupSelect }) => {
  const { darkMode } = useContext(UiContext);

  return (
    <>
      <div className="groups-container">
        <h2 className={`groups-caption ${darkMode ? "dark-mode" : ""}`}>
          Группы:
        </h2>
        {groups.map((group) => (
          <div
            className={`group-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => {
              onGroupSelect(group);
            }}
            key={group.id}
          >
            <p>{group.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups;
