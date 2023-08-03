import React, { createContext, Component } from "react";
import AdminApiService from "../services/AdminApiService";
import StudentApiService from "../services/StudentApiService";
import ProfessorApiService from "../services/ProfessorApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component { 

  constructor(props) {
    super(props);
    this.adminApiService = new AdminApiService();
    this.studentApiService = new StudentApiService();
    this.professorApiService = new ProfessorApiService();
    this.state = {
      adminApiService: this.adminApiService,
      studentApiService: this.studentApiService,
      professorApiService: this.professorApiService
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
