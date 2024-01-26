import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ApiContext } from "../../contexts/ApiContext";
import { UiContext } from "../../contexts/UiContext";
import Loader from "../Loader";

const AppointTeacher = () => {
  const { register, handleSubmit } = useForm();
  const { teacherAppointmentApiService, disciplineApiService, groupApiService, teacherApiService  } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);

  const [disciplines, setDisciplines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const disciplines = await disciplineApiService.getDisciplines();
      setDisciplines(disciplines);
      const groups = await groupApiService.getGroups();
      setGroups(groups);
      const teachers = await teacherApiService.getTeachers();
      setTeachers(teachers);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    let appointment = {
      teacherId: data.teacherId,
      groupId: data.groupId,
      disciplineId: data.disciplineId
    };
    setLoading(true);
    try {
      console.log(appointment);
      await teacherAppointmentApiService
        .createAppointment(appointment)
        .then(() => alert(`Success, appointment created`));
    } catch (error) {
      alert(error.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
        <p className="form-name">НАЗНАЧЕНИЕ ПРЕПОДАВАТЕЛЯ</p>

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
                {discipline.name} {discipline.year} {discipline.halfYear}
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

export default AppointTeacher;
