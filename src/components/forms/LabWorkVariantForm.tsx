import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import Loader from "../Loader.tsx";
import minusImg from "../../images/minus.png";
import plusImg from "../../images/plus.png";
import { LabWorkVariant } from "../../models/domain/LabWorkVariant.ts";
import { LabWorkVariantDTO } from "../../models/DTO/LabWorkVariantDTO.ts";
import { LabWork } from "../../models/domain/LabWork.ts";
import { CType } from "../../models/domain/Type.ts";
import "../../styles/form.css";

interface Props {
  edit: boolean;
  labWorkVariant?: LabWorkVariant;
  labWork: LabWork;
  onFormSubmit: (
    labWorkVariantDTO: LabWorkVariantDTO,
    onDone: () => void
  ) => void;
}

const LabWorkVariantForm: React.FC<Props> = ({
  edit,
  labWorkVariant,
  onFormSubmit,
  labWork,
}) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const testable = watch("testable");
  const { errors } = formState;
  const { theme } = useContext(UiContext) as UiContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [argsNumber, setArgsNumber] = useState<number>(1);

  const onSubmit = (data: any) => {
    setLoading(true);
    data.labWorkId = labWork.id;
    onFormSubmit(data as LabWorkVariantDTO, () => setLoading(false));
  };

  const increaseArgsNumber = () => {
    setArgsNumber(argsNumber + 1);
  };

  const decreaseArgsNumber = () => {
    if (argsNumber > 1) setArgsNumber(argsNumber - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-container ${theme}`}>
        <h1 className="form-name">
          {edit ? "ИЗМЕНЕНИЕ ЗАДАНИЯ" : "СОЗДАНИЕ ЗАДАНИЯ"}
        </h1>
        <h2 className="form-name">{labWork.title}</h2>

        <div className="form-input-container">
          <label className="form-label" htmlFor="language">
            Язык программирования:
          </label>
          <select
            id="language"
            className="form-input"
            defaultValue={edit ? labWorkVariant?.language : ""}
            {...register("language")}
          >
            <option value={"C"}>C</option>
          </select>
          <p className="form-text">{errors.language?.message as string}</p>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="title">
            Название:
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            placeholder="Название..."
            autoComplete="off"
            defaultValue={edit ? labWorkVariant?.title : ""}
            {...register("title", {
              required: "Необходимо ввести название",
            })}
          />
          <p className="form-text">{errors.title?.message as string}</p>
        </div>

        <div className="form-input-container">
          <label className="form-label" htmlFor="description">
            Описание:
          </label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="Описание..."
            autoComplete="off"
            defaultValue={edit ? labWorkVariant?.description : ""}
            {...register("description", {
              required: "Необходимо ввести описание",
            })}
          />
          <p className="form-text">{errors.description?.message as string}</p>
        </div>

        <div className="form-input-container">
          <div>
            <label className="form-label" htmlFor="description">
              Тестируемая:
            </label>
            <input
              id="testable"
              className="form-checkbox"
              type="checkbox"
              defaultChecked={edit ? labWorkVariant?.testable : false}
              {...register("testable")}
            />
          </div>
        </div>

        {testable ? (
          <>
            <div className="form-input-container">
              <label className="form-label" htmlFor="functionName">
                Название функции:
              </label>
              <input
                id="functionName"
                className="form-input"
                type="text"
                placeholder="Название функции..."
                autoComplete="off"
                defaultValue={edit ? labWorkVariant?.functionName : ""}
                {...register("functionName", {
                  required: "Необходимо ввести название функции",
                })}
              />
              <p className="form-text">
                {errors.functionName?.message as string}
              </p>
            </div>

            <div className="form-input-container">
              <label className="form-label" htmlFor="returnType">
                Тип возвращаемого значения:
              </label>
              <select
                id="returnType"
                className="form-input"
                defaultValue={edit ? labWorkVariant?.returnType : ""}
                {...register("returnType")}
              >
                <option value={CType.Int}>{CType.Int}</option>
                <option value={CType.IntArray}>{CType.IntArray}</option>
                <option value={CType.IntArrayArray}>
                  {CType.IntArrayArray}
                </option>
                <option value={CType.Double}>{CType.Double}</option>
                <option value={CType.DoubleArray}>{CType.DoubleArray}</option>
                <option value={CType.DoubleArrayArray}>
                  {CType.DoubleArrayArray}
                </option>
                <option value={CType.Char}>{CType.Char}</option>
                <option value={CType.CharArray}>{CType.CharArray}</option>
                <option value={CType.CharArrayArray}>
                  {CType.CharArrayArray}
                </option>
              </select>
              <p className="form-text">{errors.language?.message as string}</p>
            </div>

            <div className="form-input-container">
              <label className="form-label" htmlFor="returnType">
                Аргументы:
              </label>

              <div>
                {Array.from({ length: argsNumber }).map((_, index) => (
                  <div className="argument-input-container" key={index}>
                    <input
                      id={`arguments[${index}].name`}
                      className="form-input name"
                      type="text"
                      placeholder="Имя..."
                      autoComplete="off"
                      defaultValue={edit ? labWorkVariant?.functionName : ""}
                      {...register(`arguments[${index}].name`, {
                        required: "Необходимо ввести имя аргумента",
                      })}
                    />

                    <select
                      id={`arguments[${index}].type`}
                      className="form-input type"
                      defaultValue={
                        edit ? labWorkVariant?.arguments[index].type : CType.Int
                      }
                      {...register(`arguments[${index}].type`)}
                    >
                      <option value={CType.Int}>{CType.Int}</option>
                      <option value={CType.IntArray}>{CType.Int}</option>
                      <option value={CType.IntArrayArray}>{CType.Int}</option>
                      <option value={CType.Double}>{CType.Double}</option>
                      <option value={CType.DoubleArray}>
                        {CType.DoubleArray}
                      </option>
                      <option value={CType.DoubleArrayArray}>
                        {CType.DoubleArrayArray}
                      </option>
                      <option value={CType.Char}>{CType.Char}</option>
                      <option value={CType.CharArray}>{CType.CharArray}</option>
                      <option value={CType.CharArrayArray}>
                        {CType.CharArrayArray}
                      </option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="buttons-container">
              <button
                type="button"
                onClick={increaseArgsNumber}
                className="button-with-image"
              >
                <img className="icon" src={plusImg} width="13px" />
              </button>
              <button
                type="button"
                onClick={decreaseArgsNumber}
                className="button-with-image"
              >
                <img className="icon" src={minusImg} width="13px" />
              </button>
            </div>
          </>
        ) : null}

        <button disabled={loading} className="submit-button" type="submit">
          {loading ? (
            <Loader />
          ) : labWorkVariant ? (
            "ИЗМЕНИТЬ ЗАДАНИЕ"
          ) : (
            "СОЗДАТЬ ЗАДАНИЕ"
          )}
        </button>
      </div>
    </form>
  );
};

export default LabWorkVariantForm;
