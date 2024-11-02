import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const Kanvas = (
  { htmlContent, externalCssContent }:
    {
      htmlContent: string,
      externalCssContent: string
    }
) => {
  
  // Insert external CSS styles directly within Kanvas
  const combinedContent = `
    <style>${externalCssContent}</style>
    ${htmlContent}
  `;

  return (
    <div className="canvas bg-white w-full">
      {parse(combinedContent)} {/* This ensures external CSS applies to the HTML content */}
    </div>
  );
};

export default Kanvas;
