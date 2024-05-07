import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Loader from "../../Loader.tsx";
import UserForm from "../../forms/UserForm.tsx";
import crossImg from "../../../images/cross.png";
import "../../../styles/admin-resource-page.css";
import { Teacher } from "../../../models/domain/Teacher.ts";
import { TeacherAppointment } from "../../../models/domain/TeacherAppointment.ts";
import ConfirmationPopup from "../../ConfirmationPopup.tsx";

const TeacherPage = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { teacherApiService, teacherAppointmentApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const [teacher, setTeacher] = useState<Teacher>();
  const [appointments, setAppointments] = useState<TeacherAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const teacherResponse = await teacherApiService.getTeacher(
          Number(teacherId)
        );
        const teacherAppointmentsResponse =
          await teacherAppointmentApiService.getAppointmentsByTeacher(
            Number(teacherId)
          );
        setTeacher(teacherResponse);
        setAppointments(teacherAppointmentsResponse);
        setLoading(false);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeacher = async () => {
    //todo
  };

  const deleteTeacher = async () => {
    //todo
  };

  const deleteAppointment = async (appointment: TeacherAppointment) => {
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
        <UserForm edit={true} user={teacher} onFormSubmit={updateTeacher} />
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
      <ConfirmationPopup
        isOpen={isOpenConfirmPopup}
        message="Вы действительно хотите удалить пользователя?"
        onContinue={deleteTeacher}
        onCancel={() => {
          setIsOpenConfirmPopup(false);
        }}
      />
      <div>
        <h1>{teacher?.fullName}</h1>
        <h2>{teacher?.username}</h2>
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
        <button className="control-button" onClick={() => setUpdating(true)}>
          ИЗМЕНИТЬ ИНФОРМАЦИЮ
        </button>
        <button
          className="delete-button"
          onClick={() => setIsOpenConfirmPopup(true)}
        >
          УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ
        </button>
      </div>
    </div>
  );
};

export default TeacherPage;
