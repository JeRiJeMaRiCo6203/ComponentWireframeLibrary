import IconX from '../../svg/IconX';

const SmallTag = ({title, isSearch}: { title: string; isSearch: boolean, onDelete: () => void }) => {
  return (
    <div className="relative w-fit py-2 pl-4 pr-2 rounded-lg flex items-center gap-3 bg-white text-sm">
      {isSearch ? (
        <div className='flex items-center gap-1'>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20.9992L16.7 16.6992" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          { title }
        </div>
      ) : (
        title
      )}
      <div className='cursor-pointer'>
        <IconX size={20}/>
      </div>
    </div>
  )
}

export default SmallTag