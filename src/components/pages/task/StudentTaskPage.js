import React, { useContext, useState, useEffect } from 'react'
import { UiContext } from '../../../contexts/UiContext';
import { ApiContext } from "../../../contexts/ApiContext";
import CodeEditor from '../../CodeEditor';
import Loader from '../../Loader';
import "./Task.css";

const StudentTaskPage = ({ defaultTask }) => {

  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { taskApiService } = useContext(ApiContext);
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedCode = await taskApiService.getSolution(defaultTask.id);
        setCode(loadedCode.code);
      } catch(errorData) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = (solutionCode) => {
    const code = {
      code: solutionCode
    }
    taskApiService.postSolution(defaultTask.id, code);
  }

  if (loading) {
    return (
      <div className='loader-container'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='task-container'>
      <div className='task-description'>
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{defaultTask.title}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Название функции: {defaultTask.functionName}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Язык: {defaultTask.language}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Задание:</h2>
        <p className={`${darkMode ? "dark-mode" : ""}`}>{defaultTask.description}</p>
      </div>
      <CodeEditor className='editor-window' solutionCode={code} onSave={handleSave}/>
    </div>
  )
}

export default StudentTaskPage