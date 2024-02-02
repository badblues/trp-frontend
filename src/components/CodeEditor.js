import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from "@codemirror/lang-java";
import { dracula } from '@uiw/codemirror-theme-dracula';
import "./CodeEditor.css";

const CodeEditor = ({ solutionCode, onCodeChange }) => {
  const [code, setCode] = useState(solutionCode);

  const handleChange = useCallback((val) => {
    setCode(val);
    onCodeChange(val);
  }, []);

  return (
    <div className='editor-container'>
      <CodeMirror
        value={code}
        onChange={handleChange}
        theme={dracula}
        height='400px'
        width='600px'
        extensions={[java()]}
      />
    </div>
  );
};

export default CodeEditor;
