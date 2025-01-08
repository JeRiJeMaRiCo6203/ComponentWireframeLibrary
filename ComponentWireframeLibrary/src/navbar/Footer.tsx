import React from 'react'

const Footer = () => {
  return (
    <div className='mt-16 mx-48 px-16 py-8 border-2 border-b-0 border-[#f4f4f4] bg-[#f4f4f4] rounded-t-lg gap-2 text-sm'>
      <div className='flex justify-between'>
        <div className='flex gap-6'>  
          <a
            className='hover:text-[#6a6a6a] cursor-pointer transition-all'
            href=''
            >
            Back to Top
          </a>
          <div className='h-5 w-[2px] bg-[#e7e7e7]'></div>
          <a
            className='hover:text-[#6a6a6a] cursor-pointer transition-all'
            href=''
          >
            Home
          </a>
          <div className='h-5 w-[2px] bg-[#e7e7e7]'></div>
          <a
            className='hover:text-[#6a6a6a] cursor-pointer transition-all'
            href=''
          >
            About
          </a>
          <div className='h-5 w-[2px] bg-[#e7e7e7]'></div>
          <a
            className='hover:text-[#6a6a6a] cursor-pointer transition-all'
            href=''
          >
            Guide
          </a>
        </div>
          <div>2025 © Layzy</div>
      </div>
    </div>
  )
}

export default Footer