import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../contexts/UiContext";
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplinePage.css";
import Tasks from "../../Tasks";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";

const StudentDisciplinePage = ({ discipline }) => {
  const { darkMode } = useContext(UiContext);
  const { user} = useContext(UserContext);
  const [teachers, setTeachers] = useState([]);
  const { studentApiService,
          teacherApiService,
          appointmentApiService } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navigateToTask = (task) => {
    navigate(`/tasks/${task.id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const student = await studentApiService.getStudent(user.id);
      const group = student.group;
      const appointments = await appointmentApiService.getAppointments();
      const allTeachers = await teacherApiService.getTeachers();
      const filteredAppointments = appointments.filter((a) => a.groupId === group.id && a.disciplineId === discipline.id);
      const filteredTeachers = allTeachers.filter((t) => { return filteredAppointments.some((appointment) => appointment.teacherId === t.id); });
      setTeachers(filteredTeachers);
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
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Лабораторные работы:</h2>
        <Tasks disciplineId={discipline.id} onSelect={navigateToTask}/>
      </div>
    </div>
  );
}

export default StudentDisciplinePage;