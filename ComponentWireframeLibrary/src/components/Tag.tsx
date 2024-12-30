

const Tag = ({title, small = false}: { title: string, small?: boolean }) => {
  return (
    <div 
      className={`relative w-max h-fit rounded-lg flex items-center gap-2 bg-white text-sm border-2 border-[#f4f4f4] `+ (small ? 'text-xs py-1 px-2' : 'py-1 px-3')}
    >
      { title }
    </div>
  )
}

export default Tag