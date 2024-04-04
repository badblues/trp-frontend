import React, { useContext, useEffect, useState } from "react";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import UserForm from "../../forms/UserForm.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import Loader from "../../Loader.tsx";
import "../../../styles/create-item-page.css";
import { Role } from "../../../models/domain/Role.ts";
import { UserRegistrationDTO } from "../../../models/RegistrationDTO.ts";

const CreateUserPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext) as UiContextType;
  const { userApiService, groupApiService } = useContext(ApiContext) as ApiContextType;
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

  const createUser = async (RegistrationDTO: UserRegistrationDTO, role: Role, onCreate: () => void) => {
    try {
      console.log(RegistrationDTO);
      await userApiService
        .register(RegistrationDTO, role)
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
      <UserForm edit={false} groups={groups} onFormSubmit={createUser} />
    </div>
  );
};

export default CreateUserPage;
