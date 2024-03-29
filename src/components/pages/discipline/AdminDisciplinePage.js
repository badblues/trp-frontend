import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import crossImg from "../../../images/cross.png";
import DisciplineForm from "../../forms/DisciplineForm";
import Loader from "../../Loader";
import "../../../styles/admin-resource-page.css";

const AdminDisciplinePage = ({ defaultDiscipline }) => {
  const navigate = useNavigate();
  const { teacherAppointmentApiService, disciplineApiService } =
    useContext(ApiContext);
  const { theme, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const [discipline, setDiscipline] = useState(defaultDiscipline);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const teacherApointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        setAppointments(teacherApointments);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDiscipline = async (updatedDiscipline, onUpdate) => {
    try {
      await disciplineApiService
        .updateDiscipline(updatedDiscipline.id, updatedDiscipline)
        .then((updatedDiscipline) => {
          showSuccessAlert(`Дисциплина ${updatedDiscipline.name} обновлена`);
          setDiscipline(updatedDiscipline);
        });
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onUpdate();
      setUpdating(false);
    }
  };

  const deleteDiscipline = async () => {
    try {
      await disciplineApiService.deleteDiscipline(discipline.id);
      showSuccessAlert("Дисциплина удалена");
      navigate("/");
    } catch (error) {
      showErrorAlert(error.error);
    }
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
      <div className={`update-resource-page ${theme}`}>
        <DisciplineForm
          discipline={discipline}
          onFormSubmit={updateDiscipline}
        />
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
        <h1>
          {discipline.name} {discipline.year}
        </h1>
        <h2>{`Полугодие: ${
          discipline.halfYear === "FIRST" ? "Первое" : "Второе"
        }`}</h2>
      </div>
      <div>
        <h2>Группы:</h2>
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
                  {`${appointment.group.name} `}
                </h4>
                <label
                  className="appointment-link"
                  onClick={() => {
                    navigate(`/teachers/${appointment.teacher.id}`);
                  }}
                >
                  {` ${appointment.teacher.fullName}`}
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
        <div>
          <button className="control-button" onClick={() => setUpdating(true)}>
            ИЗМЕНИТЬ ДИСЦИПЛИНУ
          </button>
          <button className="control-button" onClick={deleteDiscipline}>
            УДАЛИТЬ ДИСЦИПЛИНУ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDisciplinePage;
