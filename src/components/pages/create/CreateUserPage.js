import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import UserForm from "../../forms/UserForm";

const CreateUserPage = () => {
  const { userApiService } = useContext(ApiContext);

  const createUser = async (user, role, onCreate) => {
    try {
      await userApiService
        .register(user, role)
        .then((response) => alert(`Success, ${response.username} created`));
    } catch (error) {
      alert(error.error);
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
