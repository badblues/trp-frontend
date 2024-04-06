import React, { useContext, useState } from "react";
import "../styles/page-with-tabs.css";
import { UiContext, UiContextType } from "../contexts/UiContext.tsx";

interface Props {
  children?: React.ReactNode[];
  titles?: string[];
}

const PageWithTabs: React.FC<Props> = ({ children, titles }) => {
  const { theme } = useContext(UiContext) as UiContextType;
  const [openChildIndex, setOpenChildIndex] = useState<number>(0);

  return (
    <div className={`page-with-tabs ${theme}`}>
      <div className="switch-panel">
        {titles?.map((title, index) => (
          <button
            key={index}
            className={`switch-panel-button ${
              openChildIndex === index ? "open" : ""
            }`}
            disabled={openChildIndex === index}
            onClick={() => {
              setOpenChildIndex(index);
            }}
          >
            {title}
          </button>
        ))}
      </div>
      {children?.map((child, index) => (
        <div key={index}>{openChildIndex === index ? child : null}</div>
      ))}
    </div>
  );
};

export default PageWithTabs;
