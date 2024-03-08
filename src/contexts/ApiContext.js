import React, { createContext, Component } from "react";
import UserApiService from "../services/UserApiService";
import DisciplineApiService from "../services/DisciplineApiService";
import GroupApiService from "../services/GroupApiService";
import TeacherAppointmentApiService from "../services/TeacherAppointmentApiService";
import StudentAppointmentApiService from "../services/StudentAppointmentApiService";
import TaskApiService from "../services/TaskApiService";
import TaskTestApiService from "../services/TaskTestApiService";
import TeacherApiService from "../services/TeacherApiService";
import StudentApiService from "../services/StudentApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userApiService: new UserApiService(),
      disciplineApiService: new DisciplineApiService(),
      groupApiService: new GroupApiService(),
      teacherAppointmentApiService: new TeacherAppointmentApiService(),
      studentAppointmentApiService: new StudentAppointmentApiService(),
      taskApiService: new TaskApiService(),
      taskTestApiService: new TaskTestApiService(),
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
