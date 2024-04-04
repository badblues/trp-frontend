import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import TaskAppointments from "../../item-containers/TaskAppointments.js";
import FakeTaskAppointments from "../../loaders/FakeTaskAppointments.tsx";
import "../../../styles/discipline-group-page.css";

const TeacherDisciplineGroupPage = () => {
  const { disciplineId, groupId } = useParams();
  const navigate = useNavigate();
  const {
    studentApiService,
    groupApiService,
    disciplineApiService,
    studentAppointmentApiService,
    taskApiService,
  } = useContext(ApiContext) as ApiContextType;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [group, setGroup] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const groupResponse = await groupApiService.getGroup(Number(groupId));
        const disciplineResponse = await disciplineApiService.getDiscipline(
          Number(disciplineId)
        );
        const studentAppointments =
          await studentAppointmentApiService.getAppointments();
        const allTasks = await taskApiService.getTasksByDiscipline(
          disciplineId
        );
        const studentsResponse =
          await studentApiService.getStudentsWithTasksByGroup(
            Number(groupId),
            allTasks,
            studentAppointments
          );
        setGroup(groupResponse);
        setDiscipline(disciplineResponse);
        setStudents(studentsResponse);
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskClick = async (task, handleTaskChangeState, student) => {
    setLoading(true);
    var newAppointment;
    try {
      if (!task.appointed) {
        let appointment = {
          studentId: student.id,
          taskId: task.id,
        };
        newAppointment = await studentAppointmentApiService.createAppointment(
          appointment
        );
      } else {
        await studentAppointmentApiService.deleteAppointment(
          task.appointment.id
        );
      }
      task.appointed = !task.appointed;
      if (task.appointed) task.appointment = newAppointment;
      handleTaskChangeState(task);
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <FakeTaskAppointments />
      </div>
    );
  }

  return (
    <div className={`discipline-group-page ${theme}`}>
      <div>
        <h1>{group.name}</h1>
        {students.map((student) => (
          <div className="task-appointment-list" key={student.id}>
            <h4 className="task-appointment-student-name">
              {student.fullName}
            </h4>
            <TaskAppointments
              onTaskClick={(task, handleTaskChangeState) =>
                handleTaskClick(task, handleTaskChangeState, student)
              }
              tasks={student.tasks}
            />
          </div>
        ))}
      </div>
      <div className="info-container">
        <h2>
          {discipline.name} {discipline.year}
        </h2>
        <h4 className="status-text status-not-appointed">Не назначено</h4>
        <h4 className="status-text status-appointed">Назначено</h4>
        <h4 className="status-text status-in-progress">В процессе</h4>
        <h4 className="status-text status-finished">Выполнено</h4>
        <h4 className="status-text status-done">Зачтено</h4>
      </div>
    </div>
  );
};

export default TeacherDisciplineGroupPage;
