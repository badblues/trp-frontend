import React, { useContext, useEffect } from "react";
import Disciplines from "./Disciplines";
import "./MainPage.css";
import { ApiContext } from "../contexts/ApiContext";
import { useState } from "react";

const StudentMainPage = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const { studentApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await studentApiService.getDisciplines();
      setDisciplines(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="main-page-container">
      <Disciplines className="disciplines" disciplines={disciplines} />
    </div>
  );
};

export default StudentMainPage;
