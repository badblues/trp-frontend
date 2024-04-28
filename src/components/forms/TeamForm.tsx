import React, { useContext, useState } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import { TeamDTO } from "../../models/DTO/TeamDTO.ts";
import { useDrop } from "react-dnd";
import binImg from "../../images/bin.png";
import { Student } from "../../models/domain/Student.ts";
import "../../styles/team-form.css";
import { Discipline } from "../../models/domain/Discipline.ts";

interface Props {
  discipline: Discipline;
  onFormSubmit: (teamDTO: TeamDTO, onDone: () => void) => void;
}

interface StudentContainer {
  student: Student;
}

const TeamForm: React.FC<Props> = ({ discipline, onFormSubmit }) => {
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [leaderId, setLeaderId] = useState<number>();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "student",
    drop: (student: StudentContainer) => {
      if (students.length === 0) {
        setLeaderId(student.student.id);
      }
      if (!students.some((s) => s.id === student.student.id))
        setStudents([student.student, ...students]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const onDone = () => {
    setLoading(false);
    setStudents([]);
  };

  const onSubmit = () => {
    if (students.length === 0) {
      showErrorAlert("Нет студентов для создания бригады");
      return;
    }
    setLoading(true);
    const teamDTO: TeamDTO = {
      disciplineId: discipline.id,
      groupId: students[0].group.id,
      studentIds: students.map((s) => s.id),
      leaderId: leaderId!,
    };
    onFormSubmit(teamDTO, onDone);
  };

  const changeLeader = (studentId: number) => {
    setLeaderId(studentId);
  };

  const removeStudent = (student: Student) => {
    setStudents(students.filter((s) => s.id != student.id));
  };

  return (
    <div ref={drop} className={`team-form-container ${theme}`}>
      <h4>ПЕРЕТАЩИТЕ СТУДЕНТОВ</h4>
      {students.map((student, index) => (
        <div key={index} className="student-container">
          <button
            className="remove-student-button"
            onClick={() => {
              removeStudent(student);
            }}
          >
            <img className="icon" src={binImg} alt="Delete" width="13" />
          </button>
          <p className="student-name">
            {student.fullName}
            <input
              type="checkbox"
              checked={leaderId === student.id}
              onClick={() => {
                changeLeader(student.id);
              }}
            />
            {leaderId === student.id ? "Лидер" : null}
          </p>
        </div>
      ))}
      <button
        className="create-team-button"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <Loader /> : "СОЗДАТЬ БРИГАДУ"}
      </button>
    </div>
  );
};

export default TeamForm;
