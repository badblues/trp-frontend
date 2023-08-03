import React, { createContext, Component } from "react";
import AdminApiService from "../services/AdminApiService";

export const ApiContext = createContext({});

export class ApiContextProvider extends Component { 

  constructor(props) {
    super(props);
    this.adminApiService = new AdminApiService();
    this.state = {
      adminApiService: this.adminApiService,
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
