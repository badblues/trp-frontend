import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import FakeTaskAppointments from "../../loaders/FakeTaskAppointments.tsx";
import "../../../styles/discipline-group-page.css";
import { Group } from "../../../models/domain/Group.ts";
import { Discipline } from "../../../models/domain/Discipline.ts";
import { Student } from "../../../models/domain/Student.ts";

const TeacherDisciplineGroupPage = () => {
  const { disciplineId, groupId } = useParams();
  const navigate = useNavigate();
  const { studentApiService, groupApiService, disciplineApiService } =
    useContext(ApiContext) as ApiContextType;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [group, setGroup] = useState<Group>();
  const [discipline, setDiscipline] = useState<Discipline>();
  const [students, setStudents] = useState<Student[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const groupResponse = await groupApiService.getGroup(Number(groupId));
        const disciplineResponse = await disciplineApiService.getDiscipline(
          Number(disciplineId)
        );
        const studentsResponse = await studentApiService.getStudentsByGroup(
          Number(groupId)
        );
        setGroup(groupResponse);
        setDiscipline(disciplineResponse);
        setStudents(studentsResponse);
      } catch (error) {
        showErrorAlert(error.error);
        navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div>
        <FakeTaskAppointments />
      </div>
    );
  }

  return (
    <div className={`discipline-group-page ${theme}`}>
      <div>
        <h1>{group!.name}</h1>
        {students!.map((student) => (
          <div className="task-appointment-list" key={student.id}>
            <h4 className="task-appointment-student-name">
              {student.fullName}
            </h4>
          </div>
        ))}
      </div>
      <div className="info-container">
        <h2>
          {discipline!.name} {discipline!.year}
        </h2>
        <h4 className="status-text status-not-appointed">Не назначено</h4>
        <h4 className="status-text status-appointed">Назначено</h4>
        <h4 className="status-text status-in-progress">В процессе</h4>
        <h4 className="status-text status-finished">Выполнено</h4>
        <h4 className="status-text status-done">Зачтено</h4>
      </div>
    </div>
  );
};

export default TeacherDisciplineGroupPage;
