import TagSelected from "../components/TagSelected";
import { useEffect, useState } from "react";
import IconX from "../svg/IconX";
import { NavLink } from "react-router-dom";

const Navbar = ({
  openFilterPopup,
  tags,
  onTagDelete,
  handleFocus,
  onSearchDelete,
  searchTerm,
  page,
  gotoEditables,
  gotoSnippet,
}: {
  openFilterPopup: () => void | undefined;
  tags: any;
  onTagDelete: (tagId: number) => void | undefined;
  handleFocus: () => void | undefined;
  onSearchDelete: () => void | undefined;
  searchTerm: string | undefined;
  page: string;
  gotoEditables: () => void | undefined;
  gotoSnippet: () => void | undefined;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Check if the user is scrolling down
    if (currentScrollY > lastScrollY) {
      setVisible(false); // Hide navbar
    } else {
      setVisible(true); // Show navbar
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        onMouseEnter={() => setVisible(true)}
        className="fixed top-0 left-0 w-full h-8 z-20"
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 w-full bg-white border-b-2 border-[#f4f4f4] z-20 transition-all ${
          visible ? "translate-y-0" : "-translate-y-full delay-200"
        }`}
      >
        <div className="w-full px-48 py-2 grid grid-cols-[1fr_min-content_1fr] gap-16">
          <NavLink to="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 97C75.9574 97 97 75.9574 97 50C97 24.0426 75.9574 3 50 3M50 97C24.0426 97 3 75.9574 3 50C3 24.0426 24.0426 3 50 3M50 97C64.9906 97 77.1429 75.9574 77.1429 50C77.1429 24.0426 64.9906 3 50 3M50 97C35.0094 97 22.8571 75.9574 22.8571 50C22.8571 24.0426 35.0094 3 50 3M53 50C53 51.6569 51.6569 53 50 53C48.3431 53 47 51.6569 47 50C47 48.3431 48.3431 47 50 47C51.6569 47 53 48.3431 53 50Z"
                  stroke="#222222"
                  stroke-width="6"
                />
              </svg>
              <p className="spacemono text-lg font-bold leading-9 tracking-tighter">
                layzy
              </p>
            </div>
          </NavLink>
          <div className="flex gap-2 h-full items-center">
            <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all">
                Home
              </div>
            </NavLink>
            <NavLink to="/about" onClick={() => page !== "home" ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.scrollTo({ top: 0 }) }>
              <div className="py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all">
                About
              </div>
            </NavLink>
            <a href="https://layzy.gitbook.io/layzy-docs/" target="_blank">
              <div className="py-2 px-6 rounded-lg text-sm hover:bg-[#e7e7e7] hover:cursor-pointer transition-all">
                Guide
              </div>
            </a>
          </div>
          <div className="flex gap-2 justify-end">
            {page === "home" ? (
              <>
                <div className="relative group/filter">
                  <div className="h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] group-hover/filter:bg-[#f4f4f4] group-hover/filter:hover:bg-[#e7e7e7] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all relative z-20">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={`absolute z-10 pt-[calc(3rem+2px)] -top-[2px] -right-4 pointer-events-none opacity-0 scale-95 transform origin-top transition-all duration-200 ease-out ${
                      visible
                        ? "group-hover/filter:opacity-100 group-hover/filter:scale-100 group-hover/filter:pointer-events-auto"
                        : ""
                    }`}
                  >
                    <div className="max-w-96 w-max rounded-lg p-4 bg-white border-2 border-[#f4f4f4] flex flex-col gap-2">
                      <div className="w-full flex flex-wrap flex-row-reverse gap-2">
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
                              onClick={() => {onSearchDelete(); window.scrollTo({ top: 0, behavior: 'smooth'})}}
                              className="cursor-pointer"
                            >
                              <IconX size={16} />
                            </div>
                          </div>
                        )}
                        {tags.map((item: { id: number; name: string }) => (
                          <TagSelected
                            key={item.id}
                            title={item.name}
                            onDelete={() => {onTagDelete(item.id); window.scrollTo({ top: 0, behavior: 'smooth'})}}
                          />
                        ))}
                        <div
                          onClick={openFilterPopup}
                          className="group/addtag h-8 px-3 flex items-center gap-1 hover:cursor-pointer bg-[#f4f4f4] border-[#f4f4f4] rounded-lg hover:bg-[#e7e7e7] transition-all"
                        >
                          <svg
                            className="rotate-45 fill-[#a6a6a6] group-hover/addtag:fill-[#6a6a6a] transition-all"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6.11612 6.11612C6.60427 5.62796 7.39573 5.62796 7.88388 6.11612L12 10.2322L16.1161 6.11612C16.6043 5.62796 17.3957 5.62796 17.8839 6.11612C18.372 6.60427 18.372 7.39573 17.8839 7.88388L13.7678 12L17.8839 16.1161C18.372 16.6043 18.372 17.3957 17.8839 17.8839C17.3957 18.372 16.6043 18.372 16.1161 17.8839L12 13.7678L7.88388 17.8839C7.39573 18.372 6.60427 18.372 6.11612 17.8839C5.62796 17.3957 5.62796 16.6043 6.11612 16.1161L10.2322 12L6.11612 7.88388C5.62796 7.39573 5.62796 6.60427 6.11612 6.11612Z" />
                          </svg>
                          <p className="text-xs font-medium text-[#a6a6a6] group-hover/addtag:text-[#6a6a6a] transition-all">
                            Add tag
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleFocus}
                  className="h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20"
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
              </>
            ) : page === "about" ? (
              <>
                <div
                  className="h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20 relative group/emoji"
                >
                  <div className="text-lg">😀</div>
                  <div className="absolute mt-[calc(3rem+2px)] -top-[2px] left-1/2 -translate-x-1/2 py-1 px-3 bg-white border-2 border-[#f4f4f4] rounded-lg text-xs opacity-0 scale-95 transition-all group-hover/emoji:opacity-100 group-hover/emoji:scale-100 pointer-events-none">Hello!</div>
                </div>
              </>
            ) : page === "layout" ? (
              <>
                <div className="flex gap-2 justify-end">
                  <div
                    onClick={gotoEditables}
                    className="h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7H11M14 17H5"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={gotoSnippet}
                    className="h-9 w-9 flex justify-center items-center rounded-lg border-2 border-[#f4f4f4] hover:bg-[#e7e7e7] hover:border-[#e7e7e7] hover:cursor-pointer transition-all z-20"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 16L22 12L18 8M6 8L2 12L6 16M14.5 4L9.5 20"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>ERROR UNRECOGNIZED PAGE</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
