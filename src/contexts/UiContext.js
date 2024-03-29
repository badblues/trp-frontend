import React, { createContext, Component } from "react";
import { toast, Flip } from "react-toastify";

export const UiContext = createContext({});

export class UiContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTheme: this.setTheme.bind(this),
      theme: this.loadData(),
      showSuccessAlert: this.showSuccessAlert.bind(this),
      showErrorAlert: this.showErrorAlert.bind(this),
    };
  }

  setTheme = (theme) => {
    this.setState({
      setTheme: this.setTheme.bind(this),
      theme: theme,
    });
    localStorage.setItem("theme", theme);
  };

  loadData = () => localStorage.getItem("theme");

  showSuccessAlert = (text) => {
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${this.state.theme ? "dark" : "light"}`,
      transition: Flip,
    });
  };

  showErrorAlert = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${this.state.theme ? "dark" : "light"}`,
      transition: Flip,
    });
  };

  render() {
    return (
      <UiContext.Provider value={this.state}>
        {this.props.children}
      </UiContext.Provider>
    );
  }
}
