import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { UserContext } from "../../../contexts/UserContext";
import { Roles } from "../../../models/Roles";
import "./DisciplinePage.css";
import Tasks from "../../item-containers/Tasks";
import { useNavigate } from "react-router-dom";

const TeacherDisciplinePage = ({ defaultDiscipline }) => {
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherAppointmentApiService, taskApiService } =
    useContext(ApiContext);
  const { user } = useContext(UserContext);
  const discipline = defaultDiscipline;
  const navigate = useNavigate();
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const teacherAppointmentsResponse =
        await teacherAppointmentApiService.getAppointments();
      const filteredAppointments = teacherAppointmentsResponse.filter(
        (a) => a.discipline.id === discipline.id,
      );
      const tasksResponse = await taskApiService.getTasksByDiscipline(
        discipline.id,
      );
      setTasks(tasksResponse);
      setAppointments(filteredAppointments);
      setLoading(false);
    };
    fetchData();
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
        <h1 className={` ${darkMode ? "dark-mode" : ""}`}>
          {discipline.name} {discipline.year}
        </h1>
        <h2
          className={` ${darkMode ? "dark-mode" : ""}`}
        >{`Полугодие: ${discipline.halfYear === "FIRST" ? "Первое" : "Второе"}`}</h2>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>
          Лабораторные работы:
        </h2>
        <Tasks
          tasks={tasks}
          onSelect={(task) => {
            navigate(`/tasks/${task.id}`);
          }}
        />
        {user.role === Roles.SeniorTeacher ? (
          <button
            className={`button button-usual ${darkMode ? "dark-mode" : ""}`}
            onClick={() => {
              navigate(`/disciplines/${discipline.id}/create-task`);
            }}
          >
            Добавить работу
          </button>
        ) : null}
      </div>
      <div>
        <h2 className={` ${darkMode ? "dark-mode" : ""}`}>
          Группы с этим предметом:
        </h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <h4
              onClick={() => {
                navigate(
                  `/disciplines/${discipline.id}/groups/${appointment.group.id}`,
                );
              }}
              className="appointments-item clickable"
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
