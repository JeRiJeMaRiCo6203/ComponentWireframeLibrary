import React, { useState } from 'react'
import TagSelected from '../components/TagSelected'
import Tag from '../components/TagNotSelected'
import IconX from '../svg/IconX'
import FilterPopup from '../components/FilterPopup'

const SearchSection = ({ openFilterPopup, tags, onTagDelete, searchInput, handleEnterSearch }: { openFilterPopup: () => void, tags: any, onTagDelete: (tagId: number) => void, searchInput: any, handleEnterSearch: () => void }) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [suggestions, setSuggestions] = useState<any[]>([]);
  // const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // Track active suggestion for keyboard navigation
  // const [showSuggestions, setShowSuggestions] = useState(false); // Track if suggestions are visible

  // const getSuggestions = (value: string) => {
  //   return tags.filter((tag: any) => 
  //     tag.name.toLowerCase().includes(value.toLowerCase())
  //   );
  // }

  // Handle input change
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setSearchTerm(value);

  //   if (value.length > 0) {
  //     const filteredSuggestions = getSuggestions(value);
  //     setSuggestions(filteredSuggestions);
  //     setShowSuggestions(true);
  //   } else {
  //     setSuggestions([]); // Clear suggestions when the input is empty
  //     setShowSuggestions(false);
  //   }
  //   setActiveSuggestionIndex(-1); // Reset active suggestion index when input changes
  // };

  // Handle key down event for arrow keys and Enter key
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (showSuggestions) {
  //     if (event.key === 'ArrowDown') {
  //       console.log("down key pressed")
  //       // Move down in the suggestions list
  //       setActiveSuggestionIndex(prevIndex =>
  //         prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
  //       );
  //     } else if (event.key === 'ArrowUp') {
  //       // Move up in the suggestions list
  //       setActiveSuggestionIndex(prevIndex =>
  //         prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
  //       );
  //     } else if (event.key === 'Enter') {
  //       // Select the current active suggestion
  //       if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
  //         handleSuggestionSelect(suggestions[activeSuggestionIndex].name);
  //       }
  //     }
  //   }
  // };

  // Handle click on suggestion
  // const handleSuggestionSelect = (suggestionId: number) => {
  //   setSearchTerm('')
  //   setSuggestions([]); // Hide suggestions after selection
  //   setShowSuggestions(false); // Hide suggestions
  //   // Tag Select TAMBAHAIN
  // };

  return (
    <div id='search-section' className='mx-48 pt-32'>
      <div className='w-full rounded-lg flex justify-between gap-2'>
        {/* {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-16 w-full h-fit bg-white border-2 border-[#f4f4f4] rounded-lg py-4 z-20">
              <p className='px-6 pb-1 font-semibold text-xs'>titles</p>
              {suggestions.map((item: any, index: number) => (
                <div
                key={item.id}
                className={`px-6 py-1 cursor-pointer text-sm hover:bg-[#f4f4f4] ${
                  index === activeSuggestionIndex ? 'bg-[#f4f4f4]' : ''
                }`}
                onClick={() => handleSuggestionSelect(item.id)}
                >
                  {item.name}
                </div>
              ))}
              <hr className='border-t-2 mt-3 mb-4 border-[#f4f4f4]'/>
              <p className='px-6 pb-2 font-semibold text-xs'>Tags</p>
              <div className='px-6 flex flex-wrap gap-2'>
                {suggestions.map((item: any) => (
                  <Tag key={item.id} title={item.name}/>
                ))}
              </div>
              <hr className='border-t-2 mt-3 mb-4 border-[#f4f4f4]'/>
              <p className='px-6 pb-2 font-semibold text-xs'>Editables</p>
              <div className='px-6 flex flex-wrap gap-2'>
                {suggestions.map((item: any) => (
                  <Tag key={item.id} title={item.name}/>
                ))}
              </div>
            </div>
          )} */}
        <div
          className='py-2 px-3 flex justify-center items-center gap-1 bg-white hover:bg-[#e7e7e7] border-2 border-[#f4f4f4] hover:border-[#e7e7e7] cursor-pointer rounded-lg'
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
            // value={searchTerm}
            // onChange={handleInputChange}
            // onKeyDown={handleKeyDown} // Attach keydown event 
            // onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setShowSuggestions(false)}
            placeholder="Search..."
            className='w-80 py-2 px-3 bg-[#f4f4f4] border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] focus:bg-[#e7e7e7] focus:border-[#e7e7e7] text-sm rounded-lg'
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
        {tags.map((item: any) => (
          <TagSelected key={item.id} title={item.name} onDelete={() => onTagDelete(item.id)}/>
        ))}
      </div>
    </div>
  )
}

export default SearchSection