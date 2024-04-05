import React, { createContext, Component, ReactNode } from "react";
import UserApiService from "../services/UserApiService.ts";
import DisciplineApiService from "../services/DisciplineApiService.ts";
import GroupApiService from "../services/GroupApiService.ts";
import TeacherAppointmentApiService from "../services/TeacherAppointmentApiService.ts";
import TeamAppointmentApiService from "../services/TeamAppointmentApiService.ts";
import LabWorkApiService from "../services/LabWorkApiService.ts";
import LabWorkVariantApiService from "../services/LabWorkVariantApiService.ts";
import LabWorkVariantTestApiService from "../services/LabWorkVariantTestApiService.ts";
import TeacherApiService from "../services/TeacherApiService.ts";
import StudentApiService from "../services/StudentApiService.ts";
import TeamApiService from "../services/TeamApiService.ts";

export interface ApiContextType {
  userApiService: UserApiService;
  disciplineApiService: DisciplineApiService;
  groupApiService: GroupApiService;
  teacherAppointmentApiService: TeacherAppointmentApiService;
  teamAppointmentApiService: TeamAppointmentApiService;
  teamApiService: TeamApiService;
  labWorkApiService: LabWorkApiService;
  labWorkVariantApiService: LabWorkVariantApiService;
  labWorkVariantTestApiService: LabWorkVariantTestApiService;
  teacherApiService: TeacherApiService;
  studentApiService: StudentApiService;
}

interface ApiContextProviderProps {
  children: ReactNode;
}

export const ApiContext = createContext<ApiContextType | null>(null);

export class ApiContextProvider extends Component<
  ApiContextProviderProps,
  ApiContextType
> {
  constructor(props: ApiContextProviderProps) {
    super(props);
    this.state = {
      userApiService: new UserApiService(),
      disciplineApiService: new DisciplineApiService(),
      groupApiService: new GroupApiService(),
      teacherAppointmentApiService: new TeacherAppointmentApiService(),
      teamAppointmentApiService: new TeamAppointmentApiService(),
      labWorkApiService: new LabWorkApiService(),
      labWorkVariantApiService: new LabWorkVariantApiService(),
      teamApiService: new TeamApiService(),
      labWorkVariantTestApiService: new LabWorkVariantTestApiService(),
      teacherApiService: new TeacherApiService(),
      studentApiService: new StudentApiService(),
    };
  }

  render() {
    return (
      <ApiContext.Provider value={this.state}>
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}
