import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { useParams } from 'react-router-dom';
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./TeacherPage.css";


const TeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherApiService,
          appointmentApiService,
          groupApiService,
          disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const teacherResponse = await teacherApiService.getTeacher(id);
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allDisciplines = await disciplineApiService.getDisciplines();
      const allGroups = await groupApiService.getGroups();
      setTeacher(teacherResponse);
      const filteredAppointments = appointmentsResponse.filter(a => a.teacherId == id);
      setAppointments(filteredAppointments);
      filteredAppointments.forEach(a => {
        a.discipline = allDisciplines.find(d => d.id === a.disciplineId);
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
      <h1 className={`${darkMode ? "dark-mode" : ""}`}>ФИО: {teacher.fullName}</h1>
      <h2 className={`${darkMode ? "dark-mode" : ""}`}>Текущие дисциплины:</h2>
      {appointments.map((appointment) => (
        <div
          className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
          key={appointment.id}
        >
          <p>
            {appointment.group.name} {appointment.discipline.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TeacherPage;