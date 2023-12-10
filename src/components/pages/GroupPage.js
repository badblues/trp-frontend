import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from 'react-router-dom';
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./GroupPage.css";


const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { teacherApiService,
          appointmentApiService,
          groupApiService,
          disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const groupResponse = await groupApiService.getGroup(id);
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allDisciplines = await disciplineApiService.getDisciplines();
      const allTeachers = await teacherApiService.getTeachers();
      setGroup(groupResponse);
      console.log(appointmentsResponse);
      const filteredAppointments = appointmentsResponse.filter(a => a.groupId == id);
      setAppointments(filteredAppointments);
      filteredAppointments.forEach(a => {
        a.discipline = allDisciplines.find(d => d.id === a.disciplineId);
        a.teacher = allTeachers.find(g => g.id === a.teacherId);
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
    <div className="page-container">
      <div>
      <h1 className={`${darkMode ? "dark-mode" : ""}`}>{group.name}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Текущие дисциплины:</h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <div className="appointments-item">
              <h4 className="clickable" onClick={() => {navigate(`/disciplines/${appointment.discipline.id}`)}}>{`${appointment.discipline.name} ${appointment.discipline.year}`}</h4>
              <label className="clickable" onClick={() => {navigate(`/teachers/${appointment.teacher.id}`)}}>{`${appointment.teacher.fullName}`}</label>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
}

export default GroupPage;