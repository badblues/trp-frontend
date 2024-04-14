import React, { useContext } from "react";
import "../styles/confirmation-popup.css";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";

interface Props {
  message: string;
  isOpen: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

const ConfirmationPopup: React.FC<Props> = ({
  message,
  isOpen,
  onContinue,
  onCancel,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;

  if (!isOpen) return null;

  return (
    <div className={`popup-container ${theme}`}>
      <div className="popup-content">
        <h1 className="message">{message}</h1>
        <div className="buttons-container">
          <button className="continue-button" onClick={onContinue}>
            Продолжить
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
