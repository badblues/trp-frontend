import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/form.css";
import { Discipline } from "../../models/domain/Discipline.ts";
import { Teacher } from "../../models/domain/Teacher.ts";
import { Group } from "../../models/domain/Group.ts";
import { TeacherAppointmentDTO } from "../../models/DTO/TeacherAppointmentDTO.ts";

interface Props {
  disciplines: Discipline[];
  teachers: Teacher[];
  groups: Group[];
  onFormSubmit: (
    appointmentDTO: TeacherAppointmentDTO,
    onDone: () => void
  ) => void;
}

const TeacherAppointmentForm: React.FC<Props> = ({
  onFormSubmit,
  disciplines,
  teachers,
  groups,
}) => {
  const { register, handleSubmit } = useForm();
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    onFormSubmit(data as TeacherAppointmentDTO, () => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">НАЗНАЧЕНИЕ ПРЕПОДАВАТЕЛЯ</h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="discipline">
            Дисциплина:
          </label>
          <select
            id="discipline"
            className="form-input"
            {...register("disciplineId")}
          >
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name} {discipline.year}{" "}
                {discipline.halfYear === "SECOND" ? "1/2" : "2/2"}
              </option>
            ))}
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="group">
            Группа:
          </label>
          <select id="group" className="form-input" {...register("groupId")}>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="teacher">
            Преподаватель:
          </label>
          <select
            id="teacher"
            className="form-input"
            {...register("teacherId")}
          >
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? <Loader /> : "Назначить преподавателя"}
        </button>
      </div>
    </form>
  );
};

export default TeacherAppointmentForm;
