import React, { createContext, Component } from "react";
import UserApiService from "../services/UserApiService";
import DisciplineApiService from "../services/DisciplineApiService";
import GroupApiService from "../services/GroupApiService";
import AppointmentApiService from "../services/AppointmentApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userApiService: new UserApiService(),
      disciplineApiService: new DisciplineApiService(),
      groupApiService: new GroupApiService(),
      appointmentApiService: new AppointmentApiService(),
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
