import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import UserForm from "../../forms/UserForm";
import { UiContext } from "../../../contexts/UiContext";
import Loader from "../../Loader";

const CreateUserPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { userApiService, groupApiService } = useContext(ApiContext);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await groupApiService.getGroups();
      setGroups(groups);
      setGroupsLoading(false);
    };
    fetchData();
  }, []);

  const createUser = async (user, role, onCreate) => {
    try {
      await userApiService
        .register(user, role)
        .then((response) =>
          showSuccessAlert(`Пользователь ${response.fullName} создан`)
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreate();
    }
  };

  if (groupsLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <UserForm groups={groups} onFormSubmit={createUser} />
    </div>
  );
};

export default CreateUserPage;
