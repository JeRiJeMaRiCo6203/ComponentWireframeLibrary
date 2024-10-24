import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import Matthew from "./Matthew.tsx";
import Jerico from "./Jerico.tsx";
import About from "./About.tsx";
import Search from "./Search.tsx";  
import Customize from "./Customize.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/matthew",
    element: <Matthew />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/jerico",
    element: <Jerico />,
  },
  {
    path: "/customize",
    element: <Customize />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
