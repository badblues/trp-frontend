import { TeamAppointmentStatus } from "./TeamAppointmentStatus.ts";

export const StatusToTextMap = {
  [TeamAppointmentStatus.New]: "Новая",
  [TeamAppointmentStatus.InProgress]: "Выполняется",
  [TeamAppointmentStatus.Testing]: "Выполняется",
  [TeamAppointmentStatus.Tested]: "Протестирована",
  [TeamAppointmentStatus.SentToCodeReview]: "Отправлена на проверку",
  [TeamAppointmentStatus.CodeReview]: "На проверке",
  [TeamAppointmentStatus.WaitingForGrade]: "Ждет оценки",
  [TeamAppointmentStatus.SentToRework]: "Возвращена",
  [TeamAppointmentStatus.Graded]: "Выполнена",
};
