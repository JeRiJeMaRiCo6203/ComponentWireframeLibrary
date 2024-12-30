import React, { useEffect } from 'react'
import Tag from './Tag'
import TagSelected from './TagSelected'
import { useState } from 'react'
import { api } from '../config/api';

type Tag = {
  id: number;
  name: string;
  isSelected: boolean;
};

const FilterPopup = ({isOpen, onClose, setSelectedTags, selectedTags }: {isOpen: boolean, onClose: (scrollToTop: boolean) => void, setSelectedTags: (tags: {id: number; name: string}[]) => void, selectedTags: {id: number, name: string}[]}) => {

  const [rawTags, setRawTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);

  useEffect(() => {
    api.get<{ data: Tag[] }>(`categories`).then((res: any) => {
      let dataTags = res.data.map((data: any) => {
        return {
          id: data.id,
          name: data.name,
        }
      })
      
      dataTags.sort((a: Tag, b: Tag) => a.name.localeCompare(b.name))
      
      setRawTags(dataTags);

      dataTags = dataTags.map((item: Tag) => ({
        ...item,
        isSelected: false
      }))

      setTags(dataTags);
      setSearchedTags(dataTags);
    });
  }, []);

  useEffect(() => {
    setTags(JSON.parse(JSON.stringify(
      rawTags.map((item: Tag) => ({
        ...item,
        isSelected: (selectedTags || []).some((tag: {id: number, name: string}) => tag.id === item.id)
      }))
    )));
    setSearchedTags(JSON.parse(JSON.stringify(
      rawTags.map((item: Tag) => ({
        ...item,
        isSelected: (selectedTags || []).some((tag: {id: number, name: string}) => tag.id === item.id)
      }))
    )));
  }, [isOpen, rawTags]);

  const handleSelect = (id: number) => () => {
    setTags(tags.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected
        }
      }
      return item
    }))
    setSearchedTags(searchedTags.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected
        }
      }
      return item
    }))
  }

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    setSearchedTags(tags.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase())))
  }

  const handleSaveChanges = () => {
    setSelectedTags(
      tags.filter((item: any) => item.isSelected).map((item: any) => ({
        id: item.id,
        name: item.name
      }))
    )
    onClose(true);
  }

  return (
    <>
      {isOpen && (
        <div className='fixed w-full h-full top-0 left-0 z-30 flex justify-center items-center'>
          <div className='absolute top-0 left-0 w-full h-full bg-[#00000036] backdrop-blur-sm z-30' onClick={() => onClose(false)}></div>
          <div className='w-fit bg-white border-2 border-[#f4f4f4] rounded-lg relative z-40 flex'>
            <div className='w-96 m-8'>
              <input 
                autoComplete='off'
                type="text"
                name="search"
                id="search"
                placeholder="Search Tags..."
                onChange={handleSearch}
                className='w-96 py-2 px-3 bg-[#f4f4f4] border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] focus:bg-[#e7e7e7] focus:border-[#e7e7e7] text-sm rounded-lg'
              />
              <div className='w-96 h-96 overflow-y-scroll flex flex-col mt-4' style={{ scrollbarWidth: 'thin', scrollbarColor: '#e7e7e7 transparent' }}>
                {searchedTags.map((item: any, idx: number) => (
                  <>
                    <div
                      onClick={handleSelect(item.id)}
                      className='px-3 py-4 flex items-center gap-3 border-[#f4f4f4] group/row cursor-pointer hover:bg-[#f4f4f4]'
                    >
                      <div className={`h-5 aspect-square rounded-lg flex items-center justify-center
                        ${item.isSelected ? 'border-[5px] border-[#222222] group-hover/row:border-[#222222] transition-all duration-100' : 'border-2 border-[#e7e7e7] group-hover/row:border-[#a6a6a6]'}`
                      }></div>
                      {item.name}
                    </div>
                    { idx !== searchedTags.length - 1 && (
                      <hr className='border-t-2 border-[#f4f4f4]'/>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className='w-[2px] my-8 h-[27.5rem] bg-[#f4f4f4]'></div>
            <div className='w-96 m-8'>
              <div className='w-96 h-96 overflow-y-scroll' style={{ scrollbarWidth: 'thin', scrollbarColor: '#e7e7e7 transparent' }}>
                <div className='flex flex-wrap justify-end gap-2'>
                  {tags.map((item: any) => (
                    item.isSelected && (
                      <TagSelected key={item.id} title={item.name} onDelete={handleSelect(item.id)}/>
                    )
                  ))}
                </div>
              </div>
              <div className='w-96 mt-4 flex gap-2 justify-end'>
                <div
                  onClick={() => onClose(false)}
                  className='py-2 px-6 bg-white border-2 border-white hover:bg-[#e7e7e7] hover:border-[#e7e7e7] text-sm rounded-lg cursor-pointer transition-all'
                >
                  Cancel
                </div>
                <div
                  onClick={handleSaveChanges}
                  className='py-2 px-6 bg-white border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] text-sm rounded-lg cursor-pointer transition-all'
                >
                  Save Changes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


export default FilterPopup