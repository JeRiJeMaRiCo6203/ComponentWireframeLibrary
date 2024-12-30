import './App.css'
import Navbar from './navbar/Navbar'
import SearchSection from './search/SearchSection'
import FilterPopup from './components/FilterPopup'
import { useRef, useState } from 'react'
import Tag from './components/Tag'

function App() {

  const [filterPopup, setFilterPopup] = useState(false)
  const [selectedTags, setSelectedTags] = useState<{id: number; name: string}[]>([])
  const [layouts, setLayouts] = useState<any[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openFilterPopup = () => {
    setFilterPopup(true)
  }

  const closeFilterPopup = (scrollToTop: boolean) => {
    setFilterPopup(false)
    if (scrollToTop) {
      handleScroll('search-section')
    }
  }

  const handleTagDelete = (tagId: number) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId))
  }

  const handleScroll = (divId: string) => {
    const element = document.getElementById(divId);
    if (element) {
      const yOffset = -100; // Adjust this value to leave a gap
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const handleFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <body className='bg-white w-full'>
      <FilterPopup isOpen={filterPopup} onClose={closeFilterPopup} setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>
      <Navbar openFilterPopup={openFilterPopup} tags={selectedTags} onTagDelete={handleTagDelete} handleFocus={handleFocus}/>
      <SearchSection openFilterPopup={openFilterPopup} tags={selectedTags} onTagDelete={handleTagDelete} searchInput={searchInputRef}/>
      <div className='grid grid-cols-3 gap-16 mx-48 pt-16'>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion</p>
            <div className='pt-2 flex flex-wrap gap-2'>
              <Tag title='Button' small={true}/>
              <Tag title='Accordion' small={true}/>
              <Tag title='Gallery' small={true}/>
              <Tag title='Modal' small={true}/>
              <Tag title='Accordion' small={true}/>
              <Tag title='Gallery' small={true}/>
            </div>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion</p>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion</p>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2 text-base'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
      </div>
      <div className='h-[100rem]'></div>
    </body>
  )
}

export default App