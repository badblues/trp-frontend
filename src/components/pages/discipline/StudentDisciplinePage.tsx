import React, { useContext, useState, useEffect } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Loader from "../../Loader.tsx";
import { useNavigate } from "react-router-dom";
import "../../../styles/discipline-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { LabWork } from "../../../models/domain/LabWork.ts";
import { Teacher } from "../../../models/domain/Teacher.ts";
import StudentLabWorksList from "../../item-containers/StudentLabWorksList.tsx";
import { TeamAppointment } from "../../../models/domain/TeamAppointment.ts";
import { Role } from "../../../models/domain/Role.ts";
import { TeamAppointmentStatus } from "../../../models/domain/TeamAppointmentStatus.ts";
import { Language } from "../../../models/domain/Language.ts";
import { CType } from "../../../models/domain/Type.ts";

interface Props {
  defaultDiscipline: Discipline;
}

const StudentDisciplinePage: React.FC<Props> = ({ defaultDiscipline }) => {
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const navigate = useNavigate();
  const {
    teacherAppointmentApiService,
    labWorkApiService,
    teamAppointmentApiService,
  } = useContext(ApiContext) as ApiContextType;
  const discipline = defaultDiscipline;
  const [loading, setLoading] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teamAppointments, setTeamAppointments] = useState<TeamAppointment[]>(
    []
  );
  const [labWorks, setLabWorks] = useState<LabWork[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const teacherApointments =
          await teacherAppointmentApiService.getAppointmentsByDiscipline(
            discipline.id
          );
        const teachers = teacherApointments.map(
          (appointment) => appointment.teacher
        );
        setTeachers(teachers);
        //TEMPORARY
        setLabWorks([
          {
            id: 1,
            title: "LR 1",
            disciplineId: 1,
            maxRating: 100,
            variants: [
              {
                id: 1,
                labWorkId: 1,
                title: "1. Функция суммы",
                description:
                  "Создайте функцию add, которая принимает два аргумента (числа) и возвращает их сумму.",
                language: Language.C,
                testable: true,
                functionName: "add",
                returnType: CType.Int,
                arguments: [
                  {
                    name: "a",
                    type: "int",
                  },
                  {
                    name: "b",
                    type: "int",
                  },
                ],
                inputRegex: "",
                outputRegex: "",
              },
            ],
          },
        ]);
        //TEMPORARY
        setTeamAppointments([
          {
            id: 1,
            team: {
              id: 18,
              disciplineId: 1,
              students: [
                {
                  id: 5,
                  group: {
                    id: 1,
                    name: "AVTTEMPORARY",
                  },
                  fullName: "ALEXEY",
                  username: "username",
                  role: Role.Student,
                },
                {
                  id: 38,
                  group: {
                    id: 1,
                    name: "AVTTEMPORARY",
                  },
                  fullName: "asdf",
                  username: "username",
                  role: Role.Student,
                },
              ],
            },
            status: TeamAppointmentStatus.InProgress,
            labWorkVariant: {
              id: 1,
              labWorkId: 1,
              title: "1. Функция суммы",
              description:
                "Создайте функцию add, которая принимает два аргумента (числа) и возвращает их сумму.",
              language: Language.C,
              testable: true,
              functionName: "add",
              returnType: CType.Int,
              arguments: [
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "int",
                },
              ],
              inputRegex: "",
              outputRegex: "",
            },
            codeReviewIds: [],
          },
        ]);
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
        <StudentLabWorksList
          labWorks={labWorks}
          teamAppointments={teamAppointments}
          onLabWorkVariantSelect={(variant) =>
            navigate(`/lab-work-variants/${variant.id}`)
          }
        />
      </div>
    </div>
  );
};

export default StudentDisciplinePage;
