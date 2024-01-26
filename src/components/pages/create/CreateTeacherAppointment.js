import React, { useContext} from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import TeacherAppointmentForm from "../../forms/TeacherAppointmentForm";

const CreateTeacherAppointment = () => {
  const { teacherAppointmentApiService  } = useContext(ApiContext);


  const createTeacherAppointment = async (teacherAppointment, onCreate) => {
    try {
      await teacherAppointmentApiService
        .createAppointment(teacherAppointment)
        .then(() => alert(`Success, appointment created`));
    } catch (error) {
      alert(error.error);
    } finally {
      onCreate();
    }
  };

  return (
    <div>
      <TeacherAppointmentForm onFormSubmit={createTeacherAppointment}/>
    </div>
  );
};

export default CreateTeacherAppointment;
