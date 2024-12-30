import React from 'react'
import IconX from '../svg/IconX';

const TagSelected = ({title, onDelete}: { title: string, onDelete: () => void }) => {

  return (
    <div className="relative w-max h-fit py-1 pl-3 pr-2 rounded-lg flex items-center gap-2 bg-white text-sm border-2 border-[#f4f4f4]">
      { title }
      <div className='cursor-pointer' onClick={onDelete}>
        <IconX size={16}/>
      </div>
    </div>
  )
}

export default TagSelected