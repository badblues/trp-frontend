import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext, ApiContextType } from "../../../contexts/ApiContext.tsx";
import Disciplines from "../../item-containers/Disciplines.tsx";
import FakeItemsList from "../../loaders/FakeItemsList.tsx";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/teacher-main-page.css";
import { Discipline } from "../../../models/domain/Discipline.ts";
import VariantsForReview, {
  VariantForReview,
} from "../../VariantsForReview.tsx";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";

const TeacherMainPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as UserContextType;
  const {
    disciplineApiService,
    teacherAppointmentApiService,
    teamAppointmentApiService,
  } = useContext(ApiContext) as ApiContextType;
  const { showErrorAlert } = useContext(UiContext) as UiContextType;
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [variants, setVariants] = useState<VariantForReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const disciplinesResponse = await disciplineApiService.getDisciplines();
        const teacherAppointmentsResponse =
          await teacherAppointmentApiService.getAppointmentsByTeacher(user!.id);
        const variants = await Promise.all(
          teacherAppointmentsResponse.map(async (tA) => {
            const teamAppointments =
              await teamAppointmentApiService.getTeamAppointmentsByDisciplineAndGroup(
                tA.discipline.id,
                tA.group.id
              );
            return teamAppointments.map((teamAppointment) => ({
              discipline: tA.discipline,
              group: tA.group,
              teamAppointment: teamAppointment,
            }));
          })
        );
        setVariants(variants.flat());
        setDisciplines(disciplinesResponse);
      } catch (error) {
        showErrorAlert(error.error);
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDiscipline = (discipline) => {
    navigate(`/disciplines/${discipline.id}`);
  };

  const selectVariant = (variant: VariantForReview) => {
    navigate(
      `/disciplines/${variant.discipline.id}/groups/${variant.group.id}/team-appointments/${variant.teamAppointment.id}/code-review/${variant.teamAppointment.codeReviewIds[0]}`
    );
  };

  return (
    <div className="main-page-container">
      <div className="main-page-item">
        {loading ? (
          <FakeItemsList />
        ) : (
          <VariantsForReview
            variants={variants}
            onVariantClick={selectVariant}
          />
        )}
      </div>
      {loading ? (
        <FakeItemsList />
      ) : (
        <div className="main-page-item">
          <Disciplines
            disciplines={disciplines}
            onDisciplineSelect={selectDiscipline}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherMainPage;
