import React, { useContext, useState, useEffect } from "react";
import Loader from "../../Loader";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../contexts/UserContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Roles } from "../../../models/Roles";
import "./GroupPage.css";
import AdminGroupPage from "./AdminGroupPage";
import TeacherGroupPage from "./TeacherGroupPage";


const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { groupApiService } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const groupResponse = await groupApiService.getGroup(id);
      setGroup(groupResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const pages = {
    [Roles.Admin]: AdminGroupPage,
    [Roles.Teacher]: TeacherGroupPage,
  };

  const Page = pages[user.role] || null;

  if (loading) {
    return (
      <div className="disciplines-container">
        <Loader />
      </div>
    );
  }

  return (
    <>{Page && <Page group={ group } />} </>
  );
}

export default GroupPage;