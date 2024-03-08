import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "./Tasks.css";

const Tasks = ({ tasks, onSelect }) => {
  const { darkMode } = useContext(UiContext);
  tasks.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <div
          onClick={() => {
            onSelect(task);
          }}
          className={`task-item ${darkMode ? "dark-mode" : ""}`}
          key={task.id}
        >
          <p>{task.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
