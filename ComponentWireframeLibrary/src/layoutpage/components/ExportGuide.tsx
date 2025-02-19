import React, { useState } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedLight as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyPopup from '../../components/CopyPopup';

const ExportGuide = ({ gotoSnippet = () => {} }) => {

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (string: string) => {
    try {
      await navigator.clipboard.writeText(string);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="mx-48 my-48">
      <CopyPopup isVisible={isCopied} />
      <div>
        <div className='text-xl'>Exporting</div>
        <div className='text-sm pt-4 pb-8'>
          Follow these steps to export your layout to your project with the correct font.
        </div>
        <div className="grid grid-cols-[auto_1fr_2fr] gap-x-12 gap-y-16 p-16 border-2 border-[#f4f4f4] rounded-lg">
          <div className='flex'>
            <div className='border-2 border-[#f4f4f4] px-3 py-2 rounded-lg h-min'>
              1
            </div>
          </div>
          <div>
            <div>Configuring index.html</div>
              <div className='text-sm pt-4'>
                Ensure these three lines of code exist in your <span className='text-[#c94922] font-mono bg-[#f4f4f4]'>{'<head></head>'}</span> so your project can recognize the font.
              </div>
          </div>
          <div>
            <div className='border-2 border-[#f4f4f4] rounded-lg h-min'>
              <div className='flex items-center text-xs justify-between rounded-t-md overflow-hidden pl-3 p-1 pr-2'>
                <div>
                  HTML
                </div>
                <div
                  className="py-1 px-1 flex gap-2 justify-center group/copy items-center border-white cursor-pointer rounded-md transition-all"
                  onClick={() => handleCopy(`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">`)}
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
                  language={"htmlbars"}
                  style={theme}
                  showLineNumbers={true}
                  customStyle={{
                    backgroundColor: "#f4f4f4",
                    width: "100%",
                    maxWidth: "42rem",
                    maxHeight: "40rem",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d9d9d9 transparent",
                  }}
                >
                  {`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='border-2 border-[#f4f4f4] px-3 py-2 rounded-lg h-min'>
              2
            </div>
          </div>
          <div>
            <div>Applying the Font to Your CSS</div>
            <div className='text-sm pt-4'>
              Add the following to your CSS file to apply the font (it is recommended to place it at the top of the file).
            </div>
          </div>
          <div>
            <div className='border-2 border-[#f4f4f4] rounded-lg h-min'>
              <div className='flex items-center text-xs justify-between rounded-t-md overflow-hidden pl-3 p-1 pr-2'>
                <div>
                  CSS
                </div>
                <div
                  className="py-1 px-1 flex gap-2 justify-center group/copy items-center border-white cursor-pointer rounded-md transition-all"
                  onClick={() => handleCopy(`*{
  font-family: 'Poppins', sans-serif;
}`)}
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
                  language={"css"}
                  style={theme}
                  showLineNumbers={true}
                  customStyle={{
                    backgroundColor: "#f4f4f4",
                    width: "100%",
                    maxHeight: "40rem",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d9d9d9 transparent",
                  }}
                >
                  {`*{
  font-family: 'Poppins', sans-serif;
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='border-2 border-[#f4f4f4] px-3 py-2 rounded-lg h-min'>
              3
            </div>
          </div>
          <div>
            <div>Export The Layout</div>
              <div className='text-sm pt-4'>
                Choose a code type from our selection and copy the entire code to your project.
              </div>
          </div>
          <div>
            <div className='flex'>
              <div
                className="bg-white hover:bg-[#e7e7e7] cursor-pointer px-6 py-3 rounded-lg border-2 border-[#f4f4f4] hover:border-[#e7e7e7] flex gap-2 hover:gap-3 items-center transition-all"
                onClick={() => gotoSnippet()}
              >
                Export 
                <svg className='-rotate-90' width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10L12 15L17 10" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportGuide