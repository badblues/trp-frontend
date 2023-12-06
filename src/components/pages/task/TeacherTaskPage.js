import React, { useContext } from 'react'
import { UiContext } from '../../../contexts/UiContext';

const TeacherTaskPage = ({ task }) => {

  const { darkMode } = useContext(UiContext);

  return (
    <div>
      <p className={`${darkMode ? "dark-mode" : ""}`}>teacher</p>
      <p className={`${darkMode ? "dark-mode" : ""}`}>{task.title}</p>
      <p className={`${darkMode ? "dark-mode" : ""}`}>{task.description}</p>
    </div>
  )
}

export default TeacherTaskPage