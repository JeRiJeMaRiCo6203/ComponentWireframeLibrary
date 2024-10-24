import React, { useState, useEffect } from 'react';
import Canvas from './components/customize/Kanvas';
import Toolbar1 from './components/customize/Toolbar';
import { api } from './config/api';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { codepenEmbed } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CustomizePage = () => {
  // State for styles (you can define it as an object if necessary)
  const [styles, setStyles] = useState<{ fontSize?: string; fontColor?: string }>({});

  const [htmlContent, setHtmlContent] = useState<string>('');
  const [defaultHtmlContent, setDefaultHtmlContent] = useState<string>(''); // For storing the default content
  const editables = ["font-size", "font-color", "add-input"];

  // Fetch the initial HTML content
  const fetchHtmlCode = async () => {
    const response = await api.get('/wireframes/13');
    setHtmlContent(response.data.codestringhtml); // Set initial HTML content
    setDefaultHtmlContent(response.data.codestringhtml); // Set default HTML content
  };

  useEffect(() => {
    fetchHtmlCode();
  }, []);

  const resetToDefault = () => {
    setHtmlContent(defaultHtmlContent); // Reset to the default HTML content
    console.log('clicked')
  };

  const getLabelText = (idContains: string) => {
    // Create a DOM parser to manipulate the string as an HTML element
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
  
    // Select the element that contains the given ID (or part of it)
    const element = Array.from(doc.querySelectorAll('[id]')).find((el) =>
      el.id.includes(idContains)
    );
  
    // Return the inner text of the found element, or an empty string if not found
    return element ? element.innerText : '';
  };

  // Function to update HTML (with logic to append/modify styles)
  const updateHtml = (idContains: string, key: string, newValue: string) => {
    // Create a DOM parser to manipulate the string as an HTML element
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
  
    // Select all elements that have an ID containing the string 'idContains'
    const elements = Array.from(doc.querySelectorAll('[id]')).filter((element) =>
      element.id.includes(idContains)
    );
  
    // Loop through all matching elements and update their style or text
    elements.forEach((element) => {
      if (key === 'style') {
        const existingStyle = element.getAttribute('style') || '';
        const styleObj: { [key: string]: string } = {};
  
        existingStyle.split(';').forEach((styleRule) => {
          const [prop, val] = styleRule.split(':');
          if (prop && val) {
            styleObj[prop.trim()] = val.trim();
          }
        });
  
        const [newProp, newVal] = newValue.split(':').map((item) => item.trim());
  
        if (!styleObj[newProp] || styleObj[newProp] !== newVal) {
          styleObj[newProp] = newVal;
          const updatedStyle = Object.entries(styleObj)
            .map(([prop, val]) => `${prop}: ${val}`)
            .join('; ');
  
          element.setAttribute('style', updatedStyle);
        }
      } else if (key === 'text') {
        element.innerText = newValue;
      } else {
        element.setAttribute(key, newValue);
      }
    });
  
    // Convert the updated DOM back to string
    const updatedHtml = doc.body.innerHTML;
    setHtmlContent(updatedHtml);
  };
  
    return (
      <div className="customize-page">
        <h1 style={{
          textAlign: "center", fontWeight: "bold", fontSize: "2rem", color: "blue"}
        }>halaman customize tipe formulir</h1>
        {
          editables.includes("font-size") || editables.includes("font-color") || editables.includes("add-input") ? (
            // Render Toolbar1 if any of the conditions match
            <>
              <Toolbar1 getLabelText={getLabelText} updateHtml={updateHtml} resetToDefault={resetToDefault} />
            </>
          )
            :
            (
              // Placeholder for Toolbar2 or another component
              <>
                {/* <Toolbar2 /> */}
                <div>No toolbar to display</div>
              </>
            )
        }
        <br />
        <Canvas htmlContent={htmlContent} />
        <SyntaxHighlighter class="text-left rounded-md overflow-scroll h-64 scroll-m-1" language={`html`} style={codepenEmbed} customStyle={{ padding: "25px" }} wrapLongLines={true}>
          {htmlContent}
        </SyntaxHighlighter>
      </div>
    );
  };

  export default CustomizePage;
