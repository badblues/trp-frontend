import React, { createContext, Component } from "react";
import { toast, Flip } from "react-toastify";

export const UiContext = createContext({});

export class UiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setDarkMode: this.setDarkMode.bind(this),
      darkMode: this.loadData(),
      showSuccessAlert: this.showSuccessAlert.bind(this),
      showErrorAlert: this.showErrorAlert.bind(this),
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

  showSuccessAlert = (text) => {
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${this.state.darkMode ? "dark" : "light"}`,
      transition: Flip,
      });
  }

  showErrorAlert = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${this.state.darkMode ? "dark" : "light"}`,
      transition: Flip,
      });;
  }

  render() {
    return (
      <UiContext.Provider value={this.state}>
        {this.props.children}
      </UiContext.Provider>
    );
  }
}
