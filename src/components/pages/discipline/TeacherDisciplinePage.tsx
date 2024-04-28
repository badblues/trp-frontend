import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";
import { Role } from "../../../models/domain/Role.ts";
import LabWorks from "../../item-containers/LabWorks.tsx";
import { useNavigate } from "react-router-dom";
import "../../../styles/discipline-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { TeacherAppointment } from "../../../models/domain/TeacherAppointment.ts";
import { LabWork } from "../../../models/domain/LabWork.ts";

interface Props {
  defaultDiscipline: Discipline;
}

const TeacherDisciplinePage: React.FC<Props> = ({ defaultDiscipline }) => {
  const navigate = useNavigate();
  const {
    teacherAppointmentApiService,
    labWorkApiService,
  } = useContext(ApiContext) as ApiContextType;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<TeacherAppointment[]>([]);
  const [labWorks, setLabWorks] = useState<LabWork[]>([]);
  const discipline = defaultDiscipline;

  useEffect(() => {
    (async () => {
      try {
        const teacherAppointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        const labWorksResponse =
          await labWorkApiService.getLabWorksByDiscipline(discipline.id);
        setAppointments(teacherAppointments);
        setLabWorks(labWorksResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`discipline-page ${theme}`}>
      <div>
        <h1>
          {discipline.name} {discipline.year}
        </h1>
        <h2>{`Полугодие: ${
          discipline.halfYear === "FIRST" ? "Первое" : "Второе"
        }`}</h2>
        <h2>Лабораторные работы:</h2>
        <LabWorks
          labWorks={labWorks}
          onAddLabWorkVariantClick={(labWork: LabWork) => {
            navigate(`/lab-works/${labWork.id}/create-lab-work-variant`);
          }}
          onLabWorkVariantSelect={(variant) =>
            navigate(`/lab-work-variants/${variant.id}`)
          }
        />
        {user!.role === Role.SeniorTeacher ? (
          <button
            className="add-lab-button"
            onClick={() => {
              navigate(`/disciplines/${discipline.id}/create-lab-work`);
            }}
          >
            Добавить работу
          </button>
        ) : null}
      </div>
      <div>
        <h2>Группы с этим предметом:</h2>
        {appointments.map((appointment) => (
          <div className="appointment-link" key={appointment.id}>
            <h4
              onClick={() => {
                navigate(
                  `/disciplines/${discipline.id}/groups/${appointment.group.id}`
                );
              }}
            >
              {appointment.group.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDisciplinePage;
