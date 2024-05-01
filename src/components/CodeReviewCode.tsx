import React, { useContext, useState } from "react";
import { CodeThread } from "../models/domain/CodeThread";
import { Role } from "../models/domain/Role.ts";
import "../../src/styles/code-review-code.css";
import plusImg from "../images/plus.png";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import "highlight.js/styles/felipec.css";

hljs.registerLanguage("c", c);

interface Props {
  code: string;
  codeThreads: CodeThread[];
}

const CodeReviewCode: React.FC<Props> = ({ code, codeThreads }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openThreads, setOpenThreads] = useState<number[]>([]);
  const [openInput, setOpenInput] = useState<number>();
  const [highLightLightFrom, setHighLightFrom] = useState<number>(-1);
  const [highLightLightTo, setHighLightTo] = useState<number>(-1);

  //TEMPORARY
  codeThreads = [
    {
      messages: [
        {
          message: "ты дебил",
          user: {
            id: 1,
            fullName: "teacher",
            username: "user",
            role: Role.Teacher,
          },
        },
        {
          message: "сам дебил",
          user: {
            id: 1,
            fullName: "student",
            username: "user",
            role: Role.Student,
          },
        },
      ],
      beginLineNumber: 1,
      endLineNumber: 1,
    },
    {
      messages: [
        {
          message: "3 строка хуета",
          user: {
            id: 1,
            fullName: "teacher",
            username: "user",
            role: Role.Teacher,
          },
        },
      ],
      beginLineNumber: 3,
      endLineNumber: 3,
    },
    {
      messages: [
        {
          message: "коммент к 2-3 строке",
          user: {
            id: 1,
            fullName: "teacher",
            username: "user",
            role: Role.Teacher,
          },
        },
      ],
      beginLineNumber: 2,
      endLineNumber: 3,
    },
  ];
  //TEMPORARY
  code =
    "int add(int a, int b) {\n   printf('asdfasdf')\n   printf('asdfasdf')\n   printf('asdfasdf')\n   return a + b;\n}";
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

  return (
    <pre>
      <code className={`code-container ${theme}`}>
        {highlightedCode.map((line, index) => (
          <div className="code-line">
            <span className="line-number">{index + 1}</span>
            <span
              className={`code-text ${
                index + 1 >= highLightLightFrom && index + 1 <= highLightLightTo
                  ? "highlighted"
                  : ""
              }`}
              onClick={() => {
                if (openInput != index + 1) setOpenInput(index + 1);
                else setOpenInput(-1);
              }}
              key={line}
              dangerouslySetInnerHTML={{ __html: line }}
            />
            {codeThreads.some((cT) => cT.endLineNumber === index + 1) ? (
              <button
                className="open-thread-button"
                onClick={() => clickOpenThreadButton(index + 1)}
              >
                <img
                  className="icon"
                  src={plusImg}
                  alt="Add variant"
                  width="13"
                />
              </button>
            ) : null}
            {openInput === index + 1 ? (
              <div className="code-message-input">
                <div>
                  <span>С </span>
                  <input
                    type="number"
                    min={1}
                    max={index + 1}
                    defaultValue={index + 1}
                  />
                  <span> по {index + 1} </span>
                </div>
                <div>
                  <input type="text" />
                  <button>Отправить</button>
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
                            {threadMessage.user.fullName}[
                            {codeThread.beginLineNumber}-
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
