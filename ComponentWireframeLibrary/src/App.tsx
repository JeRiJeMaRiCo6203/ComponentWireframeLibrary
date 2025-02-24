import "./App.css";
import Navbar from "./navbar/Navbar";
import SearchSection from "./search/SearchSection";
import FilterPopup from "./components/FilterPopup";
import { useEffect, useRef, useState } from "react";
import { api } from "./config/api";
import Tag from "./components/Tag";
import Footer from "./navbar/Footer";
import LayoutCard from "./components/LayoutCard";
import { NavLink } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const [filterPopup, setFilterPopup] = useState(false);
  const [selectedTags, setSelectedTags] = useState<
    { id: number; name: string }[]
  >([]);
  const [layouts, setLayouts] = useState<[any[], any[]]>([[], []]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  const getLayouts = (tagIds: number[] = [], searchInput: string = "") => {
    const tagIdsFilter =
      tagIds.length > 0 ? `&categoryIds=${tagIds.join(",")}` : "";
    const searchFilter = searchInput ? `&searchKeyword=${searchInput}` : "";
    const url = `/wireframesCategories?${tagIdsFilter}${searchFilter}`;

    console.log("url", url);

    api.get<{ data: any[] }>(url).then((res: any) => {
      let tempLayouts = res.data.layouts.map((data: any) => {
        return {
          id: data.id,
          name: data.title,
          image: data.cover,
          tags: data.categories.sort((a: any, b: any) => a.localeCompare(b)),
        };
      });
      let tempRelatedLayouts = res.data.related.map((data: any) => {
        return {
          id: data.id,
          name: data.title,
          image: data.cover,
          tags: data.categories.sort((a: any, b: any) => a.localeCompare(b)),
        };
      });

      console.log("tempLayouts", tempLayouts);
      console.log("tempRelatedLayouts", tempRelatedLayouts);

      setLayouts([tempLayouts, tempRelatedLayouts]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getLayouts();
  }, []);

  useEffect(() => {
    // console.log("selectedTags", selectedTags)
    getLayouts(
      selectedTags.length > 0 ? selectedTags.map((tag) => tag.id) : [],
      searchInputRef.current?.value
    );
  }, [selectedTags]);

  const openFilterPopup = () => {
    setFilterPopup(true);
  };

  const closeFilterPopup = (scrollToTop: boolean) => {
    setFilterPopup(false);
    if (scrollToTop) {
      handleScroll("search-section");
    }
  };

  const handleTagSelect = (tags: { id: number; name: string }[]) => {
    setSelectedTags(tags);
  };

  const handleTagDelete = (tagId: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

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
      searchInputRef.current.focus({ preventScroll: true });
      searchInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearchDelete = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      getLayouts(
        selectedTags.length > 0 ? selectedTags.map((tag) => tag.id) : [],
        searchInputRef.current?.value
      );
    }
  };

  const handleEnterSearch = () => {
    getLayouts(
      selectedTags.length > 0 ? selectedTags.map((tag) => tag.id) : [],
      searchInputRef.current?.value
    );
  };

  useEffect(() => {
    const handleInputChange = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEnterSearch();
      }
    };

    const inputElement = searchInputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleInputChange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleInputChange);
      }
    };
  }, [searchInputRef, selectedTags]);

  if (loading) {
    return <Loading />;
  }
  return (
    <body className="bg-white w-full">
      <FilterPopup
        isOpen={filterPopup}
        onClose={closeFilterPopup}
        onSaveChanges={handleTagSelect}
        selectedTags={selectedTags}
      />
      <Navbar
        openFilterPopup={openFilterPopup}
        tags={selectedTags}
        onTagDelete={handleTagDelete}
        handleFocus={handleFocus}
        onSearchDelete={handleSearchDelete}
        searchTerm={searchInputRef.current?.value}
        page={"home"}
        gotoEditables={() => {}}
        gotoSnippet={() => {}}
      />
      <SearchSection
        openFilterPopup={openFilterPopup}
        tags={selectedTags}
        onTagDelete={handleTagDelete}
        searchInput={searchInputRef}
        handleEnterSearch={handleEnterSearch}
        searchTerm={searchInputRef.current?.value}
        onSearchDelete={handleSearchDelete}
      />
      <div className="min-h-screen">
        {layouts[0].length > 0 && (
          <div className="grid grid-cols-3 gap-16 mx-48 pt-16">
            {layouts[0].map((layout, index) => (
              <NavLink to={`/wireframe/${layout.id}`}>
                <div key={index}>
                  <LayoutCard
                    id={layout.id}
                    name={layout.name}
                    image={layout.image}
                    tags={layout.tags}
                  />
                </div>
              </NavLink>
            ))}
          </div>
        )}
        {layouts[1].length > 0 && (
          <>
            <div className="mx-48 pt-16 text-xs text-[#a6a6a6]">
              Related by Category
            </div>
            <div className="grid grid-cols-3 gap-16 mx-48 pt-4">
              {layouts[1].map((layout, index) => (
                <NavLink to={`/wireframe/${layout.id}`}>
                  <div key={index}>
                    <LayoutCard
                      id={layout.id}
                      name={layout.name}
                      image={layout.image}
                      tags={layout.tags}
                    />
                  </div>
                </NavLink>
              ))}
            </div>
          </>
        )}
        {layouts[0].length === 0 && layouts[1].length === 0 && (
          <div className="mx-48 pt-16 text-center text-sm">
            <p>No Wireframes Found</p>
          </div>
        )}
      </div>
      <Footer />
    </body>
  );
}

export default App;
