import React, { useContext } from 'react'
import { UiContext } from '../../../contexts/UiContext';
import "./Task.css";

const TeacherTaskPage = ({ task }) => {

  const { darkMode } = useContext(UiContext);

  return (
    <div className='task-container'>
      <div className='task-desctiption'>
      <h1 className={`${darkMode ? "dark-mode" : ""}`}>{task.title}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Название функции: {task.functionName}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Язык: {task.language}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Задание:</h2>
        <label className={`${darkMode ? "dark-mode" : ""}`}>{task.description}</label>
      </div>
    </div>
  )
}

export default TeacherTaskPage