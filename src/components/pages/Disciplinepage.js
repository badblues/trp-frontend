import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { useParams } from 'react-router-dom';
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./DisciplinePage.css";
import Tasks from "../Tasks"


const DisciplinePage = () => {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherApiService,
          appointmentApiService,
          groupApiService,
          disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const disciplienResponse = await disciplineApiService.getDiscipline(id);
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allTeachers = await teacherApiService.getTeachers();
      const allGroups = await groupApiService.getGroups();
      setDiscipline(disciplienResponse);
      const filteredAppointments = appointmentsResponse.filter(a => a.disciplineId == id);
      setAppointments(filteredAppointments);
      filteredAppointments.forEach(a => {
        a.teacher = allTeachers.find(t => t.id === a.teacherId);
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
      <h1 className={`${darkMode ? "dark-mode" : ""}`}> id = {id} {discipline.name} {discipline.year} {discipline.halfYear}</h1>
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Группы:</h2>
      {appointments.map((appointment) => (
        <div
          className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
          key={appointment.id}
        >
          <div className="appointments-item">
            <p>
              {appointment.group.name} --- {appointment.teacher.fullName}
            </p>
          </div>
        </div>
      ))}
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Лабораторные работы:</h2>
      <Tasks disciplineId={id}/>
    </div>
  );
}

export default DisciplinePage;