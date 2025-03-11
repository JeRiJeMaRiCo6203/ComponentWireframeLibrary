import TagSelected from '../components/TagSelected'
import IconX from "../svg/IconX";

const SearchSection = ({ openFilterPopup, tags, onTagDelete, searchInput, handleEnterSearch, searchTerm, onSearchDelete }: { openFilterPopup: () => void, tags: any, onTagDelete: (tagId: number) => void, searchInput: any, handleEnterSearch: () => void, searchTerm: string | undefined, onSearchDelete: () => void | undefined; }) => {

  return (
    <div id='search-section' className='mx-48 pt-32'>
      <div className='w-full rounded-lg flex justify-between gap-2'>
        <div
          className='py-2 px-3 flex justify-center items-center gap-1 bg-white hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] cursor-pointer rounded-lg transition-all'
          onClick={() => openFilterPopup()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p className='text-sm'>Filters</p>
        </div>
        <div className='flex gap-2'>
          <input
            ref={searchInput}
            autoComplete='off'
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className='w-80 py-2 px-3 bg-[#f4f4f4] border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] focus:bg-[#e7e7e7] focus:border-[#e7e7e7] text-sm rounded-lg transition-all'
          />
          <div
            onClick={handleEnterSearch}
            className="h-full aspect-square flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 20.9992L16.7 16.6992"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-2 py-4 border-b-2 border-[#f4f4f4]'>
        {searchTerm && (
          <div className="relative w-max h-fit py-1 pl-3 pr-2 rounded-lg flex items-center gap-2 bg-white text-sm border-2 border-[#f4f4f4]">
            <div className="flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 20.9992L16.7 16.6992"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {searchTerm}
            </div>
            <div
              onClick={onSearchDelete}
              className="cursor-pointer"
            >
              <IconX size={16} />
            </div>
          </div>
        )}
        {tags.map((item: any) => (
          <TagSelected key={item.id} title={item.name} onDelete={() => onTagDelete(item.id)}/>
        ))}
      </div>
    </div>
  )
}

export default SearchSection