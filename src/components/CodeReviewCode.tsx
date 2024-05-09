import React, { useContext, useState } from "react";
import { CodeThread } from "../models/domain/CodeThread";
import "../../src/styles/code-review-code.css";
import rightArrowImg from "../images/right-arrow.png";
import downArrowImg from "../images/down-arrow.png";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import "highlight.js/styles/felipec.css";
import { CodeMessageDTO } from "../models/DTO/CodeMessageDTO.ts";

hljs.registerLanguage("c", c);

interface Props {
  canSendMessages: boolean;
  code: string;
  codeThreads: CodeThread[];
  onSendMessage: (message: CodeMessageDTO, onDone: () => void) => void;
}

const CodeReviewCode: React.FC<Props> = ({
  code,
  codeThreads,
  canSendMessages,
  onSendMessage,
}) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openThreads, setOpenThreads] = useState<number[]>([]);
  const [openInput, setOpenInput] = useState<number>(-1);
  const [highLightLightFrom, setHighLightFrom] = useState<number>(-1);
  const [highLightLightTo, setHighLightTo] = useState<number>(-1);
  const [codeMessage, setCodeMessage] = useState<string>("");
  const [beginLineNumber, setBeginLineNumber] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  codeThreads.forEach((cT) =>
    cT.messages.sort(
      (m1, m2) => Date.parse(m1.createdAt) - Date.parse(m2.createdAt)
    )
  );

  const codeSplit = code.split("\n");

  const highlightedCode = codeSplit.map(
    (line) =>
      hljs.highlight(line, {
        language: "c",
      }).value
  );

  const clickOpenThreadButton = (lineNumber: number) => {
    if (openThreads.some((oT) => oT === lineNumber))
      setOpenThreads(openThreads.filter((oT) => oT !== lineNumber));
    else setOpenThreads([lineNumber, ...openThreads]);
  };

  const onCodeMessageTextChange = (event): void => {
    setCodeMessage(event.target.value);
  };

  const onBeginLineNumberChange = (event): void => {
    const val = event.target.value;
    if (val >= 1 && val <= openInput) setBeginLineNumber(val);
  };

  const sendMessage = (endLine: number) => {
    const message: CodeMessageDTO = {
      note: codeMessage,
      endLineNumber: endLine,
      beginLineNumber: beginLineNumber,
    };
    setLoading(true);
    onSendMessage(message, () => {
      setLoading(false);
    });
  };

  const onChangeOpenInput = (line: number) => {
    if (openInput != line) {
      setOpenInput(line);
      setBeginLineNumber(line);
    } else setOpenInput(-1);
  };

  return (
    <pre>
      <code className={`code-review-code-container ${theme}`}>
        {highlightedCode.map((line, index) => (
          <div className="code-line">
            <span className="line-number">{index + 1}</span>
            <span
              className={`code-text ${
                index + 1 >= highLightLightFrom && index + 1 <= highLightLightTo
                  ? "highlighted"
                  : ""
              }`}
              onClick={() => onChangeOpenInput(index + 1)}
              key={line}
              dangerouslySetInnerHTML={{ __html: line }}
            />
            {codeThreads?.some((cT) => cT.endLineNumber === index + 1) ? (
              <button
                className="open-thread-button"
                onClick={() => clickOpenThreadButton(index + 1)}
              >
                <img
                  className="icon"
                  src={
                    openThreads.some((oT) => oT === index + 1)
                      ? downArrowImg
                      : rightArrowImg
                  }
                  alt="Add variant"
                  width="13"
                />
              </button>
            ) : null}
            {openInput === index + 1 && canSendMessages ? (
              <div className="code-message-input">
                <div className="line-input-container">
                  <span>С </span>
                  <input
                    className="line-input"
                    type="number"
                    value={beginLineNumber}
                    onChange={onBeginLineNumberChange}
                  />
                  <span> по {index + 1} </span>
                </div>
                <div className="text-input-container">
                  <textarea
                    value={codeMessage}
                    onChange={onCodeMessageTextChange}
                    className="text-input"
                  />
                  <button
                    className="send-button"
                    onClick={() => sendMessage(index + 1)}
                    disabled={loading}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            ) : null}
            {openThreads.some((oT) => oT === index + 1)
              ? codeThreads
                  .filter((cT) => cT.endLineNumber === index + 1)
                  .map((codeThread) => (
                    <div className="threads">
                      {codeThread.messages.map((threadMessage) => (
                        <div
                          className="thread"
                          onMouseEnter={() => {
                            setHighLightFrom(codeThread.beginLineNumber);
                            setHighLightTo(codeThread.endLineNumber);
                          }}
                          onMouseLeave={() => {
                            setHighLightFrom(-1);
                            setHighLightTo(-1);
                          }}
                        >
                          <p className="from">
                            [{codeThread.beginLineNumber}-
                            {codeThread.endLineNumber}
                            ]:
                          </p>
                          <p className="message">{threadMessage.message}</p>
                        </div>
                      ))}
                    </div>
                  ))
              : null}
          </div>
        ))}
      </code>
    </pre>
  );
};

export default CodeReviewCode;
