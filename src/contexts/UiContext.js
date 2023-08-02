import React, { createContext, Component } from "react";

export const UiContext = createContext({});

 //TODO bad class bad bad code

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

  loadData = () => {
    const data = localStorage.getItem("darkMode");
    if (data != null) {
      const darkMode = data === "true" ? true : false;
      return darkMode;
    } else {
      localStorage.setItem("darkMode", false);
      return false;
    }
  };

  render() {
    return (
      <UiContext.Provider value={this.state}>
        {this.props.children}
      </UiContext.Provider>
    );
  }
}
