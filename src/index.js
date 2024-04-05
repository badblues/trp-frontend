import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import { UiContextProvider } from "./contexts/UiContext.tsx";
import { ApiContextProvider } from "./contexts/ApiContext.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UiContextProvider>
    <UserContextProvider>
      <ApiContextProvider>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DndProvider>
      </ApiContextProvider>
    </UserContextProvider>
  </UiContextProvider>
);
