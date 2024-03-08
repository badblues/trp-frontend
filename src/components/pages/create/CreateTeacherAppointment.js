import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import TeacherAppointmentForm from "../../forms/TeacherAppointmentForm";
import { UiContext } from "../../../contexts/UiContext";

const CreateTeacherAppointment = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { teacherAppointmentApiService } = useContext(ApiContext);

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

  return (
    <div>
      <TeacherAppointmentForm onFormSubmit={createTeacherAppointment} />
    </div>
  );
};

export default CreateTeacherAppointment;
