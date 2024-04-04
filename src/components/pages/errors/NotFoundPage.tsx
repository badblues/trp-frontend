import React, { useContext } from "react";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import "../../../styles/not-found-page.css";

function NotFoundPage() {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`error-container ${theme}`}>
      <h1 className="error-title">Страница не найдена</h1>
    </div>
  );
}

export default NotFoundPage;
