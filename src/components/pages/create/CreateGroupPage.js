import React, { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import GroupForm from "../../forms/GroupForm";

const CreateGroupPage = () => {
  const { groupApiService } = useContext(ApiContext);

  const createGroup = async (group, onCreated) => {
    try {
      await groupApiService
        .createGroup(group)
        .then((response) => alert(`Success, ${response.name} created`));
    } catch (error) {
      alert(error.error);
    } finally {
      onCreated();
    }
  };

  return (
    <div>
      <GroupForm onFormSubmit={createGroup}/>
    </div>
  );
};

export default CreateGroupPage;
