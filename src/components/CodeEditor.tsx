import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

interface Props {
  solutionCode: string;
  onCodeChange: (code: string) => void;
}

const CodeEditor = ({ solutionCode, onCodeChange }) => {
  const [code, setCode] = useState(solutionCode);

  const handleChange = useCallback((val) => {
    setCode(val);
    onCodeChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        onChange={handleChange}
        theme={dracula}
        height="400px"
        extensions={[java()]}
      />
    </div>
  );
};

export default CodeEditor;
