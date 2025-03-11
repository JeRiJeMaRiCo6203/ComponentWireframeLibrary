import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import SearchSection from "./search/SearchSection";
import { Link } from "react-router-dom";
import Layout from "./interfaces/Layout";
import { api } from "./config/api";
import LayoutPage from "./layoutpage/LayoutPage";

function App() {
  const [layouts, setLayouts] = useState<Layout[]>([]);

  // Get all layout
  useEffect(() => {
    api.get(`/wireframes/`).then((response) => {
      setLayouts(response.data);
    });
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

  return (
    <body className="bg-white w-full">
      <Navbar />
      <SearchSection />
      <div className="grid grid-cols-3 gap-16 mx-48 pt-16">
        {layouts.map((layout) => (
          <Link to={`/layout/${layout.id}`} key={layout.id}>
            <div className="w-full">
              <img
                className="rounded-lg"
                src="https://ik.imagekit.io/3wycpjx1go/Product-Landing-Page-Example.png?updatedAt=1726545222002"
                width="100%"
                alt=""
              />
              <p className="pt-2">{layout.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-[100rem]"></div>
    </body>
  );
}

export default App;
