import React, { useContext, useState, useEffect } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Loader from "../../Loader.tsx";
import { useNavigate } from "react-router-dom";
import "../../../styles/discipline-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { LabWork } from "../../../models/domain/LabWork.ts";
import { Teacher } from "../../../models/domain/Teacher.ts";
import LabWorks from "../../item-containers/LabWorks.tsx";

interface Props {
  defaultDiscipline: Discipline;
}

const StudentDisciplinePage: React.FC<Props> = ({ defaultDiscipline }) => {
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const navigate = useNavigate();
  const {
    teacherAppointmentApiService,
    labWorkApiService,
    labWorkVariantApiService,
  } = useContext(ApiContext) as ApiContextType;
  const discipline = defaultDiscipline;
  const [loading, setLoading] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [labWorks, setLabWorks] = useState<LabWork[]>([]);

  const navigateToLabWork = (labWork: LabWork) => {
    navigate(`/lab-work/${labWork.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const teacherApointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        const labWorksResponse =
          await labWorkApiService.getLabWorksByDiscipline(discipline.id);
        const teachers = teacherApointments.map(
          (appointment) => appointment.teacher
        );
        setTeachers(teachers);
        //TODO REWORK
        const promises = labWorksResponse.map(async (labWork) => {
          labWork.variants =
            await labWorkVariantApiService.getLabWorkVariantsByLabWork(
              labWork.id
            );
        });
        await Promise.all(promises);
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
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <h2>{teacher.fullName}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2>Доступные лабораторные работы:</h2>
        <LabWorks labWorks={labWorks} />
      </div>
    </div>
  );
};

export default StudentDisciplinePage;
