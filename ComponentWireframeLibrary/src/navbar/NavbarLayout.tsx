import TagSelected from '../components/TagSelected'
import { useEffect, useState } from 'react';
import IconX from '../svg/IconX';

const NavbarLayout = ({ tags, gotoEditables, gotoSnippet }: { tags: any, gotoEditables: () => void, gotoSnippet: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Check if the user is scrolling down
    if (currentScrollY > lastScrollY && !isHovered) {
      setVisible(false); // Hide navbar
    } else {
      setVisible(true); // Show navbar
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        onMouseEnter={() => setVisible(true)}
        className='fixed top-0 left-0 w-full h-8 z-20'
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 w-full bg-white border-b-2 border-[#f4f4f4] z-20 transition-all ${
          visible ? 'translate-y-0' : '-translate-y-full delay-200'
        }`}
      >
        <div className='w-full px-48 py-2 grid grid-cols-[1fr_min-content_1fr] gap-16'>
          <div className='flex items-center gap-2'>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 97C75.9574 97 97 75.9574 97 50C97 24.0426 75.9574 3 50 3M50 97C24.0426 97 3 75.9574 3 50C3 24.0426 24.0426 3 50 3M50 97C64.9906 97 77.1429 75.9574 77.1429 50C77.1429 24.0426 64.9906 3 50 3M50 97C35.0094 97 22.8571 75.9574 22.8571 50C22.8571 24.0426 35.0094 3 50 3M53 50C53 51.6569 51.6569 53 50 53C48.3431 53 47 51.6569 47 50C47 48.3431 48.3431 47 50 47C51.6569 47 53 48.3431 53 50Z" stroke="black" stroke-width="6"/></svg>
            <p className='spacemono text-lg font-bold leading-9 tracking-tighter'>layzy</p>
          </div>
          <div className='flex gap-2 h-full items-center'>  
            <div className='py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all'>
              Home
            </div>
            <div className='py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all'>
              About
            </div>
            <div className='py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all'>
              Guide
            </div>
          </div>
          <div className='flex gap-2 justify-end'>
            <div
              onClick={gotoEditables}
              className='h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20'
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20.9992L16.7 16.6992" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div
              onClick={gotoSnippet}
              className='h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20'
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20.9992L16.7 16.6992" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarLayout