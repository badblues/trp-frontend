import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";


const AdminDisciplinePage = ({ discipline }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherApiService,
          appointmentApiService,
          groupApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allTeachers = await teacherApiService.getTeachers();
      const allGroups = await groupApiService.getGroups();
      const filteredAppointments = appointmentsResponse.filter(a => a.disciplineId == discipline.id);
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
      <h1 className={`${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year} {discipline.halfYear}</h1>
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
    </div>
  );
}

export default AdminDisciplinePage;