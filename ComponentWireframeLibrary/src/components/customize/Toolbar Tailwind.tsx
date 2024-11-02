import React, { ChangeEvent, useState } from 'react';

const Toolbar = (
  { updateHtml, resetToDefault, getLabelText, updateHtmlText }:
    {
      updateHtml: (id: string, key: string, value: string) => void,
      resetToDefault: () => void,
      getLabelText: (id: string) => void,
      updateHtmlText: (idContains: string, key: string, newValue: string) => void
    }
) => {

  // Handle changes for font size and color
  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtml('.heading-title', 'class', `font-size: ${e.target.value}px;`);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtml('.heading-title', 'class', `color: ${e.target.value};`);
  };

  const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateHtml('.heading-title', 'class', `text-align: ${e.target.value};`);
  };

  const handleLabelFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtml('.label', 'class', `font-size: ${e.target.value}px;`);
  };

  const handleLabelColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtml('.label', 'class', `color: ${e.target.value};`);
  };

  const handleLabel1TextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtmlText('firstNameLabel', 'text', e.target.value);
  };

  const handleLabel2TextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateHtmlText('lastNameLabel', 'text', e.target.value);
  }




  return (
    <div className="toolbar">
      {/* Font Size and Color Controls */}
      <label>
        Heading Font Size:
        <input style={{
          border: '1px solid #ccc',  // Add border
          borderRadius: '4px',       // Slight rounding for the corners
          padding: '5px',            // Padding for better space inside the input
          width: '80px',             // Width to accommodate number and arrows
          height: '35px',            // Set height for consistency with the design
          appearance: 'textfield',   // Ensures consistent styling across browsers
        }} type="number" defaultValue={24} onChange={handleFontSizeChange} />
      </label>
      <label>
        Heading Font Color:
        <input style={{
          border: '1px solid #ccc',
          borderRadius: '8px',    // Rounded corners
          padding: '5px',         // Add some padding
          width: '50px',          // Set width for the color picker
          height: '30px',         // Set height to make it look like a button
          cursor: 'pointer',      // Cursor change for better UX
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // Optional shadow for depth
        }} type="color" onChange={handleColorChange} />
      </label>
      <label>
        Position:
        <select onChange={handlePositionChange}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>
      <label>
        Label Font Size:
        <input type="number" style={{
          border: '1px solid #ccc',  // Add border
          borderRadius: '4px',       // Slight rounding for the corners
          padding: '5px',            // Padding for better space inside the input
          width: '80px',             // Width to accommodate number and arrows
          height: '35px',            // Set height for consistency with the design
          appearance: 'textfield',   // Ensures consistent styling across browsers
        }} defaultValue={24} onChange={handleLabelFontSizeChange} />
      </label>
      <label>
        Label Font Color:
        <input style={{
          border: '1px solid #ccc',
          borderRadius: '8px',    // Rounded corners
          padding: '5px',         // Add some padding
          width: '50px',          // Set width for the color picker
          height: '30px',         // Set height to make it look like a button
          cursor: 'pointer',      // Cursor change for better UX
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // Optional shadow for depth
        }} type="color" onChange={handleLabelColorChange} />
      </label>
      <label>
        Label 1 Text:
        <input style={{
          border: '1px solid #ccc',  // Add border
          borderRadius: '4px',       // Slight rounding for the corners
          padding: '5px',            // Padding for better space inside the input
          width: '80px',             // Width to accommodate number and arrows
          height: '35px',            // Set height for consistency with the design
          appearance: 'textfield',   // Ensures consistent styling across browsers
        }} type="text" onChange={handleLabel1TextChange} defaultValue={getLabelText('firstNameLabel')} />
      </label>
      <label>
        Label 2 Text:
        <input style={{
          border: '1px solid #ccc',  // Add border
          borderRadius: '4px',       // Slight rounding for the corners
          padding: '5px',            // Padding for better space inside the input
          width: '80px',             // Width to accommodate number and arrows
          height: '35px',            // Set height for consistency with the design
          appearance: 'textfield',   // Ensures consistent styling across browsers
        }} type="text" onChange={handleLabel2TextChange} defaultValue={getLabelText('lastNameLabel')} />
      </label>

      <button onClick={resetToDefault}>Reset</button>
    </div>
  );
};

export default Toolbar;
