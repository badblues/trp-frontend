import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import crossImg from "../../../images/cross.png";
import GroupForm from "../../forms/GroupForm";
import "../../../styles/admin-resource-page.css";

const AdminGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { studentApiService, teacherAppointmentApiService, groupApiService } =
    useContext(ApiContext);
  const { theme, showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const groupResponse = await groupApiService.getGroup(groupId);
        const teacherAppointmentsResponse =
          await teacherAppointmentApiService.getAppointmentsByGroup(
            Number(groupId)
          );
        const studentsResponse = await studentApiService.getStudentsByGroup(
          Number(groupId)
        );
        setGroup(groupResponse);
        setAppointments(teacherAppointmentsResponse);
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

  const deleteGroup = async () => {
    try {
      await groupApiService.deleteGroup(group.id);
      showSuccessAlert("Группа удалена");
      navigate("/");
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const updateGroup = async (updatedGroup, onUpdate) => {
    try {
      await groupApiService
        .updateGroup(updatedGroup.id, updatedGroup)
        .then((updatedGroup) => {
          showSuccessAlert(`Группа ${updatedGroup.name} обновлена`);
          setGroup(updatedGroup);
        });
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onUpdate();
      setUpdating(false);
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
      <div className="update-resource-page">
        <GroupForm onFormSubmit={updateGroup} group={group} />
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
        <div>
          <h1>{group.name}</h1>
        </div>
        {students.map((student) => (
          <div className="appointment-list" key={student.id}>
            <h4 className="appointment-item">{student.fullName}</h4>
          </div>
        ))}
        <button className="control-button" onClick={() => setUpdating(true)}>
          ИЗМЕНИТЬ ГРУППУ
        </button>
        <button className="control-button" onClick={deleteGroup}>
          УДАЛИТЬ ГРУППУ
        </button>
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
                    navigate(`/disciplines/${appointment.discipline.id}`);
                  }}
                >
                  {`${appointment.discipline.name} ${appointment.discipline.year}`}
                </h4>
                <label
                  className="appointment-link"
                  onClick={() => {
                    navigate(`/teachers/${appointment.teacher.id}`);
                  }}
                >
                  {`${appointment.teacher.fullName}`}
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
      </div>
    </div>
  );
};

export default AdminGroupPage;
