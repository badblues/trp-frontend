import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from 'react-router-dom';
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./TeacherPage.css";


const TeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { teacherApiService,
          appointmentApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const teacherResponse = await teacherApiService.getTeacher(id);
      const appointmentsResponse = await appointmentApiService.getAppointments();
      setTeacher(teacherResponse);
      const filteredAppointments = appointmentsResponse.filter(a => a.teacher.id == id);
      setAppointments(filteredAppointments);
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
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{teacher.fullName}</h1>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Текущие дисциплины:</h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <div className="appointments-item">
              <h4 className="clickable" onClick={() => {navigate(`/groups/${appointment.group.id}`)}}>
                {appointment.group.name}
              </h4>
              <label className="clickable" onClick={() => {navigate(`/groups/${appointment.discipline.id}`)}}>
                {appointment.discipline.name} {appointment.discipline.year}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherPage;