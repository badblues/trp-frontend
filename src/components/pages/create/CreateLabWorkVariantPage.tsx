import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import LabWorkVariantForm from "../../forms/LabWorkVariantForm.tsx";
import Loader from "../../Loader.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/create-item-page.css";
import { LabWork } from "../../../models/domain/LabWork.ts";
import { LabWorkVariantDTO } from "../../../models/DTO/LabWorkVariantDTO.ts";

const CreateLabWorkVariantPage = () => {
  const { labWorkId } = useParams();
  const navigate = useNavigate();
  const { showSuccessAlert, showErrorAlert } = useContext(
    UiContext
  ) as UiContextType;
  const { labWorkVariantApiService, labWorkApiService } = useContext(
    ApiContext
  ) as ApiContextType;
  const [labWork, setLabWork] = useState<LabWork>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const labWorkResponse = await labWorkApiService.getLabWork(
          Number(labWorkId)
        );
        setLabWork(labWorkResponse);
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createLabWorkVariant = async (
    labWorkVariantDTO: LabWorkVariantDTO,
    onDone: () => void
  ) => {
    try {
      if (labWorkVariantDTO.testable) {
        await labWorkVariantApiService
          .createLabWorkVariantTestable(labWorkVariantDTO)
          .then((response) =>
            showSuccessAlert(`Задание ${response.title} создано`)
          );
      } else {
        await labWorkVariantApiService
          .createLabWorkVariantNonTestable(labWorkVariantDTO)
          .then((response) =>
            showSuccessAlert(`Задание ${response.title} создано`)
          );
      }
    } catch (error) {
      showErrorAlert(error.error);
    } finally {
      onDone();
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
      <LabWorkVariantForm
        edit={false}
        onFormSubmit={createLabWorkVariant}
        labWork={labWork!}
      />
    </div>
  );
};

export default CreateLabWorkVariantPage;
