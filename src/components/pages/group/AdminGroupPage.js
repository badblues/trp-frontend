import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Loader from "../../Loader";
import { useNavigate } from 'react-router-dom';
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import crossImg from "../../../images/cross.png";
import GroupForm from "../../forms/GroupForm";
import "./GroupPage.css";


const AdminGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { studentApiService,
          teacherAppointmentApiService,
          groupApiService } = useContext(ApiContext);
  const { darkMode, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const groupResponse = await groupApiService.getGroup(groupId);
      setGroup(groupResponse);
      const teacherAppointmentsResponse = await teacherAppointmentApiService.getAppointments();
      const allStudents = await studentApiService.getStudents();
      const filteredAppointments = teacherAppointmentsResponse.filter(a => a.group.id == groupId);
      setAppointments(filteredAppointments);
      const filteredStudents = allStudents.filter(s => s.group.id == groupId);
      setStudents(filteredStudents);
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteGroup = async () => {
    try {
      await groupApiService.deleteGroup(group.id);
      showSuccessAlert("Группа удалена");
      navigate("/");
    } catch (errorData) {
      showErrorAlert(errorData.error);
    }
  }

  const updateGroup = async (updatedGroup, onUpdate) => {
    try {
      await groupApiService
        .updateGroup(group.id, updatedGroup)
        .then((updatedGroup) => {
          showSuccessAlert(`Группа ${updatedGroup.name} обновлена`);
          setGroup(updatedGroup);
        });
    } catch(errorData) {
      showErrorAlert(errorData.error);
    } finally {
      onUpdate();
      setUpdating(false);
    }
  }

  const deleteAppointment = async (appointment) => {
    try {
      await teacherAppointmentApiService.deleteAppointment(appointment.id);
      setAppointments(appointments.filter(a => a.id !== appointment.id));
      showSuccessAlert("Назначение удалено");
    } catch (errorData) {
      showErrorAlert(errorData.error);
    }
  }

  if (loading) {
    return (
      <div className="disciplines-container">
        <Loader />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="page-container">
        <div className="group-form-container">
          <GroupForm
            onFormSubmit={updateGroup}
            group={group}/>
        </div>
        <button 
          className="button"
          onClick={() => setUpdating(false)}
          >
          ЗАКРЫТЬ
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div>
        <div>
          <h1 className={`${darkMode ? "dark-mode" : ""}`}>{group.name}</h1>
        </div>
        {students.map((student) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={student.id}
          >
            <h4 className="appointments-item">{student.fullName}</h4>
          </div>
        ))}
        <button
          className="button"
          onClick={() => setUpdating(true)}>
          ИЗМЕНИТЬ ГРУППУ
        </button>
        <button
          className="button"
          onClick={deleteGroup}>
          УДАЛИТЬ ГРУППУ
        </button>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Текущие дисциплины:</h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <div className="appointments-item">
              <div className="appointments-links">
                <h4
                  className="clickable"
                  onClick={() => {navigate(`/disciplines/${appointment.discipline.id}`)}}>
                  {`${appointment.discipline.name} ${appointment.discipline.year}`}
                </h4>
                <label
                  className="clickable"
                  onClick={() => {navigate(`/teachers/${appointment.teacher.id}`)}}>
                  {`${appointment.teacher.fullName}`}
                </label>
              </div>
              <button
                className="button-with-image"
                title="Удалить назначение"
                onClick={() => deleteAppointment(appointment)}>
                <img src={crossImg} alt="DELETE" width="17"></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminGroupPage;