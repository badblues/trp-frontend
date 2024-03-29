import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import Loader from "../../Loader";
import StudentTaskPage from "./StudentTaskPage";
import TeacherTaskPage from "./TeacherTaskPage";
import { UiContext } from "../../../contexts/UiContext";
import "../../../styles/task-page.css";

const TaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { showErrorAlert } = useContext(UiContext);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const { user } = useContext(UserContext);
  const { taskApiService } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      try {
        const task = await taskApiService.getTask(taskId);
        setTask(task);
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = {
    [Roles.Teacher]: TeacherTaskPage,
    [Roles.SeniorTeacher]: TeacherTaskPage,
    [Roles.Student]: StudentTaskPage,
  };

  const Page = pages[user.role] || null;

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return <>{Page && <Page defaultTask={task} />} </>;
};

export default TaskPage;
