import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import About from "./aboutpage/AboutPage.tsx";
import LayoutPage from "./layoutpage/LayoutPage.tsx";
import LandingPage from "./landingpage/LandingPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/layout",
    element: <App />,
  },
  {
    path: "/wireframe/:id",
    element: <LayoutPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
