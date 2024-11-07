import React, { useState } from "react";
import convert from "node-html-to-jsx";
import MonacoEditor from "react-monaco-editor";

const Monaco = () => {
  let [code, setCode] =
    useState<string>(`<h1 class="text-slate-900 bg-green-900">Form Pendaftaran</h1>
  <form class="flex flex-col" action="">
    <label for="fname" class="text-slate-900">First name:</label>
    <input type="text" id="fname" name="fname" value="John">
    <label for="lname" class="text-slate-900">Last name:</label>
    <input type="text" id="lname" name="lname" value="Doe">
    <input type="submit" class="bg-orange-300" value="Submit">
  </form>`);

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const convertedHTML = convert(code);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div className="bg-gray-100 p-10 rounded-md">
        <div className="container flex">
          <MonacoEditor
            language="html"
            height={400}
            width={750}
            value={code}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
            onChange={handleEditorChange}
          />

          <MonacoEditor
            className="editor"
            language="html"
            height={400}
            width={750}
            value={convertedHTML}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Monaco;
