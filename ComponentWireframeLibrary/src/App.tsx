import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import SearchSection from "./search/SearchSection";
import { Link } from "react-router-dom";

interface LayoutModel {
  id: number;
  title: string;
  codestringhtml: string;
  codestringreact: string;
  codestringlaravel: string;
  codestringcss: string;
  cover: string;
}

function App() {
  // dev url
  const url = "http://localhost:3000";
  const [layouts, setLayouts] = useState<LayoutModel[]>([]);

  // fetch data from database
  useEffect(() => {
    fetch(url + "/api/wireframes/")
      .then((response) => response.json())
      .then((data) => setLayouts(data));
  }, []);

  return (
    <body className="bg-white w-full">
      <Navbar />
      <SearchSection />
      <div className="grid grid-cols-3 gap-16 mx-48 pt-16">
        {layouts.map((layout) => (
          <Link to={`/layout/${layout.id}`}>
            <div className="w-full">
              <img
                className="rounded-lg"
                src="layout-1.png"
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
