import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";
import Tasks from "../../Tasks";
import { useNavigate } from "react-router-dom";


const TeacherDisciplinePage = ({ discipline }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { appointmentApiService,
          groupApiService } = useContext(ApiContext);
  const navigate = useNavigate();
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allGroups = await groupApiService.getGroups();
      const filteredAppointments = appointmentsResponse.filter(a => a.disciplineId == discipline.id);
      setAppointments(filteredAppointments);
      filteredAppointments.forEach(a => {
        a.group = allGroups.find(g => g.id === a.groupId);
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="disciplines-container">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h1 className={`${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year} {discipline.halfYear}</h1>
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Группы с этим предметом:</h2>
      {appointments.map((appointment) => (
        <div
          className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
          key={appointment.id}
        >
          <div className="appointments-item">
            <p>
              {appointment.group.name}
            </p>
          </div>
        </div>
      ))}
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Лабораторные работы:</h2>
      <Tasks disciplineId={discipline.id}/>
      <button className={`button button-usual ${darkMode ? "dark-mode" : ""}`} onClick={() => {navigate(`/disciplines/${discipline.id}/create-task`)}}>Добавить работу</button>
    </div>
  );
}

export default TeacherDisciplinePage;