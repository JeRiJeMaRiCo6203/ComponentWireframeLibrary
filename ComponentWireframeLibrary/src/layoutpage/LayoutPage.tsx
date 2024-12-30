import React, { useState, useEffect } from 'react'
import NavbarLayout from '../navbar/NavbarLayout'
import Tag from '../components/Tag'
import parse from "html-react-parser";
import DropdownInput from './components/DropdownInput';
import SwitchInput from './components/SwitchInput';
import NumberInput from './components/NumberInput';
import { api } from '../config/api';
import { useParams } from 'react-router-dom';
import CodeSnippetTabs from './components/CodeSnippetTabs';
import FilterPopup from '../components/FilterPopup'

import tagJson from '../tempJsons/tagJson.json'

type CodeSnippet = {
  id: number;
  name: string;
  type: string;
  codeSnippet: string;
  editableCodeSnippet?: { idx: number, editableIdx: number, type: string, code: string[] | string}[];
};

type Editable = {
  idx: number;
  name: string;
  dropdownOptions?: string[];
  switchOptions?: [string, string];
  numberRange?: [number, number];
  value: number;
  removeProperty?: number[];
};

const LayoutPage = () => {
  const { id } = useParams();

  const [rawCodeSnippet, setRawCodeSnippet] = useState<CodeSnippet[]>([]);

  const [aspect, setAspect] = useState("16/9");

  const [removeProperty, setRemoveProperty] = useState<number[]>([]);
  
  const [editables, setEditables] = useState<Editable[]>([]);

  const [codeSnippetDisplay, setCodeSnippetDisplay] = useState<{ id: number, code: string, type: string, name: string }[]>([]);

  useEffect(() => {
    api.get<{ data: CodeSnippet[] }>(`editablecodesBasedOnWireframe/${id}`).then((res: any) => {
      let codeSnippet = res.data.map((data: any) => {
        return {
          id: data.codesnippet_id,
          name: data.codesnippet_name,
          type: data.codesnippet_type,
          codeSnippet: data.codesnippet,
          editableCodeSnippet: data.editable_codesnippet.map((data2: any) => {
            return {
              idx: data2.idx,
              editableIdx: data2.editable_idx,
              type: data2.type,
              code: data2.value,
            }
          })
        }
      })
      
      codeSnippet?.map((snippet: CodeSnippet) => {
        if(snippet.editableCodeSnippet) {
          snippet.editableCodeSnippet.sort((a: { idx: number }, b: { idx: number }) => a.idx - b.idx);
        }
      });

      setRawCodeSnippet(codeSnippet);
    });
    
    api.get<{ data: any }>(`editablesByWireframeId/${id}`).then((res: any) => {
      let editables = res.data.map((data: any) => {
        return {
          idx: data.idx,
          name: data.editable_name,
          dropdownOptions: data.dropdown_options,
          switchOptions: data.switch_options,
          numberRange: data.number_range,
          removeProperty: data?.remove_property,
        }
      });
      
      editables.sort((a: any, b: any) => a.idx - b.idx);

      setEditables(editables.map((editable: any) => ({
        ...editable,
        value: editable.switchOptions ? 0 : editable.dropdownOptions ? 0 : editable.numberRange ? editable.numberRange[0] : null,
      })));

      setRemoveProperty(Array(editables.length).fill(-1));
    });
  }, [id]);

  function changeData(idx: number, valueTemp: any) {
    setEditables((prev) => {
      const newEditables: any = [...prev];
      let value = valueTemp;
      if(newEditables[idx].switchOptions) {
        value = newEditables[idx].switchOptions?.indexOf(valueTemp) ?? 0;
      }
      if(newEditables[idx].dropdownOptions) {
        value = newEditables[idx].dropdownOptions?.indexOf(valueTemp) ?? 0;
      }
      if(newEditables[idx].numberRange) {
        value = parseInt(valueTemp);
      }

      newEditables[idx].value = value;

      if(newEditables[idx].removeProperty) {
        let removeProperty = newEditables[idx].removeProperty[value];
        setRemoveProperty((prev) => {
          const newConstraints = [...prev];
          newConstraints[idx] = removeProperty;
          return newConstraints;
        });
      }

      return newEditables;
    });
  }

  useEffect(() => {
    setCodeSnippetDisplay(updateCodeSnippet());
  }, [rawCodeSnippet && editables]);

  useEffect(() => {
    setCodeSnippetDisplay(updateCodeSnippet());
  }, [editables]);

  
  function updateCodeSnippet(): { id: number, code: string; type: string; name: string }[] {
    const tempRawCodeSnippet = JSON.parse(JSON.stringify(rawCodeSnippet));

    return tempRawCodeSnippet?.map((rawCodeSnippetSingle: CodeSnippet) => {
      if (!rawCodeSnippetSingle) {
        return { id: -1, code: "Error: Code snippet not found", type: "", name: "Error" };
      }
      if(!rawCodeSnippetSingle.editableCodeSnippet){
        return { id: -1, code: "Error: Editable code snippet not found", type: "", name: "Error" };
      }
      rawCodeSnippetSingle.editableCodeSnippet?.map((editableCodeSnippet) => {
        let placeholdersValue = '';
        if(editableCodeSnippet.type === 'loop') {
          for(let i = 0; i < editables[editableCodeSnippet.editableIdx].value; i++) {
            placeholdersValue += editableCodeSnippet.code;
          }
        } else {
          placeholdersValue = editableCodeSnippet.code[editables[editableCodeSnippet.editableIdx].value]
          // console.log('placeholdersValue', placeholdersValue);
        };
        rawCodeSnippetSingle.codeSnippet = rawCodeSnippetSingle.codeSnippet.replace(new RegExp(`\\$\\{${editableCodeSnippet.idx}\\}`, 'g'), placeholdersValue);
      });
      
      return { id: rawCodeSnippetSingle.id, code: rawCodeSnippetSingle.codeSnippet, type: rawCodeSnippetSingle.type, name: rawCodeSnippetSingle.name };
    }) ?? [];
  }

  const handleScroll = (divId: string) => {
    const element = document.getElementById(divId);
    if (element) {
      const yOffset = -100; // Adjust this value to leave a gap
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <body className='bg-white w-full'>
      <NavbarLayout 
        tags={tagJson}
        gotoEditables={() => handleScroll('editables')}
        gotoSnippet={() => handleScroll('snippet')}
      />
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
      <div
        id='editables'
        className='mx-48 my-16 flex flex-wrap justify-center items-center gap-6'
      >
        {editables.map((editable, index) => {
          return (
            <div key={index} className='w-80'>
              <div>{editable.name}</div>
              {editable.switchOptions ? (
                <SwitchInput
                  options={editable.switchOptions as [string, string]}
                  changeData={(value) => changeData(index, value)}
                />
              ) : editable.dropdownOptions ? (
                <DropdownInput
                  options={editable.dropdownOptions as string[]}
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
      <div className='bg-[#f4f4f4] w-full px-48 py-12'>
        <div className='flex justify-center gap-2 mb-12'>
          <div className='hover:bg-[#e7e7e7] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("16/9")} >Desktop</div>
          <div className='hover:bg-[#e7e7e7] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("4/3")} >Tablet</div>
          <div className='hover:bg-[#e7e7e7] cursor-pointer py-2 px-6 rounded-lg text-sm' onClick={() => setAspect("9/16")} >Phone</div>
        </div>
        <div className='aspect-video flex justify-center'>
          <div
            className='break-words overflow-y-auto transition-all bg-white flex items-center'
            style={{ aspectRatio: aspect }}>
            { parse(`
                <style>${codeSnippetDisplay.find((snippet) => snippet.type === 'css')?.code ?? ''}</style>
                ${codeSnippetDisplay.find((snippet) => snippet.type === 'html')?.code ?? ''}
              `)
            }
          </div>
        </div>
      </div>
      <CodeSnippetTabs codeSnippetDisplay={codeSnippetDisplay} removeProperty={removeProperty} />
      <div className='h-[100rem]'></div>
    </body>
  )
}

export default LayoutPage