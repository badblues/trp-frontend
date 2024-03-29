import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import TeacherAppointmentForm from "../../forms/TeacherAppointmentForm";
import { UiContext } from "../../../contexts/UiContext";
import Loader from "../../Loader";
import "../../../styles/create-item-page.css";

const CreateTeacherAppointment = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const {
    teacherAppointmentApiService,
    disciplineApiService,
    groupApiService,
    teacherApiService,
  } = useContext(ApiContext);

  const [disciplines, setDisciplines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplinesResponse = await disciplineApiService.getDisciplines();
        const groupsResponse = await groupApiService.getGroups();
        const teachersResponse = await teacherApiService.getTeachers();
        setDisciplines(disciplinesResponse);
        setGroups(groupsResponse);
        setTeachers(teachersResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTeacherAppointment = async (teacherAppointment, onCreate) => {
    try {
      await teacherAppointmentApiService
        .createAppointment(teacherAppointment)
        .then(() => showSuccessAlert(`Дисциплина назначена`));
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreate();
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="create-page">
      <TeacherAppointmentForm
        disciplines={disciplines}
        groups={groups}
        teachers={teachers}
        onFormSubmit={createTeacherAppointment}
      />
    </div>
  );
};

export default CreateTeacherAppointment;
