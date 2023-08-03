import React, { useContext, useEffect } from "react";
import "./MainPage.css";
import Disciplines from "./Disciplines";
import { ApiContext } from "../contexts/ApiContext";
import { useState } from "react";

const AdminMainPage = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const { adminApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminApiService.getDisciplines();
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

export default AdminMainPage;
