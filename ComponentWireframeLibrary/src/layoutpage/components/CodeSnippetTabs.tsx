import React, { useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

type CodeSnippet = {
  name: string;
  type: string;
  codeSnippet: string;
  editableCodeSnippet?: { idx: number, editableIdx: number, type: string, value: string[] | string }[];
};

const CodeSnippetTabs = ({ codeSnippetDisplay, removeProperty }: { codeSnippetDisplay: { id: number, code: string, type: string, name: string }[], removeProperty: number[] }) => {
  const [code, setCode] = useState<{ id: number, code: string, type: string, name: string }[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const [codeLang, setcodeLang] = useState("HTML + CSS");

  const selectMenu = (value: string) => {
    setIsOpen((prev) => !prev);
    setcodeLang(value);
  };

  useEffect(() => {
    let neededCodeTypes: string[] = [];
    if (codeLang === "HTML + CSS") {
      neededCodeTypes = ["html", "css"];
    } else if (codeLang === "HTML + Tailwind") {
      neededCodeTypes = ["html_tailwind"];
    } else if (codeLang === "React + CSS") {
      neededCodeTypes = ["react", "css"];
    } else if (codeLang === "React + Tailwind") {
      neededCodeTypes = ["react_tailwind"];
    }
    
    const newCode = neededCodeTypes.flatMap((type) =>
      codeSnippetDisplay.filter((snippet) => snippet.type === type && !removeProperty.includes(snippet.id))
    );

    // console.log('removeProperty', removeProperty);
    // console.log('newCode', newCode);

    setCode(newCode);

  }, [codeSnippetDisplay, codeLang]);

  const [selectedCode, setSelectedCode] = useState({ type: "html", name: "HTML" });

  useEffect(() => {
    if (code.length > 0 ) {
      setSelectedCode({ type: code[0].type, name: code[0].name });
    }
  }, [code]);

  return (
    <div id='snippet' className="mx-48 my-16">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {code.map((snippet) => (
            <div
              key={snippet.name}
              className={`hover:bg-[#e7e7e7] cursor-pointer py-2 px-6 rounded-lg text-sm ${
                selectedCode.name === snippet.name ? "bg-[#f4f4f4]" : "bg-white"
              }`}
              onClick={() => setSelectedCode({ type: snippet.type, name: snippet.name })}
            >
              { snippet.name }
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="bg-white py-2 px-2 rounded-lg text-sm">
            {codeLang}
          </div>
          {!isOpen ? (
            <div
              className="bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg text-sm border-2 border-[#f4f4f4]"
              onClick={() => dropdownToggle()}
            >
              <div>Change Code Type</div>
            </div>
          ) : (
            <div>
              <div
                className="bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg text-sm border-2 border-[#f4f4f4]"
                onClick={() => dropdownToggle()}
              >
                Change Code Type
              </div>
              <div className="absolute">
                <ul
                  className="text-sm bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg border-2 border-[#f4f4f4]"
                  onClick={() => selectMenu("HTML + CSS")}
                >
                  HTML + CSS
                </ul>
                <ul
                  className="text-sm bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg border-2 border-[#f4f4f4]"
                  onClick={() => selectMenu("HTML + Tailwind")}
                >
                  HTML + Tailwind
                </ul>
                <ul
                  className="text-sm bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg border-2 border-[#f4f4f4]"
                  onClick={() => selectMenu("React + CSS")}
                >
                  React + CSS
                </ul>
                <ul
                  className="text-sm bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg border-2 border-[#f4f4f4]"
                  onClick={() => selectMenu("React + Tailwind")}
                >
                  React + Tailwind
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#f4f4f4] rounded-lg p-4 mt-2">
        <SyntaxHighlighter
          language={selectedCode.type.includes("_tailwind") ? selectedCode.type.replace("_tailwind", "") : selectedCode.type}
          style={a11yLight}
          customStyle={{
            backgroundColor: "#f4f4f4",
            width: "100%",
            maxHeight: "40rem",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#d9d9d9 transparent",
          }}
          wrapLongLines={false}
        >
          {codeSnippetDisplay.find((snippet) => snippet.name === selectedCode.name)?.code ?? ""}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeSnippetTabs