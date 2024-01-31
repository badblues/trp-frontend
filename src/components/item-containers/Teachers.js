import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { UiContext } from "../../contexts/UiContext";
import { ApiContext } from "../../contexts/ApiContext";
import "./Teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(UiContext);
  const { teacherApiService } = useContext(ApiContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await teacherApiService.getTeachers();
      setTeachers(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="teachers-container">
        <label className={`teachers-caption ${darkMode ? "dark-mode" : ""}`}>
          Преподаватели:
        </label>
        {teachers.map((teacher) => (
          <div
            className={`teacher-item ${darkMode ? "dark-mode" : ""}`}
            onClick={() => navigate(`/teachers/${teacher.id}`)}
            key={teacher.id}
          >
            <p>{teacher.fullName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teachers;
