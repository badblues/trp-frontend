import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import Loader from "../../Loader";
import UserForm from "../../forms/UserForm";
import crossImg from "../../../images/cross.png";
import "./TeacherPage.css";


const TeacherPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teacherApiService,
          teacherAppointmentApiService } = useContext(ApiContext);
  const { darkMode, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const [teacher, setTeacher] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const teacherResponse = await teacherApiService.getTeacher(id);
      const teacherAppointmentsResponse = await teacherAppointmentApiService.getAppointments();
      setTeacher(teacherResponse);
      const filteredAppointments = teacherAppointmentsResponse.filter(a => a.teacher.id == id);
      setAppointments(filteredAppointments);
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateTeacher = async () => {
    //todo
  }

  const deleteTeacher = async () => {
    //todo
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
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="page-container">
        <div className="user-form-container">
          <UserForm
            onFormSubmit={updateTeacher}
            user={teacher}/>
        </div>
        <button
          className="button"
          onClick={() => setUpdating(false)}>
          ЗАКРЫТЬ
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div>
        <h1 className={`${darkMode ? "dark-mode" : ""}`}>{teacher.fullName}</h1>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>{teacher.username}</h2>
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
                <h4 className="clickable" onClick={() => {navigate(`/groups/${appointment.group.id}`)}}>
                  {appointment.group.name}
                </h4>
                <label className="clickable" onClick={() => {navigate(`/disciplines/${appointment.discipline.id}`)}}>
                  {appointment.discipline.name} {appointment.discipline.year}
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
        <button
          className='button control-button'
          onClick={() => setUpdating(true)}>
          ИЗМЕНИТЬ ИНФОРМАЦИЮ
        </button>
        <button
          className='button control-button'
          onClick={deleteTeacher}>
          УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ
        </button>
      </div>
    </div>
  );
}

export default TeacherPage;
