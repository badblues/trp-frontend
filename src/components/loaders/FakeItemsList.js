import React, { useContext } from 'react'
import "./FakeItemsList.css";
import { UiContext } from '../../contexts/UiContext';

function FakeItemsList() {

  const { darkMode } = useContext(UiContext);

  return (
    <div className='fake-list'>
      <div className={`fake-caption ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
      <div className={`fake-item ${darkMode ? "dark-mode" : ""}`}></div>
    </div>
  )
}

export default FakeItemsList
