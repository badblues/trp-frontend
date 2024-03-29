import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import UserForm from "../../forms/UserForm";
import { UiContext } from "../../../contexts/UiContext";
import Loader from "../../Loader";
import "../../../styles/create-item-page.css";

const CreateUserPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { userApiService, groupApiService } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const groupsResponse = await groupApiService.getGroups();
        setGroups(groupsResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="create-page">
      <UserForm groups={groups} onFormSubmit={createUser} />
    </div>
  );
};

export default CreateUserPage;
