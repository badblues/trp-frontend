import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import "../../styles/test-form.css";
import { LabWorkVariantTest } from "../../models/domain/LabWorkVariantTest.ts";
import { LabWorkVariantTestDTO } from "../../models/DTO/LabWorkVariantTestDTO.ts";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";

interface Props {
  edit: boolean;
  test?: LabWorkVariantTest;
  labWorkVariant: LabWorkVariant;
  onFormSubmit: (testDTO: LabWorkVariantTestDTO, onDone: () => void) => void;
  inputRegex: string;
  outputRegex: string;
}

const TestForm: React.FC<Props> = ({
  edit,
  test,
  onFormSubmit,
  labWorkVariant,
  inputRegex,
  outputRegex,
}) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState(false);

  const onDone = () => {
    setLoading(false);
  };

  const onSubmit = (data: any) => {
    if (!RegExp(inputRegex).test(data.input)) {
      showErrorAlert("Некорректные входные данные");
      return;
    }
    if (!RegExp(outputRegex).test(data.output)) {
      showErrorAlert("Некорректные выходные данные");
      return;
    }
    setLoading(true);
    data.labWorkVariantId = labWorkVariant.id;
    onFormSubmit(data as LabWorkVariantTestDTO, onDone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`test-form ${theme}`}>
        <div className="test-input-container">
          <input
            className="test-form-input"
            id="input"
            type="text"
            placeholder="Вход..."
            autoComplete="off"
            defaultValue={edit ? test?.input : ""}
            {...register("input", {
              required: "Необходимо ввести входные данные",
            })}
          />
          <label>{errors.input?.message as string}</label>
        </div>

        <div className="test-input-container">
          <input
            className="test-form-input"
            id="output"
            type="text"
            placeholder="Выход..."
            autoComplete="off"
            defaultValue={edit ? test?.output : ""}
            {...register("output", {
              required: "Необходимо ввести выходные данные",
            })}
          />
          <label>{errors.output?.message as string}</label>
        </div>

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? <Loader /> : edit ? "ИЗМЕНИТЬ" : "ДОБАВИТЬ"}
        </button>
      </div>
    </form>
  );
};

export default TestForm;
