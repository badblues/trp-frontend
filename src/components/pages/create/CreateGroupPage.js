import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import GroupForm from "../../forms/GroupForm";
import { UiContext } from "../../../contexts/UiContext";
import "../../../styles/create-item-page.css";

const CreateGroupPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(UiContext);
  const { groupApiService } = useContext(ApiContext);

  const createGroup = async (group, onCreated) => {
    try {
      await groupApiService
        .createGroup(group)
        .then((response) =>
          showSuccessAlert(`Группа ${response.name} создана`),
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onCreated();
    }
  };

  return (
    <div className="create-page">
      <GroupForm onFormSubmit={createGroup} />
    </div>
  );
};

export default CreateGroupPage;
