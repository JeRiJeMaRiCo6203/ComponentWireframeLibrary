import React, { useEffect, useState } from 'react'

interface NumberInputProps {
  numberRange: [number, number];
  changeData?: (value: number) => void;
  reset?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ numberRange, changeData, reset }) => {
  const [amount, setAmount] = useState(numberRange[1]);

  const handleAmount = (value: number) => {
    if (value <= numberRange[0]) setValue(numberRange[0]);
    else if (value >= numberRange[1]) setValue(numberRange[1]);
    else setValue(value);
  };

  const setValue = (value: number) => {
    setAmount(value);
    if (changeData) changeData(value);
  };

  useEffect(() => {
    if (changeData) {
      changeData(numberRange[1]);
    }
    setAmount(numberRange[1]);
  }, [reset]);

  return (
    <div className='w-full mt-2 flex items-center gap-2'>
      <button 
        className={`p-2 px-3 hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] rounded-lg select-none` + (amount <= numberRange[0] ? `bg-[#f4f4f4]` : `bg-white`)}
        onClick={() => handleAmount(amount - 1)}
      >
        -
      </button>
      <input 
        className='w-full p-2 bg-white hover:bg-[#e7e7e7] focus:bg-[#f4f4f4] hover:focus:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] rounded-lg text-center select-none'
        type="number"
        value={amount}
        onChange={(e) => handleAmount(Number(e.target.value))}
        name=""
        id=""
      />
      <button 
        className={`p-2 px-3 bg-[#f4f4f4] hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] rounded-lg select-none` + (amount >= numberRange[1] ? `bg-[#f4f4f4]` : `bg-white`)}
        onClick={() => handleAmount(amount + 1)}
      >
        +
      </button>
    </div>
  )
}

export default NumberInput