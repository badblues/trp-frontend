import React, { createContext, Component, ReactNode } from "react";
import { toast, Flip } from "react-toastify";

export interface UiContextType {
  setTheme: (theme: string) => void;
  theme: string | null;
  showSuccessAlert: (text: string) => void;
  showErrorAlert: (text: string) => void;
}

export const UiContext = createContext<UiContextType | null>(null);

interface UiContextProviderProps {
  children: ReactNode;
}

export class UiContextProvider extends Component<
  UiContextProviderProps,
  UiContextType
> {
  constructor(props: UiContextProviderProps) {
    super(props);
    this.state = {
      setTheme: this.setTheme.bind(this),
      theme: this.loadData(),
      showSuccessAlert: this.showSuccessAlert.bind(this),
      showErrorAlert: this.showErrorAlert.bind(this),
    };
  }

  setTheme = (theme: string) => {
    this.setState({
      setTheme: this.setTheme.bind(this),
      theme: theme,
    });
    localStorage.setItem("theme", theme);
  };

  loadData = () => localStorage.getItem("theme");

  showSuccessAlert = (text: string) => {
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

  showErrorAlert = (text: string) => {
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

export default UiContextProvider;
