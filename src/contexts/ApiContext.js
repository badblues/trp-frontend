import React, { createContext, Component } from "react";
import UserApiService from "../services/UserApiService";
import DisciplinesApiService from "../services/DisciplinesApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.userApiService = new UserApiService();
    this.disciplinesApiService = new DisciplinesApiService();
    this.state = {
      userApiService: this.userApiService,
      disciplinesApiService: this.disciplinesApiService
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
