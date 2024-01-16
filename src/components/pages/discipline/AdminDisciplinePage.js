import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";
import { useNavigate } from "react-router-dom";


const AdminDisciplinePage = ({ discipline }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { appointmentApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const filteredAppointments = appointmentsResponse.filter(a => a.discipline.id == discipline.id);
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
        <h1 className={` ${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year}</h1>
        <h2 className={` ${darkMode ? "dark-mode" : ""}`}>{`Полугодие: ${discipline.halfYear == 'FIRST' ? "Первое" : "Второе"}`}</h2>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Группы:</h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <div className="appointments-item">
                <h4 className="clickable" onClick={() => {navigate(`/groups/${appointment.group.id}`)}}>{`${appointment.group.name} `}</h4>
                <label className="clickable" onClick={() => {navigate(`/teachers/${appointment.teacher.id}`)}}>{` ${appointment.teacher.fullName}`}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDisciplinePage;