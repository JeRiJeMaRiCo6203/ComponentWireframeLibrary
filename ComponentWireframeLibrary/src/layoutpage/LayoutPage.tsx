import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Tag from '../components/Tag'
import parse from "html-react-parser";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DropdownInput from './components/DropdownInput';
import SwitchInput from './components/SwitchInput';
import NumberInput from './components/NumberInput';
import { api } from '../config/api';
import { useParams } from 'react-router-dom';

const LayoutPage = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    api.get(`editablecodes/${id}`).then((res) => {
      console.log(res.data);
    });
  }, [id]);

  const dbEditablesTest: {
    idx: number;
    name: string;
    dropdownOption?: string[];
    switchOption?: [string, string];
    numberRange?: [number, number];
  }[] = [
    {
      idx: 1,
      name: "Bdaddeh",
      switchOption: ["lime", "lightblue"],
    },
    {
      idx: 0,
      name: "Adaddeh",
      dropdownOption: ["string1", "string2", "string3"],
    },
    {
      idx: 2,
      name: "Bdaddeh",
      numberRange: [1, 10],
    },
  ];

  const dbCodeSnippetTest: {
    name: string;
    type: string;
    codeSnippet: string;
    editableCodeSnippet?: { idx: number, editableId: number, type: string, value: string[] | string }[];
  }[] = [
    {
      name: 'HTML',
      type: 'html',
      codeSnippet: `
        <div style="width: 100%; margin: 2rem 4rem;">
          <div style="display: flex; justify-content: space-evenly; align-items: center; gap: 1rem; background-color: #f4f4f4; border-radius: 0.5rem; padding: 1rem;">\${0}
          </div>
        </div>
      `,
      editableCodeSnippet: [
        {
          idx: 1,
          editableId: 0,
          type: "replace",
          value: ["string1", "string2", "string3"],
        },
        {
          idx: 0,
          editableId: 2,
          type: "loop",
          value: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="width: 50px; height: 50px; background-color: \${2}; border-radius: 50%;"></div>
              <p>\${1}</p>
            </div>`,
        },
        {
          idx: 2,
          editableId: 1,
          type: "replace",
          value: ["lime", "lightblue"],
        }
      ]
    },
    {
      name: 'CSS',
      type: 'css',
      codeSnippet: `test test test`,
      editableCodeSnippet: [
      ]
    },
  ]

  let rawEditables = dbEditablesTest;

  rawEditables.sort((a, b) => a.idx - b.idx);

  let rawCodeSnippet = dbCodeSnippetTest;

  rawCodeSnippet.map((snippet) => {
    if(snippet.editableCodeSnippet) {
      snippet.editableCodeSnippet.sort((a, b) => a.idx - b.idx);
    }
  });

  console.log(rawCodeSnippet[0].editableCodeSnippet);



  const [aspect, setAspect] = useState("16/9");

  const codeType = "html";
  
  const [editables, setEditables] = useState(rawEditables.map((editable: any) => ({
    ...editable,
    value: editable.switchOption ? 0 : editable.dropdownOption ? 0 : editable.numberRange ? editable.numberRange[1] : null,
  })));


  const [codeSnippetCanvas, setCodeSnippetCanvas] = useState(updateCodeSnippet());

  function changeData(idx: number, valueTemp: any) {
    setEditables((prev) => {
      const newEditables: any = [...prev];
      let value = valueTemp;
      if(newEditables[idx].switchOption) {
        value = newEditables[idx].switchOption?.indexOf(valueTemp) ?? 0;
      }
      if(newEditables[idx].dropdownOption) {
        value = newEditables[idx].dropdownOption?.indexOf(valueTemp) ?? 0;
      }
      if(newEditables[idx].numberRange) {
        value = parseInt(valueTemp);
      }

      newEditables[idx].value = value;
      return newEditables;
    });
  }

  useEffect(() => {
    setCodeSnippetCanvas(updateCodeSnippet());
  }, [editables]);

  function updateCodeSnippet(type: string = 'html') {
    let rawCodeSnippetSingle = rawCodeSnippet.find(snippet => snippet.type === type);
    if (!rawCodeSnippetSingle) {
      return "Error: Code snippet with type "+type+" not found";
    }
    if(!rawCodeSnippetSingle.editableCodeSnippet){
      return rawCodeSnippetSingle.codeSnippet;
    }
    rawCodeSnippetSingle.editableCodeSnippet?.map((editableCodeSnippet) => {
      let placeholdersValue = '';
      if(editableCodeSnippet.type === 'loop') {
        for(let i = 0; i < editables[editableCodeSnippet.editableId].value; i++) {
          placeholdersValue += editableCodeSnippet.value;
        }
      } else {
        placeholdersValue = editableCodeSnippet.value[editables[editableCodeSnippet.editableId].value]
      };
      rawCodeSnippetSingle.codeSnippet = rawCodeSnippetSingle.codeSnippet.replace(new RegExp(`\\$\\{${editableCodeSnippet.idx}\\}`, 'g'), placeholdersValue);
    });
    // console.log(newCode)
    return rawCodeSnippetSingle.codeSnippet;
  }

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
          <div
            className='break-words overflow-y-auto transition-all bg-white flex items-center'
            style={{ scrollbarWidth: "thin", scrollbarColor: "#d9d9d9 #f4f4f4", aspectRatio: aspect }}>
            {parse(codeSnippetCanvas)}
          </div>
        </div>
      </div>
      <div className='mx-48 my-16 flex flex-wrap justify-center items-center gap-6'>
        {editables.map((editable, index) => {
          return (
            <div key={index} className='w-80'>
              <div>{editable.name}</div>
              {editable.switchOption ? (
                <SwitchInput
                  options={editable.switchOption as [string, string]}
                  changeData={(value) => changeData(index, value)}
                />
              ) : editable.dropdownOption ? (
                <DropdownInput
                  options={editable.dropdownOption as string[]}
                  changeData={(value) => changeData(index, value)}
                />
              ) : (
                <NumberInput
                  numberRange={editable.numberRange as [number, number]}
                  changeData={(value) => changeData(index, value)}
                />
              )}
            </div>
          )
        })}
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
            { codeSnippetCanvas }
          </SyntaxHighlighter>
        </div>
      </div>
      <div className='h-[100rem]'></div>
    </body>
  )
}

export default LayoutPage