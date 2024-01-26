import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ApiContext } from "../../contexts/ApiContext";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";
import "./Form.css";

const TeacherAppointmentForm = ({ onFormSubmit }) => {
  const { register, handleSubmit } = useForm();
  const { disciplineApiService, groupApiService, teacherApiService  } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  const [disciplines, setDisciplines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const onDone = () => {
    setLoading(false);
  }

  const onSubmit = (data) => {
    let appointment = {
      teacherId: data.teacherId,
      groupId: data.groupId,
      disciplineId: data.disciplineId
    };
    setLoading(true);
    onFormSubmit(appointment, onDone);
  }

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <h1 className="form-name">НАЗНАЧЕНИЕ ПРЕПОДАВАТЕЛЯ</h1>

        <div className="form-input-container">
          <label className="form-label" htmlFor="discipline">
            Дисциплина:
          </label>
          <select
            id="discipline"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            {...register("disciplineId")}
          >
            {disciplines.map((discipline) => (
              <option
                key={discipline.id}
                value={discipline.id}
              >
                {discipline.name} {discipline.year} {discipline.halfYear === "SECOND" ? "1/2" : "2/2"}
              </option>
            ))}
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="group">
            Группа:
          </label>
          <select
            id="group"
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            {...register("groupId")}
          >
            {groups.map((group) => (
              <option
                key={group.id}
                value={group.id}
              >
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
            className={`form-input ${darkMode ? "dark-mode" : ""}`}
            {...register("teacherId")}
          >
            {teachers.map((teacher) => (
              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>

        <button disabled={loading} className="button form-button" type="submit">
          {loading ? <Loader /> : "Назначить преподавателя"}
        </button>
      </div>
    </form>
  );
};

export default TeacherAppointmentForm;
