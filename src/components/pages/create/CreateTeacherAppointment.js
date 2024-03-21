import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import TeacherAppointmentForm from "../../forms/TeacherAppointmentForm";
import { UiContext } from "../../../contexts/UiContext";
import Loader from "../../Loader";

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
    const fetchData = async () => {
      const disciplinesResponse = await disciplineApiService.getDisciplines();
      setDisciplines(disciplinesResponse);
      const groupsResponse = await groupApiService.getGroups();
      setGroups(groupsResponse);
      const teachersResponse = await teacherApiService.getTeachers();
      setTeachers(teachersResponse);
      setLoading(false);
    };
    fetchData();
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
    <div>
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
