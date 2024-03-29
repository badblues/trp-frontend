import React, { useContext, useState } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/task-appointment-list.css";

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
  const { theme } = useContext(UiContext);

  const handleTaskChangeState = (task) => {
    const updatedTasks = [...taskList];
    updatedTasks.forEach((t) => {
      if (t.id === task.id) t.appointed = task.appointed;
    });
    setTaskList(updatedTasks);
  };

  return (
    <div className={`task-appointment-list ${theme}`}>
      {taskList.map((task) => (
        <div
          onClick={() => {
            onTaskClick(task, handleTaskChangeState);
          }}
          key={task.id}
        >
          <h4
            className={`item status-${task.appointed ? "appointed" : "not-appointed"}`}
          >
            {task.title}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default TaskAppointments;
