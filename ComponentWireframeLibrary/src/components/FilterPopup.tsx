import React from 'react'

const FilterPopup = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  return (
    <>
      {isOpen && (
        <div className='absolute w-full h-full top-0 left-0 z-20 bg-[#00000058] flex justify-center items-center' onClick={onClose}>
          <div className='p-8 bg-white rounded-lg'>
            FilterPopup
          </div>
        </div>
      )}
    </>
  )
}

export default FilterPopup