import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Loader from "../../Loader";
import { useNavigate } from 'react-router-dom';
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import "./DisciplineGroupPage.css";
import TaskAppointments from "../../item-containers/TaskAppointments";


const TeacherDisciplineGroupPage = () => {
  const { disciplineId, groupId } = useParams(); 
  const [group, setGroup] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { studentApiService,
          teacherAppointmentApiService,
          studentAppointmentApiService,
          taskApiService } = useContext(ApiContext);
  const { darkMode, showErrorAlert } = useContext(UiContext);

  useEffect(() => {
    const fetchData = async () => {
      const teacherAppointmentsResponse = await teacherAppointmentApiService.getAppointments();
      const studentAppointmentsResponse = await studentAppointmentApiService.getAppointments();
      const allTasks = await taskApiService.getTasksByDiscipline(disciplineId);
      const allStudents = await studentApiService.getStudents();
      const filteredAppointments = teacherAppointmentsResponse.filter(a => a.group.id == groupId && a.discipline.id == disciplineId);
      if (filteredAppointments.length > 0) {
        setGroup(filteredAppointments[0].group);
        setDiscipline(filteredAppointments[0].discipline);
        const filteredStudents = allStudents.filter(s => s.group.id == groupId);
        for (const student of filteredStudents) {
          student.tasks = JSON.parse(JSON.stringify(allTasks))
          for (const task of student.tasks) {
            task.appointed = false;
            if (studentAppointmentsResponse.filter(a => a.studentId == student.id && a.taskId == task.id).length > 0)
            task.appointed = true;
          }
        }
        setStudents(filteredStudents);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTaskClick = async (task, handleTaskChangeState, student) => {
    if (!task.appointed) {
      setLoading(true);
      let appointment = {
        studentId: student.id,
        taskId: task.id
      };
      try {
        await studentAppointmentApiService
          .createAppointment(appointment);
      } catch (error) {
        showErrorAlert(error.error);
      } finally {
        task.appointed = !task.appointed;
        handleTaskChangeState(task);
        setLoading(false);
      }
    }
  }

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
            <h4 className="appointments-name">{student.fullName}</h4>
            <TaskAppointments className="appointments-task" onTaskClick={(task, handleTaskChangeState) => handleTaskClick(task, handleTaskChangeState, student)} tasks={student.tasks}/>
          </div>
        ))}
      </div>
      <div className="container1">
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year}</h2>
        <h4 className={`status-text status-not-appointed ${darkMode ? "dark-mode" : ""}`}>Не назначено</h4>
        <h4 className={`status-text status-appointed ${darkMode ? "dark-mode" : ""}`}>Назначено</h4>
        <h4 className="status-text status-in-progress">В процессе</h4>
        <h4 className="status-text status-finished">Выполнено</h4>
        <h4 className="status-text status-done">Зачтено</h4>
      </div>
    </div>
  );
}

export default TeacherDisciplineGroupPage;