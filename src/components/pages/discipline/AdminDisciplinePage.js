import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UiContext } from "../../../contexts/UiContext";
import { ApiContext } from "../../../contexts/ApiContext";
import DisciplineForm from "../../forms/DisciplineForm";
import Loader from "../../Loader";
import "./DisciplinePage.css";


const AdminDisciplinePage = ({ defaultDiscipline }) => {
  const navigate = useNavigate()
  const { teacherAppointmentApiService,
          disciplineApiService } = useContext(ApiContext);
  const { darkMode } = useContext(UiContext);
  const [discipline, setDiscipline] = useState(defaultDiscipline);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const teacherAppointmentsResponse = await teacherAppointmentApiService.getAppointments();
      const filteredAppointments = teacherAppointmentsResponse.filter(a => a.discipline.id == discipline.id);
      setAppointments(filteredAppointments);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const updateDiscipline = async (updatedDiscipline, onUpdate) => {
    try {
      await disciplineApiService
        .updateDiscipline(discipline.id, updatedDiscipline)
        .then((updatedDiscipline) => {
          alert(`Success, ${updatedDiscipline.name} updated`);
          setDiscipline(updatedDiscipline);
        });
    } catch(errorData) {
      alert(errorData.error);
    } finally {
      onUpdate();
      setUpdating(false);
    }
  }
  
  const deleteDiscipline = async () => {
    try {
      await disciplineApiService.deleteDiscipline(discipline.id);
      navigate("/");
    } catch (errorData) {
      alert(errorData.error);
    }
  }

  if (loading) {
    return (
      <div className="disciplines-container">
        <Loader />
      </div>
    );
  }

  if (updating) {
    return (
      <div className="page-container">
        <div className="discipline-form-container">
          <DisciplineForm
            discipline={discipline}
            onFormSubmit={updateDiscipline}/>
        </div>
        <button
          className="button"
          onClick={() => setUpdating(false)}>
          ЗАКРЫТЬ
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div>
        <h1 className={` ${darkMode ? "dark-mode" : ""}`}>{discipline.name} {discipline.year}</h1>
        <h2 className={` ${darkMode ? "dark-mode" : ""}`}>{`Полугодие: ${discipline.halfYear == 'FIRST' ? "Первое" : "Второе"}`}</h2>
      </div>
      <div>
        <h2 className={`${darkMode ? "dark-mode" : ""}`}>Группы:</h2>
        {appointments.map((appointment) => (
          <div
            className={`appointments-list ${darkMode ? "dark-mode" : ""}`}
            key={appointment.id}
          >
            <div className="appointments-item">
                <h4 className="clickable" onClick={() => {navigate(`/groups/${appointment.group.id}`)}}>{`${appointment.group.name} `}</h4>
                <label className="clickable" onClick={() => {navigate(`/teachers/${appointment.teacher.id}`)}}>{` ${appointment.teacher.fullName}`}</label>
            </div>
          </div>
        ))}
        <button
          className="button"
          onClick={() => setUpdating(true)}>
          ИЗМЕНИТЬ ДИСЦИПЛИНУ
        </button>
        <button
          className="button"
          onClick={deleteDiscipline}>
          УДАЛИТЬ ДИСЦИПЛИНУ
        </button>
      </div>
    </div>
  );
}

export default AdminDisciplinePage;