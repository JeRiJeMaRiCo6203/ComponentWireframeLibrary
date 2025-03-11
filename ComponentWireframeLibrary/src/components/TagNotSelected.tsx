import React from 'react'
import IconX from '../svg/IconX';

const TagNotSelected = ({title}: { title: string}) => {
  const onSelect = () => {
    
  }

  return (
    <div 
      className="relative w-max h-fit py-1 px-3 rounded-lg flex items-center gap-2 bg-[#f4f4f4] hover:bg-[#e7e7e7] text-sm border-2 border-[#f4f4f4] hover:border-[#e7e7e7] cursor-pointer"
      onClick={onSelect} 
    >
      { title }
    </div>
  )
}

export default TagNotSelected