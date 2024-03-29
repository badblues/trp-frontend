import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import Tasks from "../../item-containers/Tasks";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import "../../../styles/discipline-page.css";

const StudentDisciplinePage = ({ defaultDiscipline }) => {
  const { theme, showErrorAlert } = useContext(UiContext);
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
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`discipline-page ${theme}`}>
      <div>
        <h1>
          {discipline.name} {discipline.year}
        </h1>
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <h2>{teacher.fullName}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2>Доступные лабораторные работы:</h2>
        <Tasks tasks={tasks} onTaskSelect={navigateToTask} />
      </div>
    </div>
  );
};

export default StudentDisciplinePage;
