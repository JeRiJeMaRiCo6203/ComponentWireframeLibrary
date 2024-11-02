import React, { useState, useEffect, useContext } from 'react';
import Canvas from './components/customize/Kanvas';
import ToolbarTailwind from './components/customize/Toolbar Tailwind';
import { api } from './config/api';
import { TailwindConverter } from 'css-to-tailwindcss';
import { useCustomize } from './store/CustomizeContext';
import { useNavigate } from "react-router-dom";

const CustomizePage = () => {
  const navigate = useNavigate();

  const [defaultHtmlContent, setDefaultHtmlContent] = useState<string>(''); // For storing the default content

  const editables = ["font-size", "font-color", "add-input"];
  
  const [showCanvas, setShowCanvas] = useState(true);
  
  const { htmlContent, setHtmlContent, externalCssContent, setExternalCssContent, tailwindCss, setTailwindCss } = useCustomize();

  // Fetch the initial HTML content
  const fetchHtmlAndCssCode = async () => {
    const response = await api.get('/wireframes/14');
    setHtmlContent(response.data.codestringhtml); // Set initial HTML content
    setDefaultHtmlContent(response.data.codestringhtml); // Set default HTML content
    setExternalCssContent(response.data.codestringcss);
  };

  const converter = new TailwindConverter();

  

  // componentdidmount 
  useEffect(() => {
    fetchHtmlAndCssCode();  
  }, []);

  
  // function to reset code to original
  const resetToDefault = () => {
    window.location.reload();
    setHtmlContent(defaultHtmlContent); // Reset to the default HTML content
    setExternalCssContent('');
    setTailwindCss('');
  };

  // function to get label text
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


  // function to update html text
  const updateHtmlText = (idContains: string, key: string, newValue: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const elementText = Array.from(doc.querySelectorAll('[id]')).filter((element) =>
      element.id.includes(idContains)
    );

    elementText.forEach((element) => {
      if (key === 'text') {
        element.innerText = newValue;
      }
    });

    setHtmlContent(doc.documentElement.outerHTML);
  }

  // Function to update HTML (with logic to append/modify styles)
  const updateHtml = (className: string, key: string, newValue: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    console.log('UpdateHTML called with:', { className, key, newValue });

    if (key === 'class') {
      // Pastikan newValue dalam format yang benar
      const [property, value] = newValue.split(':').map(item => item.trim());
      console.log('Parsed style:', { property, value });

      if (property && value) {
        // Hapus titik koma jika ada di value
        const cleanValue = value.replace(/;$/, '');
        updateInternalCSS(doc, className, property, cleanValue);
      }
    }
  };

  /**
   * Update internalCSS state by adding or modifying a CSS rule.
   * The rule is identified by the className and property.
   * If the rule does not exist, a new rule is added.
   * If the rule does exist, the property is updated or added.
   * The internalCSS state is then updated and the style element is updated in the document.
   * Finally, the HTML is updated to reflect the changes.
   * @param doc The document to update.
   * @param className The class name of the rule to update.
   * @param property The property of the rule to update.
   * @param value The new value of the property.
   */
  const updateInternalCSS = (doc: Document, className: string, property: string, value: string) => {
    // Split internalCSS into individual rules
    const cssRules = externalCssContent.split('}').filter(rule => rule.trim());
    
    // Find the index of the rule with the given className
    const cleanClassName = className.replace(/^\./, '');
    const ruleIndex = cssRules.findIndex(rule => rule.includes(`.${cleanClassName}`));

    if (ruleIndex !== -1) {
      // If the rule exists, update the property
      const currentRule = cssRules[ruleIndex];
      const openBraceIndex = currentRule.indexOf('{');
      const beforeBrace = currentRule.substring(0, openBraceIndex + 1);
      let existingStyles = currentRule.substring(openBraceIndex + 1).trim();
      
      // Update atau tambahkan property yang baru
      const regex = new RegExp(`(${property}\\s*:\\s*)[^;]+;?`, 'i');
      if (regex.test(existingStyles)) {
        existingStyles = existingStyles.replace(regex, `$1${value};`);
      } else {
        existingStyles += `\n${property}: ${value};`;
      }

      // Perbarui aturan dengan gaya yang diperbarui
      cssRules[ruleIndex] = `${beforeBrace} \n${existingStyles.trim()}\n`;
    } else {
      // Jika rule tidak ada, tambahkan rule baru
      cssRules.push(`.${cleanClassName} { ${property}: ${value};`);
    }

    // Gabungkan dan perbarui state internalCSS serta HTML
    const updatedCSS = cssRules.join('}') + '}';
    setExternalCssContent(updatedCSS);
    
    // const styleElement = doc.querySelector('style');
    // if (styleElement) {
    //   styleElement.innerHTML = updatedCSS;
    // } else {
    //   const newStyle = doc.createElement('style');
    //   newStyle.innerHTML = updatedCSS;
    //   doc.head.appendChild(newStyle);
    // }

    setHtmlContent(doc.documentElement.outerHTML);
    convertToTailwind(updatedCSS);
    // console.log(styleElement);
  };

  

  const convertToTailwind = async (externalCss: string) => {
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(externalCssContent, 'text/html');


    if (externalCss && externalCssContent) {
       const css = externalCss;
       console.log(externalCss)
       try {
          const { convertedRoot } = await converter.convertCSS(css);
          const tailwindCSS = convertedRoot.toString();
          // console.log(tailwindCSS);
          setTailwindCss(tailwindCSS);

          // Toggle showCanvas to force re-render
          setShowCanvas(true); // Temporarily hide Canvas
          // setTimeout(() => setShowCanvas(true), 200); 
       } catch (error) {
          console.error('Error saat mengonversi ke Tailwind:', error);
       }
    }
 };


 
  
  return (
    <div className="customize-page">
      <h1 style={{
        textAlign: "center", fontWeight: "bold", fontSize: "2rem", color: "blue"
      }}>halaman customize tipe formulir tailwind</h1>
      {
        editables.includes("font-size") || editables.includes("font-color") || editables.includes("add-input") ? (
          // Render Toolbar1 if any of the conditions match
          <>
            <ToolbarTailwind getLabelText={getLabelText} updateHtml={updateHtml} resetToDefault={resetToDefault} updateHtmlText={updateHtmlText} />
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

       {showCanvas && <Canvas htmlContent={htmlContent} externalCssContent={externalCssContent} />}
       
      <button onClick={() => navigate("/final-page", { state: { htmlContent, externalCssContent, tailwindCss } })}>
  Checkout Design / Generate Code
</button>
    </div>
  );
};

export default CustomizePage;
