import React, { useContext, useState, useEffect } from 'react'
import { UiContext } from '../../contexts/UiContext';
import { ApiContext } from "../../contexts/ApiContext";
import "./Tasks.css";
import FakeItemsList from '../loaders/FakeItemsList';

const Tasks = ({ disciplineId, onSelect }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const tasksResponse = await taskApiService.getTasksByDiscipline(disciplineId);
      setTasks(tasksResponse);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <FakeItemsList/>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <div
          onClick={() => {onSelect(task)}}
          className={`task-item ${darkMode ? "dark-mode" : ""}`}
          key={task.id}
        >
          <p>
            {task.title} - {task.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;