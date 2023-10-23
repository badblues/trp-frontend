import React, { useContext, useState, useEffect } from 'react'
import Loader from "./Loader";
import { UiContext } from '../contexts/UiContext';
import { ApiContext } from "../contexts/ApiContext";
import "./Tasks.css";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await taskApiService.getTasks();
      setTasks(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="tasks-container">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <div
          className={`task-item ${darkMode ? "dark-mode" : ""}`}
          key={task.id}
        >
          <p>
            {task.title} {task.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;