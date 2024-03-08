import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { UiContextProvider } from "./contexts/UiContext";
import { ApiContextProvider } from "./contexts/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UiContextProvider>
    <UserContextProvider>
      <ApiContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiContextProvider>
    </UserContextProvider>
  </UiContextProvider>,
);
