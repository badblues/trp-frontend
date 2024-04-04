import React, { useContext } from "react";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import GroupForm from "../../forms/GroupForm.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/create-item-page.css";
import { GroupDTO } from "../../../models/DTO/GroupDTO.ts";

const CreateGroupPage = () => {
  const { showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { groupApiService } = useContext(ApiContext) as ApiContextType;

  const createGroup = async (groupDTO: GroupDTO, onDone: () => void) => {
    try {
      await groupApiService
        .createGroup(groupDTO)
        .then((response) =>
          showSuccessAlert(`Группа ${response.name} создана`)
        );
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
    }
  };

  return (
    <div className="create-page">
      <GroupForm edit={false} onFormSubmit={createGroup} />
    </div>
  );
};

export default CreateGroupPage;
