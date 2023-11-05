import React, { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
import { UiContext } from "../contexts/UiContext";
import { ApiContext } from "../contexts/ApiContext";
import "./Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(UiContext);
  const { studentApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await studentApiService.getStudents();
      setStudents(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="students-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="students-container">
        <label className={`students-caption ${darkMode ? "dark-mode" : ""}`}>
          Студенты:
        </label>
        {students.map((student) => (
          <div
            className={`student-item ${darkMode ? "dark-mode" : ""}`}
            key={student.id}
          >
            <p>
              {student.group.name}
            </p>
            <p>
              {student.fullName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Students;
