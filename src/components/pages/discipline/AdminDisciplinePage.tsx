import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import crossImg from "../../../images/cross.png";
import DisciplineForm from "../../forms/DisciplineForm.tsx";
import Loader from "../../Loader.tsx";
import "../../../styles/admin-resource-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { TeacherAppointment } from "../../../models/domain/TeacherAppointment.ts";
import { DisciplineDTO } from "../../../models/DTO/DisciplineDTO.ts";
import { HalfYear } from "../../../models/domain/HalfYear.ts";
import ConfirmationPopup from "../../ConfirmationPopup.tsx";

interface Props {
  defaultDiscipline: Discipline;
}

const AdminDisciplinePage: React.FC<Props> = ({ defaultDiscipline }) => {
  const navigate = useNavigate();
  const { teacherAppointmentApiService, disciplineApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const [discipline, setDiscipline] = useState<Discipline>(defaultDiscipline);
  const [appointments, setAppointments] = useState<TeacherAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState<boolean>(false);

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

  const updateDiscipline = async (
    updatedDiscipline: DisciplineDTO,
    onDone: () => void
  ) => {
    try {
      await disciplineApiService
        .updateDiscipline(discipline.id, updatedDiscipline)
        .then((updatedDiscipline) => {
          showSuccessAlert(`Дисциплина ${updatedDiscipline.name} обновлена`);
          setDiscipline(updatedDiscipline);
        });
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
      setUpdating(false);
    }
  };

  const deleteDiscipline = async () => {
    try {
      await disciplineApiService.deleteDiscipline(discipline.id);
      showSuccessAlert("Дисциплина удалена");
      setIsOpenConfirmPopup(false);
      navigate("/");
    } catch (error) {
      showErrorAlert(error.error);
    }
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
      <div className={`update-resource-page ${theme}`}>
        <DisciplineForm
          edit={true}
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
      <ConfirmationPopup
        isOpen={isOpenConfirmPopup}
        message="Вы действительно хотите удалить дисциплину?"
        onContinue={deleteDiscipline}
        onCancel={() => {
          setIsOpenConfirmPopup(false);
        }}
      />
      <div>
        <h1>
          {discipline.name} {discipline.year}
        </h1>
        <h2>{`Полугодие: ${
          discipline.halfYear === HalfYear.First ? "Первое" : "Второе"
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
          <button
            className="delete-button"
            onClick={() => setIsOpenConfirmPopup(true)}
          >
            УДАЛИТЬ ДИСЦИПЛИНУ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDisciplinePage;
