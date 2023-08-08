import React, { createContext, Component } from "react";
import UserApiService from "../services/UserApiService";
import DisciplineApiService from "../services/DisciplineApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.userApiService = new UserApiService();
    this.disciplineApiService = new DisciplineApiService();
    this.state = {
      userApiService: this.userApiService,
      disciplineApiService: this.disciplineApiService
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
