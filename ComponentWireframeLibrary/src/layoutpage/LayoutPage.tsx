import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Tag from '../components/Tag'
import parse from "html-react-parser";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const LayoutPage = () => {
  var code = `
    <div class="w-full h-full bg-blue-300">
      <h1 class="text-slate-900 bg-blue-900">Form Pendaftaran</h1>
      <form class="flex flex-col" action="">
        <label for="fname" class="text-slate-900">First name:</label> <label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label>
        <input type="text" id="fname" name="fname" value="John">
        <label for="lname" class="text-slate-900">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe">
        <input type="submit" class="bg-black" value="Submit">
      </form>
    </div>
    <div class="w-full h-full bg-blue-300">
      <h1 class="text-slate-900 bg-blue-900">Form Pendaftaran</h1>
      <form class="flex flex-col" action="">
        <label for="fname" class="text-slate-900">First name:</label> <label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label>
        <input type="text" id="fname" name="fname" value="John">
        <label for="lname" class="text-slate-900">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe">
        <input type="submit" class="bg-black" value="Submit">
      </form>
    </div>
    <div class="w-full h-full bg-blue-300">
      <h1 class="text-slate-900 bg-blue-900">Form Pendaftaran</h1>
      <form class="flex flex-col" action="">
        <label for="fname" class="text-slate-900">First name:</label> <label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label>
        <input type="text" id="fname" name="fname" value="John">
        <label for="lname" class="text-slate-900">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe">
        <input type="submit" class="bg-black" value="Submit">
      </form>
    </div>
    <div class="w-full h-full bg-blue-300">
      <h1 class="text-slate-900 bg-blue-900">Form Pendaftaran</h1>
      <form class="flex flex-col" action="">
        <label for="fname" class="text-slate-900">First name:</label> <label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label><label for="fname" class="text-slate-900">First name:</label>
        <input type="text" id="fname" name="fname" value="John">
        <label for="lname" class="text-slate-900">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe">
        <input type="submit" class="bg-black" value="Submit">
      </form>
    </div>
  `;

  const codeType = "html";

  const [isOn, setIsOn] = useState(false);

  const onToggle = (value: boolean) => {
    setIsOn(value);
  };

  const [aspect, setAspect] = useState("16/9");

  return (
    <body className='bg-white w-full'>
      <Navbar/>
      <div className='gap-16 mx-48 mt-32 mb-16'>
        <p className='text-4xl pt-16 font-medium'>
          Orion
        </p>
        <div className='flex flex-wrap gap-2 pt-4'>
          <Tag title='Button' editable={false}/>
          <Tag title='Accordion' editable={false}/>
          <Tag title='Gallery' editable={false}/>
          <Tag title='Modal' editable={false}/>
          <Tag title='Header' editable={true}/>
        </div>
      </div>
      <div className='bg-[#e7e7e7] w-full px-48 py-12'>
        <div className='flex justify-center gap-2 mb-12'>
          <div className='hover:bg-[#f4f4f4] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("16/9")} >Desktop</div>
          <div className='hover:bg-[#f4f4f4] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("4/3")} >Tablet</div>
          <div className='hover:bg-[#f4f4f4] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("9/16")} >Phone</div>
        </div>
        <div className='aspect-video flex justify-center'>
          <div className={`break-words overflow-y-auto aspect-[${aspect}] transition-all`} style={{ scrollbarWidth: "thin", scrollbarColor: "#d9d9d9 #f4f4f4" }}>
            {parse(code)}
          </div>
        </div>
      </div>
      <div className='mx-48 my-16 flex justify-between gap-6'>
        <div className='flex justify-between w-96'>
          <div>Button</div>
          <div
            className={`${
              isOn ? "bg-[#6a6a6a]" : "bg-[#d9d9d9]"
            } relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-300`}
            onClick={() => onToggle(!isOn)}
          >
            <span
              className={`${
                isOn ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
            />
          </div>
        </div>
        <div className='flex justify-between w-96'>
          <div>Button</div>
          <div
            className={`${
              isOn ? "bg-[#6a6a6a]" : "bg-[#d9d9d9]"
            } relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-300`}
            onClick={() => onToggle(!isOn)}
          >
            <span
              className={`${
                isOn ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
            />
          </div>
        </div>
        <div className='flex justify-between w-96'>
          <div>Button</div>
          <div
            className={`${
              isOn ? "bg-[#6a6a6a]" : "bg-[#d9d9d9]"
            } relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-300`}
            onClick={() => onToggle(!isOn)}
          >
            <span
              className={`${
                isOn ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
            />
          </div>
        </div>
      </div>
      <div className='mx-48 my-16'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <div className='bg-[#f4f4f4] py-2 px-6 rounded-lg text-sm'>HTML</div>
            <div className='bg-white hover:bg-[#f4f4f4] cursor-pointer py-2 px-6 rounded-lg text-sm'>CSS</div>
          </div>
          <div className='flex gap-2'>
            <div className='bg-white py-2 px-2 rounded-lg text-sm'>HTML + CSS</div>
            <div className='bg-white hover:bg-[#f4f4f4] cursor-pointer pt-[6px] pb-[2px] px-6 rounded-lg text-sm border-2 border-[#f4f4f4]'>Change Code Type</div>
          </div>
        </div>
        <div className='bg-[#f4f4f4] rounded-lg p-4 mt-2'>
          <SyntaxHighlighter language={`${codeType}`} style={a11yLight} customStyle={{ 
            backgroundColor: "#f4f4f4", 
            width: "100%", 
            maxHeight: "40rem", 
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#d9d9d9 transparent",
          }} wrapLongLines={false}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className='h-[100rem]'></div>
    </body>
  )
}

export default LayoutPage