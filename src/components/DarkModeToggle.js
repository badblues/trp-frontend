import React, { useContext } from 'react'
import { UiContext } from '../contexts/UiContext';

const DarkModeToggle = () => {

  const { darkMode, setDarkMode } = useContext(UiContext);

  const onSetDarkMode = (event) => {
    setDarkMode(event.target.checked);
  }

  return (
    <input type="checkbox" checked={darkMode} onChange={onSetDarkMode}></input>
  )
}

export default DarkModeToggle