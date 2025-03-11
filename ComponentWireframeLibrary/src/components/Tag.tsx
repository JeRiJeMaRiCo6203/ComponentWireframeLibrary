

const Tag = ({title, small = false}: { title: string, small?: boolean }) => {
  return (
    <div 
      className={`relative w-max h-fit rounded-lg flex items-center gap-2 py-1 bg-white border-2 border-[#f4f4f4] `+ (small ? 'text-xs px-2' : 'text-sm px-3')}
    >
      { title }
    </div>
  )
}

export default Tag