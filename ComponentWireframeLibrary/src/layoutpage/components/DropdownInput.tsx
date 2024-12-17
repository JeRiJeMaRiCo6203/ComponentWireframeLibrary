import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  changeData?: (value: string) => void;
}

const DropdownInput: React.FC<DropdownProps> = ({ options, changeData }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (changeData) {
      changeData(option);
    }
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative' tabIndex={0} onBlur={handleBlur}>
      <div
        className={`
          w-full mt-2 p-2 px-4 flex justify-between items-center hover:bg-[#e7e7e7] focus:bg-[#f4f4f4] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] cursor-pointer select-none
          ${isOpen ? "bg-[#f4f4f4]" : "bg-white"}
          ${isOpen ? "rounded-t-lg" : "rounded-lg"}
        `}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10L12 15L17 10" stroke="#a6a6a6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      {isOpen && (
        <div className='absolute w-full rounded-b-lg bg-[#f4f4f4] overflow-hidden z-30'>
          {options.map((option) => (
            <div
              key={option}
              className='cursor-pointer p-2 px-4 hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] select-none'
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;