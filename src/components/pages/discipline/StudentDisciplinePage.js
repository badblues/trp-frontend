import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";
import Tasks from "../../item-containers/Tasks";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";

const StudentDisciplinePage = ({ discipline }) => {
  const { darkMode } = useContext(UiContext);
  const [teachers, setTeachers] = useState([]);
  const { teacherAppointmentApiService } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navigateToTask = (task) => {
    navigate(`/tasks/${task.id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const appointments = await teacherAppointmentApiService.getAppointments();
      console.log(appointments);
      const filteredAppointments = appointments.filter((a) => a.discipline.id === discipline.id);
      const teachers = filteredAppointments.map(appointment => appointment.teacher)
      setTeachers(teachers);
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
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year}</h1>
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <h2 className={`${darkMode ? "dark-mode" : ""}`}>{teacher.fullName}</h2>
          </div>
        ))}
        <h2></h2>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Доступные лабораторные работы:</h2>
        <Tasks disciplineId={discipline.id} onSelect={navigateToTask}/>
      </div>
    </div>
  );
}

export default StudentDisciplinePage;