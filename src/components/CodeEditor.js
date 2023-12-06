import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from "@codemirror/lang-java";

import { dracula } from '@uiw/codemirror-theme-dracula';

const CodeEditor = ({ onSave }) => {
  const [code, setCode] = useState('');

  const handleChange = useCallback((val, viewUpdate) => {
    setCode(val);
  }, []);

  const handleSave = () => {
    onSave(code);
  };

  return (
    <div className='editor-container'>
      <CodeMirror
        value={code}
        onChange={ handleChange}
        height='600px'
        width='800px'
        theme={dracula}
        extensions={[java()]}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CodeEditor;
