import React, { useContext, useEffect, useState } from "react";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import TeacherAppointmentForm from "../../forms/TeacherAppointmentForm.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import Loader from "../../Loader.tsx";
import "../../../styles/create-item-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { Group } from "../../../models/domain/Group.ts";
import { Teacher } from "../../../models/domain/Teacher.ts";
import { TeacherAppointmentDTO } from "../../../models/DTO/TeacherAppointmentDTO.ts";

const CreateTeacherAppointment = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const {
    teacherAppointmentApiService,
    disciplineApiService,
    groupApiService,
    teacherApiService,
  } = useContext(ApiContext) as ApiContextType;

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const createTeacherAppointment = async (
    teacherAppointment: TeacherAppointmentDTO,
    onDone: () => void
  ) => {
    try {
      await teacherAppointmentApiService
        .createAppointment(teacherAppointment)
        .then(() => showSuccessAlert(`Дисциплина назначена`));
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
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
