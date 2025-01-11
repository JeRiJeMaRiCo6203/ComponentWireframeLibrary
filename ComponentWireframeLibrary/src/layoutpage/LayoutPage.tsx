import React, { useState, useEffect } from "react";
import Tag from "../components/Tag";
import parse from "html-react-parser";
import DropdownInput from "./components/DropdownInput";
import SwitchInput from "./components/SwitchInput";
import NumberInput from "./components/NumberInput";
import { api } from "../config/api";
import { useParams } from "react-router-dom";
import CodeSnippetTabs from "./components/CodeSnippetTabs";
import Footer from "../navbar/Footer";
import Navbar from "../navbar/Navbar";

type CodeSnippet = {
  id: number;
  name: string;
  type: string;
  codeSnippet: string;
  editableCodeSnippet?: {
    idx: number;
    editableIdx: number;
    type: string;
    code: string[] | string;
  }[];
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

type Wireframe = {
  id: number;
  title: string;
  tags: string[];
};

const LayoutPage = () => {
  const { id } = useParams();

  const [wireframe, setWireframe] = useState<Wireframe>({
    id: -1,
    title: "",
    tags: [],
  });

  const [rawCodeSnippet, setRawCodeSnippet] = useState<CodeSnippet[]>([]);

  const [aspect, setAspect] = useState("16/9");

  const [removeProperty, setRemoveProperty] = useState<number[]>([]);

  const [editables, setEditables] = useState<Editable[]>([]);

  const [codeSnippetDisplay, setCodeSnippetDisplay] = useState<
    { id: number; code: string; type: string; name: string }[]
  >([]);
  
  useEffect(() => {
    console.log(wireframe);
  }, [wireframe]);

  useEffect(() => {
    api
      .get<{ data: any }>(`wireframeDetails/${id}`)
      .then((res: any) => {
        let tempWireframe = res.data.map((data: any) => {
          return {
            id: data.id,
            title: data.title,
            tags: data.categories,
          };
        });

        setWireframe(tempWireframe[0]);
      });

    api
      .get<{ data: CodeSnippet[] }>(`editablecodesBasedOnWireframe/${id}`)
      .then((res: any) => {
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
              };
            }),
          };
        });

        codeSnippet?.map((snippet: CodeSnippet) => {
          if (snippet.editableCodeSnippet) {
            snippet.editableCodeSnippet.sort(
              (a: { idx: number }, b: { idx: number }) => a.idx - b.idx
            );
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
        };
      });

      editables.sort((a: any, b: any) => a.idx - b.idx);

      setEditables(
        editables.map((editable: any) => ({
          ...editable,
          value: editable.switchOptions
            ? 0
            : editable.dropdownOptions
              ? 0
              : editable.numberRange
                ? editable.numberRange[1]
                : null,
        }))
      );

      setRemoveProperty(Array(editables.length).fill(-1));
    });
  }, [id]);

  function changeData(idx: number, valueTemp: any) {
    setEditables((prev) => {
      const newEditables: any = [...prev];
      let value = valueTemp;
      if (newEditables[idx].switchOptions) {
        value = newEditables[idx].switchOptions?.indexOf(valueTemp) ?? 0;
      }
      if (newEditables[idx].dropdownOptions) {
        value = newEditables[idx].dropdownOptions?.indexOf(valueTemp) ?? 0;
      }
      if (newEditables[idx].numberRange) {
        value = parseInt(valueTemp);
      }

      newEditables[idx].value = value;

      if (newEditables[idx].removeProperty) {
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

  const [reset, setReset] = useState(false);

  const resetEditables = () => {
    setReset((prev) => !prev);
  };

  useEffect(() => {
    setCodeSnippetDisplay(updateCodeSnippet());
  }, [rawCodeSnippet && editables]);

  useEffect(() => {
    setCodeSnippetDisplay(updateCodeSnippet());
    // changeAspect(aspect);
  }, [editables]);

  // useEffect(() => {
  //   changeAspect(aspect);
  // }, [codeSnippetDisplay]);

  function updateCodeSnippet(): {
    id: number;
    code: string;
    type: string;
    name: string;
  }[] {
    const tempRawCodeSnippet = JSON.parse(JSON.stringify(rawCodeSnippet));

    return (
      tempRawCodeSnippet?.map((rawCodeSnippetSingle: CodeSnippet) => {
        if (!rawCodeSnippetSingle) {
          return {
            id: -1,
            code: "Error: Code snippet not found",
            type: "",
            name: "Error",
          };
        }
        if (!rawCodeSnippetSingle.editableCodeSnippet) {
          return {
            id: -1,
            code: "Error: Editable code snippet not found",
            type: "",
            name: "Error",
          };
        }
        rawCodeSnippetSingle.editableCodeSnippet?.map((editableCodeSnippet) => {
          let placeholdersValue = "";
          if (editableCodeSnippet.type === "loop") {
            for (
              let i = 0;
              i < editables[editableCodeSnippet.editableIdx].value;
              i++
            ) {
              // placeholdersValue += editableCodeSnippet.code;
              // ini mungkin yg ini
              placeholdersValue += editableCodeSnippet.code[0];
            }
          } else {
            placeholdersValue =
              editableCodeSnippet.code[
              editables[editableCodeSnippet.editableIdx].value
              ];
          }
          rawCodeSnippetSingle.codeSnippet =
            rawCodeSnippetSingle.codeSnippet.replace(
              new RegExp(`\\$\\{${editableCodeSnippet.idx}\\}`, "g"),
              placeholdersValue
            );
        });

        changeAspect("16/9");
        return {
          id: rawCodeSnippetSingle.id,
          code: rawCodeSnippetSingle.codeSnippet,
          type: rawCodeSnippetSingle.type,
          name: rawCodeSnippetSingle.name,
        };
      }) ?? []
    );
  }

  function changeAspect(aspect: string) {
    let tempCodeSnippet = JSON.parse(JSON.stringify(codeSnippetDisplay));
    if (
      tempCodeSnippet.find((snippet: any) => snippet.type === "preview-css")
        ?.code === undefined
    )
      return;
    if (aspect === "4/3") {
      tempCodeSnippet = tempCodeSnippet
        .find((snippet: any) => snippet.type === "preview-css")!
        .code.replace("@4/3", ".43{}\n")
        .replace(".916{}\n", "@9/16");
    } else if (aspect === "9/16") {
      tempCodeSnippet = tempCodeSnippet
        .find((snippet: any) => snippet.type === "preview-css")!
        .code.replace("@4/3", ".43{}\n")
        .replace("@9/16", ".916{}\n");
    } else {
      tempCodeSnippet = tempCodeSnippet
        .find((snippet: any) => snippet.type === "preview-css")!
        .code.replace(".43{}\n", "@4/3")
        .replace(".916{}\n", "@9/16");
    }
    setCodeSnippetDisplay((prev) =>
      prev.map((snippet) =>
        snippet.type === "preview-css"
          ? { ...snippet, code: tempCodeSnippet }
          : snippet
      )
    );
    setAspect(aspect);
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
    <body className="bg-white w-full">
      <Navbar
        openFilterPopup={() => { }}
        tags={undefined}
        onTagDelete={() => { }}
        handleFocus={() => { }}
        onSearchDelete={() => { }}
        searchTerm={undefined}
        page={"layout"}
        gotoEditables={() => handleScroll("editables")}
        gotoSnippet={() => handleScroll("snippet")}
      />
      <div className="gap-16 mx-48 mt-32 mb-16">
        <p className="text-4xl pt-16 font-medium">{wireframe.title}</p>
        <div className="flex flex-wrap gap-2 pt-4">
          {
            wireframe.tags?.map((tag: any, index: number) => {
              return (
                <Tag
                  key={index}
                  title={tag}
                />
              );
            })
          }
        </div>
      </div>
      <div
        id="editables"
        className="mx-48 my-16"
      >
        <div className="flex justify-end">
          <div
            className="px-4 py-2 border-2 border-[#f4f4f4] rounded-lg hover:bg-[#e7e7e7] hover:border-[#e7e7e7] text-sm transition-all cursor-pointer"
            onClick={resetEditables}
          >
            Reset to Default
          </div>
        </div>
        <div className="pt-4 flex flex-wrap justify-center items-center gap-6">
          {editables.map((editable, index) => {
            return (
              <div key={index} className="w-80">
                <div>{editable.name}</div>
                {editable.switchOptions ? (
                  <SwitchInput
                    options={editable.switchOptions as [string, string]}
                    changeData={(value) => changeData(index, value)}
                    reset={reset}
                  />
                ) : editable.dropdownOptions ? (
                  <DropdownInput
                    options={editable.dropdownOptions as string[]}
                    changeData={(value) => changeData(index, value)}
                    reset={reset}
                  />
                ) : (
                  <NumberInput
                    numberRange={editable.numberRange as [number, number]}
                    changeData={(value) => changeData(index, value)}
                    reset={reset}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={
          `bg-[#f4f4f4] w-full py-12 ` +
          (aspect !== "your window" ? "px-48" : "border-x-4 border-[#f4f4f4]")
        }
      >
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex justify-center gap-2">
            <div
              className="hover:bg-[#e7e7e7] cursor-pointer py-2 w-28 rounded-lg text-sm text-center"
              onClick={() => changeAspect("16/9")}
            >
              Desktop
            </div>
            <div
              className="hover:bg-[#e7e7e7] cursor-pointer py-2 w-28 rounded-lg text-sm text-center"
              onClick={() => changeAspect("4/3")}
            >
              Tablet
            </div>
            <div
              className="hover:bg-[#e7e7e7] cursor-pointer py-2 w-28 rounded-lg text-sm text-center"
              onClick={() => changeAspect("9/16")}
            >
              Phone
            </div>
            <div
              className="hover:bg-[#e7e7e7] cursor-pointer py-2 w-28 rounded-lg text-sm text-center"
              onClick={() => changeAspect("your window")}
            >
              Fullwidth
            </div>
          </div>
        </div>
        <div className="aspect-video flex justify-center">
          <div
            className="break-words overflow-y-auto bg-white transition-all duration-500"
            style={{
              aspectRatio: aspect !== "your window" ? aspect : "unset",
              width: aspect !== "your window" ? "auto" : "100%",
              fontSize:
                aspect === "16/9"
                  ? `${(window.innerWidth - 384) / 1440}em`
                  : aspect === "4/3"
                    ? `
                ${((window.innerWidth - 384) * 1.05) / 1440}em`
                    : aspect === "9/16"
                      ? `
                ${((window.innerWidth - 384) * 1.1) / 1440}em`
                      : "1em",
              scrollbarWidth: "thin",
              scrollbarColor: "#e7e7e7 transparent",
            }}
          >
            {parse(`
                <style>
                  .section > * {
                    transition: all 150ms ease;
                    transition-delay: 50ms;
                  }
                  ${codeSnippetDisplay.find(
              (snippet) => snippet.type === "preview-css"
            )?.code ?? ""
              }
                </style>
                <div style="width: 100%; height: 100%; min-height: max-content; display: flex; justify-content: center; align-items: center;">
                  ${codeSnippetDisplay.find(
                (snippet) => snippet.type === "html"
              )?.code ?? ""
              }
                </div>
              `)}
          </div>
        </div>
      </div>
      <CodeSnippetTabs
        codeSnippetDisplay={codeSnippetDisplay}
        removeProperty={removeProperty}
      />
      <Footer />
    </body>
  );
};

export default LayoutPage;
