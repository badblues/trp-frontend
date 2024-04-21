import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UiContext, UiContextType } from "../../../contexts/UiContext.tsx";
import { CodeReview } from "../../../models/domain/CodeReview.ts";
import { Role } from "../../../models/domain/Role.ts";
import "../../../styles/code-review-page.css";
import ReactCodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { java } from "@codemirror/lang-java";
import {
  UserContext,
  UserContextType,
} from "../../../contexts/UserContext.tsx";

const CodeReviewPage = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const { codeReviewId } = useParams();
  const { theme, showErrorAlert } = useContext(UiContext) as UiContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const [codeReview, setCodeReview] = useState<CodeReview>();
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setCodeReview({
          id: 1,
          code: "CODEJOIJDEI\n CODEJOIJDEI\n CODEJOIJDEI\n CODEJOIJDEI\n CODEJOIJDEI\n",
          taskMessages: [
            {
              message: "Hello",
              roleType: Role.Student,
            },
            {
              message: "Hellor there ",
              roleType: Role.Teacher,
            },
          ],
          codeThreads: [],
        });
      } catch (error) {
        showErrorAlert(error.error);
        if (error.status === 404) navigate("/not-found");
      }
    })().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMessageTextChange = (event): void => {
    setMessageText(event.target.value);
  };

  if (loading) {
  }

  return (
    <div className={`code-review-page ${theme}`}>
      <div className="chat-container">
        <div className="chat-messages">
          {codeReview?.taskMessages.map((taskMessage) => (
            <p
              className={`message ${
                (taskMessage.roleType === Role.Student &&
                  user?.role == Role.Student) ||
                ((taskMessage.roleType === Role.Teacher ||
                  taskMessage.roleType == Role.SeniorTeacher) &&
                  (user?.role === Role.Teacher ||
                    user?.role == Role.SeniorTeacher))
                  ? "right"
                  : "left"
              }`}
            >
              {taskMessage.message}
            </p>
          ))}
        </div>
        <div className="send-message-container">
          <textarea
            className="message-input"
            content={messageText}
            onChange={onMessageTextChange}
          ></textarea>
          <button className="send-message-button">Отправить</button>
        </div>
      </div>
      <div className="code-container">
        <ReactCodeMirror
          value={codeReview?.code}
          editable={false}
          theme={dracula}
          height="400px"
          width="600px"
          extensions={[java()]}
        />
      </div>
    </div>
  );
};

export default CodeReviewPage;
