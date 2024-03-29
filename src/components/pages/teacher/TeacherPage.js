import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import Loader from "../../Loader";
import UserForm from "../../forms/UserForm";
import crossImg from "../../../images/cross.png";
import "../../../styles/admin-resource-page.css";

const TeacherPage = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { teacherApiService, teacherAppointmentApiService } =
    useContext(ApiContext);
  const { theme, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const [teacher, setTeacher] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const teacherResponse = await teacherApiService.getTeacher(teacherId);
        const teacherAppointmentsResponse =
          await teacherAppointmentApiService.getAppointmentsByTeacher(
            Number(teacherId)
          );
        setTeacher(teacherResponse);
        setAppointments(teacherAppointmentsResponse);
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeacher = async () => {
    //todo
  };

  const deleteTeacher = async () => {
    //todo
  };

  const deleteAppointment = async (appointment) => {
    try {
      await teacherAppointmentApiService.deleteAppointment(appointment.id);
      setAppointments(appointments.filter((a) => a.id !== appointment.id));
      showSuccessAlert("Назначение удалено");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="update-resource-page">
        <UserForm onFormSubmit={updateTeacher} user={teacher} />
        <button
          className="close-resource-form-button"
          onClick={() => setUpdating(false)}
        >
          ЗАКРЫТЬ
        </button>
      </div>
    );
  }

  return (
    <div className={`resource-page ${theme}`}>
      <div>
        <h1>{teacher.fullName}</h1>
        <h2>{teacher.username}</h2>
      </div>
      <div>
        <h2>Текущие дисциплины:</h2>
        {appointments.map((appointment) => (
          <div className="appointment-list" key={appointment.id}>
            <div className="appointment-item">
              <div>
                <h4
                  className="appointment-link"
                  onClick={() => {
                    navigate(`/groups/${appointment.group.id}`);
                  }}
                >
                  {appointment.group.name}
                </h4>
                <label
                  className="appointment-link"
                  onClick={() => {
                    navigate(`/disciplines/${appointment.discipline.id}`);
                  }}
                >
                  {appointment.discipline.name} {appointment.discipline.year}
                </label>
              </div>
              <button
                className="remove-appointment-button"
                title="Удалить назначение"
                onClick={() => deleteAppointment(appointment)}
              >
                <img src={crossImg} alt="DELETE" width="17"></img>
              </button>
            </div>
          </div>
        ))}
        <button
          className="control-button"
          onClick={() => setUpdating(true)}
        >
          ИЗМЕНИТЬ ИНФОРМАЦИЮ
        </button>
        <button className="control-button" onClick={deleteTeacher}>
          УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ
        </button>
      </div>
    </div>
  );
};

export default TeacherPage;
