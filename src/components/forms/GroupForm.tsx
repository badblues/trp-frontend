import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/form.css";
import { Group } from "../../models/domain/Group.ts";
import { GroupDTO } from "../../models/DTO/GroupDTO.ts";

interface Props {
  edit: boolean;
  group?: Group;
  onFormSubmit: (groupDTO: GroupDTO, onDone: () => void) => void;
}

const GroupForm: React.FC<Props> = ({ edit, group, onFormSubmit }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    onFormSubmit(data as GroupDTO, () => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {edit ? "ИЗМЕНЕНИЕ ГРУППЫ" : "СОЗДАНИЕ ГРУППЫ"}
        </h1>
        <div className="form-input-container">
          <label className="form-label" htmlFor="name">
            Название группы
          </label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={edit ? group?.name : ""}
            {...register("name", {
              required: "Необходимо ввести название группы",
            })}
          />
          <p className="form-text">{errors.name?.message as string}</p>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? <Loader /> : edit ? "ИЗМЕНИТЬ ГРУППУ" : "СОЗДАТЬ ГРУППУ"}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
