import React, { useContext } from "react";
import { UiContext } from "../../../contexts/UiContext";
import "../../../styles/not-found-page.css";

function NotFoundPage() {
  const { theme } = useContext(UiContext);

  return (
    <div className={`error-container ${theme}`}>
      <h1 className="error-title">Страница не найдена</h1>
    </div>
  );
}

export default NotFoundPage;
