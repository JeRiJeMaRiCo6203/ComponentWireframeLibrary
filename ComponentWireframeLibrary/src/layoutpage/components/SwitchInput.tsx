import { useEffect, useState } from "react";

interface SwitchInputProps {
  options: [string, string];
  changeData?: (value: string) => void;
  reset?: boolean;
}

const SwitchInput: React.FC<SwitchInputProps> = ({ options, changeData, reset }) => {
  const [isOn, setIsOn] = useState(false);

  const handleSwitch = (value: boolean) => {
    setIsOn(value);
    if (changeData) {
      changeData(value ? options[1] : options[0]);
    }
  };

  useEffect(() => {
    if (changeData) {
      changeData(options[0]);
    }
    setIsOn(false);
  }, [reset]);

  return (
    <div 
      className='w-full mt-2 flex bg-[#f4f4f4] hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] rounded-lg relative cursor-pointer transition-all'
      onClick={() => handleSwitch(!isOn)}
    >
      <div
        className={`${
          isOn ? "left-1/2" : "left-0"
        } absolute w-1/2 h-full top-0 bg-white rounded-md transition-all duration-300 pointer-events-none`}
      ></div>
        <div className='p-2 w-1/2 text-center pointer-events-none z-[1] select-none'>{options[0]}</div>
        <div className='p-2 w-1/2 text-center pointer-events-none z-[1] select-none'>{options[1]}</div>
    </div>
  )
}

export default SwitchInput