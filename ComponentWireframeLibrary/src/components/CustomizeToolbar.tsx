import React, { ChangeEvent, useState } from 'react';

interface CustomizeToolbarProps {
  onChange: (name: string, value: string) => void;
}

const CustomizeToolbar: React.FC<CustomizeToolbarProps> = ({ onChange }) => {
  const [headingTextColor, setHeadingTextColor] = useState('#000000');
  const [headingFontSize, setHeadingFontSize] = useState('24px');
  const [labelFontSize, setLabelFontSize] = useState('16px');
  
  const handleTextColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeadingTextColor(event.target.value);
    onChange('headingTextColor', event.target.value); // Pass the value to the parent component
  };

  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeadingFontSize(event.target.value);
    onChange('headingFontSize', event.target.value);
  };

  const handleLabelFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabelFontSize(event.target.value);
    onChange('labelFontSize', event.target.value);
  };

  return (
    <div className="toolbar p-4 bg-white shadow-lg">
      <h3>Configuration</h3>

      {/* Heading Text Color */}
      <div>
        <label htmlFor="headingTextColor">Heading Text Color</label>
        <input
          type="color"
          id="headingTextColor"
          value={headingTextColor}
          onChange={handleTextColorChange}
        />
      </div>

      {/* Heading Font Size */}
      <div>
        <label htmlFor="headingFontSize">Heading Font Size</label>
        <input
          type="number"
          id="headingFontSize"
          value={headingFontSize.replace('px', '')}
          onChange={handleFontSizeChange}
        /> px
      </div>

      {/* Label Font Size */}
      <div>
        <label htmlFor="labelFontSize">Label Font Size</label>
        <input
          type="number"
          id="labelFontSize"
          value={labelFontSize.replace('px', '')}
          onChange={handleLabelFontSizeChange}
        /> px
      </div>
    </div>
  );
};

export default CustomizeToolbar;
