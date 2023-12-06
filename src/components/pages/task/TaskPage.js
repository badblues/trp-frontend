import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import Loader from "../../Loader";
import StudentTaskPage from "./StudentTaskPage";
import TeacherTaskPage from "./TeacherTaskPage";
import "./Task.css";

const TaskPage = () => {

  const { taskId } = useParams();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const { user } = useContext(UserContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const task = await taskApiService.getTask(taskId);
      setTask(task);
      setLoading(false);
    }
    fetchData();
  }, []);

  const pages = {
    [Roles.Teacher]: TeacherTaskPage,
    [Roles.Student]: StudentTaskPage,
  };

  const Page = pages[user.role] || null;

  if (loading) {
    return (
      <div>
        <Loader/>
      </div>
    );
  }

  return (
    <>{Page && <Page task={ task } />} </>
  );
}

export default TaskPage
