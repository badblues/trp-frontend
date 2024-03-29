import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { UserContext } from "../../../contexts/UserContext";
import { Roles } from "../../../models/Roles";
import Tasks from "../../item-containers/Tasks";
import { useNavigate } from "react-router-dom";
import "../../../styles/discipline-page.css";

const TeacherDisciplinePage = ({ defaultDiscipline }) => {
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherAppointmentApiService, taskApiService } =
    useContext(ApiContext);
  const { user } = useContext(UserContext);
  const discipline = defaultDiscipline;
  const navigate = useNavigate();
  const { theme, showErrorAlert } = useContext(UiContext);

  useEffect(() => {
    (async () => {
      try {
        const teacherAppointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        const tasksResponse = await taskApiService.getTasksByDiscipline(
          discipline.id
        );
        setAppointments(teacherAppointments);
        setTasks(tasksResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToTask = (task) => {
    navigate(`/tasks/${task.id}`);
  };

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
        <h2>{`Полугодие: ${
          discipline.halfYear === "FIRST" ? "Первое" : "Второе"
        }`}</h2>
        <h2>Лабораторные работы:</h2>
        <Tasks tasks={tasks} onTaskSelect={navigateToTask} />
        {user.role === Roles.SeniorTeacher ? (
          <button
            className="add-lab-button"
            onClick={() => {
              navigate(`/disciplines/${discipline.id}/create-task`);
            }}
          >
            Добавить работу
          </button>
        ) : null}
      </div>
      <div>
        <h2>Группы с этим предметом:</h2>
        {appointments.map((appointment) => (
          <div className="appointment-link" key={appointment.id}>
            <h4
              onClick={() => {
                navigate(
                  `/disciplines/${discipline.id}/groups/${appointment.group.id}`
                );
              }}
            >
              {appointment.group.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDisciplinePage;
