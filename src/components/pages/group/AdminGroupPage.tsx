import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader.tsx";
import { useNavigate } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import crossImg from "../../../images/cross.png";
import GroupForm from "../../forms/GroupForm.tsx";
import "../../../styles/admin-resource-page.css";
import { TeacherAppointment } from "../../../models/domain/TeacherAppointment.ts";
import { Student } from "../../../models/domain/Student.ts";
import { Group } from "../../../models/domain/Group.ts";
import { GroupDTO } from "../../../models/DTO/GroupDTO.ts";

const AdminGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { studentApiService, teacherAppointmentApiService, groupApiService } =
    useContext(ApiContext) as ApiContextType;
  const { theme, showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const [appointments, setAppointments] = useState<TeacherAppointment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const groupResponse = await groupApiService.getGroup(Number(groupId));
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
      if (group != null) {
        await groupApiService.deleteGroup(group.id);
        showSuccessAlert("Группа удалена");
        navigate("/");
      }
    } catch (error) {
      showErrorAlert(error.error);
    }
  };

  const updateGroup = async (updatedGroup: GroupDTO, onDone: () => void) => {
    try {
      if (group != null) {
        await groupApiService
          .updateGroup(group.id, updatedGroup)
          .then((updatedGroup) => {
            showSuccessAlert(`Группа ${updatedGroup.name} обновлена`);
            setGroup(updatedGroup);
          });
      }
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
      setUpdating(false);
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
      <div className="update-resource-page">
        <GroupForm edit={true} onFormSubmit={updateGroup} group={group} />
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
          <h1>{group?.name}</h1>
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
