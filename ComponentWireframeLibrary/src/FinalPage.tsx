import { useState, useEffect } from 'react';
import './App.css';
import reactLogo from '/vite.svg';
import viteLogo from '/vite.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { codepenEmbed } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ClipboardOutline, CheckmarkSharp } from 'react-ionicons';
import {useCustomize} from './store/CustomizeContext';

function FinalPage() {
  // Set initial state for codeType and codeString
  // getter, setter
  const [copy, setCopy] = useState(false);
  const [codeType, setCodeType] = useState("");
  const [data, setCodeString] = useState(null);
  const { htmlContent, externalCssContent, tailwindCss } = useCustomize();
  // Function to fetch the default React code
  const jsonCodeStringDefault = async () => {
    setCodeType('html');
    
    setCodeString(htmlContent);
  };

  // Function to fetch HTML code
  const jsonCodeString = async () => {
    setCodeType('css');
    setCodeString(tailwindCss);
  };

  const jsonCodeStringCss = async () => {
    setCodeType('css');
    setCodeString(externalCssContent);
  };

  // Effect that runs only when codeType changes
  useEffect(() => {
    if (codeType) {
      console.log('Code type changed to:', codeType);
    }
  }, [codeType]);  // This will log codeType whenever it changes

  // Initial fetch when the component mounts
  useEffect(() => {
    jsonCodeStringDefault();
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-row items-center gap-4">
        <img src={reactLogo} alt="React Logo" className="h-5" onClick={() => jsonCodeStringDefault()} />
        <img src={viteLogo} alt="Vite Logo" className="h-5" onClick={() => jsonCodeString()} />
        <img src={viteLogo} alt="Vite Logo" className="h-5" onClick={() => jsonCodeStringCss()} />
            
      </div>
      <div className="max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden">
        <div className="flex justify-between px-4 text-white text-xs items-center">
          <p className='text-sm'>Snippet Code</p>
          {copy ? (
            <button className='py-1 inline-flex items-center gap-1'>
              <span className='text-base mt-1'>
                <CheckmarkSharp color={'#000000'}></CheckmarkSharp>
              </span>
              Copied!
            </button>
          ) : (
            <button className='py-1 inline-flex items-center gap-1' onClick={() => {
              navigator.clipboard.writeText(data);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}>
              <span className='text-base mt-1'>
                <ClipboardOutline color={'#000000'}></ClipboardOutline>
              </span>
              Copy Code
            </button>
          )}
        </div>
        <SyntaxHighlighter class="text-left rounded-md overflow-scroll h-64 scroll-m-1" language={`${codeType}`} style={codepenEmbed} customStyle={{ padding: "25px" }} wrapLongLines={true}>
          {data}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default FinalPage;
