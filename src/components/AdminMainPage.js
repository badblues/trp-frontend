import React, { useContext, useEffect } from "react";
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
    <>
      <Disciplines disciplines={disciplines} />
    </>
  );
};

export default AdminMainPage;
