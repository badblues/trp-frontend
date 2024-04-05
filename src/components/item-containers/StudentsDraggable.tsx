import React, { useContext } from "react";
import { Student } from "../../models/domain/Student";
import { useDrag } from "react-dnd";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/item-list.css";

interface Props {
  students: Student[];
}

interface DraggableStudentProps {
  student: Student;
}

const DraggableStudent: React.FC<DraggableStudentProps> = ({ student }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "student",
    item: { student },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`item ${isDragging ? "dragged" : ""}`}>
      <p>{student.fullName} {student.id}</p>
    </div>
  );
};

const StudentsDraggable: React.FC<Props> = ({ students }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`item-list ${theme}`}>
      {students!.map((student) => (
        <DraggableStudent key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentsDraggable;
