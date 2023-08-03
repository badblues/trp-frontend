import React, { createContext, Component } from "react";

export const UiContext = createContext({});

export class UiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setDarkMode: this.setDarkMode.bind(this),
      darkMode: this.loadData(),
    };
  }

  setDarkMode = (darkMode) => {
    this.setState({
      setDarkMode: this.setDarkMode.bind(this),
      darkMode: darkMode,
    });
    localStorage.setItem("darkMode", darkMode)
  }

  loadData = () => localStorage.getItem("darkMode") === "true";

  render() {
    return (
      <UiContext.Provider value={this.state}>
        {this.props.children}
      </UiContext.Provider>
    );
  }
}
