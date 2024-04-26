import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/grade-form.css";
import { GradeDTO } from "../../models/DTO/GradeDTO.ts";
import { Student } from "../../models/domain/Student.ts";

interface Props {
  students: Student[];
  maxGrade: number;
  onFormSubmit: (gradeDTO: GradeDTO[], onDone: () => void) => void;
}

const GradeForm: React.FC<Props> = ({ students, onFormSubmit, maxGrade }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [sameGrade, setSameGrade] = useState<boolean>(true);

  const onSubmit = (data: any) => {
    let gradeDTOs: GradeDTO[];
    if (sameGrade) {
      gradeDTOs = students.map((s) => ({
        studentId: s.id,
        grade: data.grade,
      }));
    } else {
      gradeDTOs = students.map((s, index) => ({
        studentId: s.id,
        grade: data.grade[index],
      }));
    }
    setLoading(true);
    console.log(gradeDTOs);
    onFormSubmit(gradeDTOs, () => {
      setLoading(false);
    });
  };

  if (sameGrade) {
    return (
      <div className="form-upper-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`grade-form-container ${theme}`}>
            <div className="form-input-container">
              <label htmlFor="gradeInput" className="form-label">
                Балл
              </label>
              <input
                className="form-input"
                type="number"
                defaultValue={maxGrade}
                max={maxGrade}
                min={0}
                {...register("grade", {
                  required: "Необходимо ввести название группы",
                  max: maxGrade,
                  min: 0,
                })}
              ></input>
            </div>

            <button disabled={loading} className="submit-button" type="submit">
              {loading ? <Loader /> : "Принять"}
            </button>
          </div>
        </form>
        <div>
          <label htmlFor="sameGradeInput">Одна оценка для всех</label>
          <input
            name="sameGradeInput"
            type="checkbox"
            checked={sameGrade}
            onClick={() => {
              setSameGrade(!sameGrade);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="form-upper-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grade-form-container ${theme}`}>
          {students.map((student, index) => (
            <div className="form-input-container">
              <label htmlFor="name" className="form-label">
                {student.fullName}
              </label>
              <input
                id="name"
                className="form-input"
                type="number"
                defaultValue={maxGrade}
                max={maxGrade}
                min={0}
                {...register(`grade[${index}]`, {
                  required: "Необходимо ввести название группы",
                  max: maxGrade,
                  min: 0,
                })}
              />
              <p className="form-text">{errors.name?.message as string}</p>
            </div>
          ))}

          <button disabled={loading} className="submit-button" type="submit">
            {loading ? <Loader /> : "Принять"}
          </button>
        </div>
      </form>
      <div>
        <label htmlFor="sameGradeInput">Одна оценка для всех</label>
        <input
          name="sameGradeInput"
          type="checkbox"
          checked={sameGrade}
          onClick={() => {
            setSameGrade(!sameGrade);
          }}
        />
      </div>
    </div>
  );
};

export default GradeForm;
