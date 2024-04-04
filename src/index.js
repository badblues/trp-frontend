import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import { UiContextProvider } from "./contexts/UiContext.tsx";
import { ApiContextProvider } from "./contexts/ApiContext.tsx";

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
