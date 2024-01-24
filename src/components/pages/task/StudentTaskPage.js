import React, { useContext, useState, useEffect } from 'react'
import { UiContext } from '../../../contexts/UiContext';
import { ApiContext } from "../../../contexts/ApiContext";
import CodeEditor from '../../CodeEditor';
import Loader from '../../Loader';
import "./Task.css";

const StudentTaskPage = ({ task }) => {

  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const loadedCode = await taskApiService.getSolution(task.id);
      if (loadedCode != null)
        setCode(loadedCode.code);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = (solutionCode) => {
    const code = {
      code: solutionCode
    }
    taskApiService.postSolution(task.id, code);
  }

  if (loading) {
    return (
      <div className="groups-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className='task-container'>
      <div className='task-description'>
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{task.title}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Название функции: {task.functionName}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Язык: {task.language}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Задание:</h2>
        <label className={`${darkMode ? "dark-mode" : ""}`}>{task.description}</label>
      </div>
      <CodeEditor className='editor-window' solutionCode={code} onSave={handleSave}/>
    </div>
  )
}

export default StudentTaskPage