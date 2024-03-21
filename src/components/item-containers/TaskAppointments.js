import React, { useContext, useState } from "react";
import "./TaskAppointments.css";
import { UiContext } from "../../contexts/UiContext";

const TaskAppointments = ({ tasks, onTaskClick }) => {
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
  const [taskList, setTaskList] = useState(tasks);
  const { darkMode } = useContext(UiContext);

  const handleTaskChangeState = (task) => {
    const updatedTasks = [...taskList];
    updatedTasks.forEach((t) => {
      if (t.id === task.id) t.appointed = task.appointed;
    });
    setTaskList(updatedTasks);
  };

  return (
    <div className="task-appointments-container">
      {taskList.map((task) => (
        <div
          onClick={() => {
            onTaskClick(task, handleTaskChangeState);
          }}
          key={task.id}
        >
          <h4
            className={`task-appointements-item status-${task.appointed ? "appointed" : "not-appointed"} ${darkMode ? "dark-mode" : ""}`}
          >
            {task.title}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default TaskAppointments;
