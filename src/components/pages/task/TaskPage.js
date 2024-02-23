import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import Loader from "../../Loader";
import StudentTaskPage from "./StudentTaskPage";
import TeacherTaskPage from "./TeacherTaskPage";
import "./Task.css";
import { UiContext } from '../../../contexts/UiContext';

const TaskPage = () => {
  const { showErrorAlert } = useContext(UiContext);
  const { taskId } = useParams();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const { user } = useContext(UserContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await taskApiService.getTask(taskId);
        setTask(task);
        setLoading(false);
      } catch(error) {
        showErrorAlert(error.error);
      }
    }
    fetchData();
  }, []);

  const pages = {
    [Roles.Teacher]: TeacherTaskPage,
    [Roles.SeniorTeacher]: TeacherTaskPage,
    [Roles.Student]: StudentTaskPage,
  };

  const Page = pages[user.role] || null;

  if (loading) {
    return (
      <div className='loader-container'>
        <Loader/>
      </div>
    );
  }

  return (
    <>{Page && <Page defaultTask={ task } />} </>
  );
}

export default TaskPage
