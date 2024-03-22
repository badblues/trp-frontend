import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";
import Tasks from "../../item-containers/Tasks";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";

const StudentDisciplinePage = ({ defaultDiscipline }) => {
  const { darkMode, showErrorAlert } = useContext(UiContext);
  const [teachers, setTeachers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { teacherAppointmentApiService, taskApiService } =
    useContext(ApiContext);
  const discipline = defaultDiscipline;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navigateToTask = (task) => {
    navigate(`/tasks/${task.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const teacherApointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        const tasksResponse = await taskApiService.getTasksByDiscipline(
          discipline.id
        );
        const teachers = teacherApointments.map(
          (appointment) => appointment.teacher
        );
        setTeachers(teachers);
        setTasks(tasksResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div>
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>
          {discipline.name} {discipline.year}
        </h1>
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <h2 className={`${darkMode ? "dark-mode" : ""}`}>
              {teacher.fullName}
            </h2>
          </div>
        ))}
        <h2></h2>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Доступные лабораторные работы:
        </h2>
        <Tasks tasks={tasks} onTaskSelect={navigateToTask} />
      </div>
    </div>
  );
};

export default StudentDisciplinePage;
