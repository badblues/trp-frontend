import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import UserForm from "../../forms/UserForm";
import { UiContext } from "../../../contexts/UiContext";

const CreateUserPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { userApiService } = useContext(ApiContext);

  const createUser = async (user, role, onCreate) => {
    try {
      await userApiService
        .register(user, role)
        .then((response) => showSuccessAlert(`Пользователь ${response.fullName} создан`));
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreate();
    }
  };

  return (
    <div>
      <UserForm onFormSubmit={createUser}/>
    </div>
  );
};

export default CreateUserPage;
