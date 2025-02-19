import React, { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedLight as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";
import CopyPopup from "../../components/CopyPopup";
import DropdownInput from "./DropdownInput";

type CodeSnippet = {
  name: string;
  type: string;
  codeSnippet: string;
  editableCodeSnippet?: {
    idx: number;
    editableIdx: number;
    type: string;
    value: string[] | string;
  }[];
};

const CodeSnippetTabs = ({
  codeSnippetDisplay,
  removeProperty,
}: {
  codeSnippetDisplay: {
    id: number;
    code: string;
    type: string;
    name: string;
  }[];
  removeProperty: number[];
}) => {
  const [code, setCode] = useState<
    { id: number; code: string; type: string; name: string }[]
  >([]);

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
    // console.log("codeLang:", codeLang);
    // console.log("codeSnippetDisplay:", codeSnippetDisplay);

    let neededCodeTypes: string[] = [];
    if (codeLang === "HTML + CSS") {
      neededCodeTypes = ["html", "css"];
    } else if (codeLang === "HTML + Tailwind") {
      neededCodeTypes = ["html-tailwind"];
    } else if (codeLang === "React + CSS") {
      neededCodeTypes = ["react", "css"];
    } else if (codeLang === "React + Tailwind") {
      neededCodeTypes = ["react-tailwind"];
    }

    const newCode = neededCodeTypes.flatMap((type) =>
      codeSnippetDisplay.filter(
        (snippet) =>
          snippet.type === type && !removeProperty.includes(snippet.id)
      )
    );

    // console.log('removeProperty', removeProperty);
    // console.log('newCode', newCode);

    setCode(newCode);
  }, [codeSnippetDisplay, codeLang]);

  const [selectedCode, setSelectedCode] = useState({
    type: "htmlbars",
    name: "HTML",
  });

  useEffect(() => {
    if (code.length > 0) {
      setSelectedCode({ type: code[0].type, name: code[0].name });
    }
  }, [code]);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        codeSnippetDisplay.find((snippet) => snippet.name === selectedCode.name)
          ?.code ?? ""
      );
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div id="snippet" className="mx-48 my-16">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {code.map((snippet) => (
            <div
              key={snippet.name}
              className={`cursor-pointer py-2 px-6 rounded-lg text-sm border-2 transition-all ${
                selectedCode.name === snippet.name ? "bg-white border-[#f4f4f4]" : "border-white hover:bg-[#e7e7e7] hover:border-[#e7e7e7]"
              }`}
              onClick={() =>
                setSelectedCode({ type: snippet.type, name: snippet.name })
              }
            >
              {snippet.name}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="w-full flex justify-end items-center gap-2 text-sm">
            <span className="text-xs text-[#6a6a6a]">Code Type :</span>
            <DropdownInput 
              options={['HTML + CSS', 'HTML + Tailwind', 'React + CSS', 'React + Tailwind']} 
              changeData={(value: any) => selectMenu(value)}
              reset={undefined}
            />
          </div>
        </div>
      </div>
      <div className='mt-2 border-2 border-[#f4f4f4] rounded-lg relative'>
        <CopyPopup isVisible={isCopied} />
        <div className='flex items-center text-xs justify-between rounded-t-md overflow-hidden pl-3 p-1 pr-2'>
          <div>
            {
              selectedCode.type === "html" || selectedCode.type === "html-tailwind" ? "HTML"
              : selectedCode.type === "react" || selectedCode.type === "react-tailwind" ? "JSX"
              : "CSS"
            }
          </div>
          <div
            className="py-1 px-1 flex gap-2 justify-center group/copy items-center border-white cursor-pointer rounded-md transition-all"
            onClick={handleCopy}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4M10 8H20C21.1046 8 22 8.89543 22 10V20C22 21.1046 21.1046 22 20 22H10C8.89543 22 8 21.1046 8 20V10C8 8.89543 8.89543 8 10 8Z"
                className="stroke-[#6a6a6a] group-hover/copy:stroke-[#222222] transition-all"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className='bg-[#f4f4f4] p-2'>
          <SyntaxHighlighter
            language={
              selectedCode.type === "html" || selectedCode.type === "html-tailwind"
                ? "htmlbars"
                : selectedCode.type === "react" || selectedCode.type === "react-tailwind"
                ? "javascript"
                : selectedCode.type
            }
            style={theme}
            customStyle={{
              backgroundColor: "#f4f4f4",
              width: "100%",
              height: "40rem",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#d9d9d9 transparent",
            }}
            showLineNumbers={true}
          >
            {codeSnippetDisplay.find(
              (snippet) => snippet.name === selectedCode.name
            )?.code ?? ""}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetTabs;
