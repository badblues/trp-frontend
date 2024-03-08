<<<<<<< HEAD
import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./Tasks.css";
import FakeItemsList from "../loaders/FakeItemsList";

const Tasks = ({ disciplineId, onSelect }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const tasksResponse =
        await taskApiService.getTasksByDiscipline(disciplineId);
      tasksResponse.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
          return -1; // a should come before b
        }
        if (nameA > nameB) {
          return 1; // b should come before a
        }
        return 0; // names are equal
      });
      setTasks(tasksResponse);
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
=======
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
>>>>>>> fix_make_containers_dumb

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
