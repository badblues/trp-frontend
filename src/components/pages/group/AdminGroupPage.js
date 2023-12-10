import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { useNavigate, useParams } from 'react-router-dom';
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./GroupPage.css";


const AdminGroupPage = ({ group }) => {
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { studentApiService,
          teacherApiService,
          appointmentApiService,
          disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentsResponse = await appointmentApiService.getAppointments();
      const allStudents = await studentApiService.getStudents();
      const allDisciplines = await disciplineApiService.getDisciplines();
      const allTeachers = await teacherApiService.getTeachers();
      const filteredAppointments = appointmentsResponse.filter(a => a.groupId === group.id);
      setAppointments(filteredAppointments);
      filteredAppointments.forEach(a => {
        a.discipline = allDisciplines.find(d => d.id === a.disciplineId);
        a.teacher = allTeachers.find(g => g.id === a.teacherId);
      });
      const filteredStudents = allStudents.filter(s => s.group.id === group.id);
      setStudents(filteredStudents);
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
        {students.map((student) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={student.id}
          >
            <h4 className="appointments-item">{student.fullName}</h4>
          </div>
        ))}
      </div>
      <div>
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

export default AdminGroupPage;