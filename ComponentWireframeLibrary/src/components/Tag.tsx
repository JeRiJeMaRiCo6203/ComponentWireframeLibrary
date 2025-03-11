

const Tag = ({title, editable}: { title: string, editable: boolean }) => {
  return (
    <div 
      className="relative w-max h-fit py-1 px-3 rounded-lg flex items-center gap-2 bg-white text-sm border-2 border-[#f4f4f4]"
    >
      { editable && 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 cursor-pointer" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      }
      { title }
    </div>
  )
}

export default Tag