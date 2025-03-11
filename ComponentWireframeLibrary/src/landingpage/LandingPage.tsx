import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1>Layzy</h1>
        <h2>Make web designing great again</h2>
        <div className="flex-row">
          <NavLink to="/layout">
            <button className="bg-blue-300 py-2 px-5 mx-2">Get Started</button>
          </NavLink>
          <NavLink to="https://layzy.gitbook.io/layzy-docs">
            <button className="bg-blue-300 py-2 px-5 mx-2">
              Read the Docs
            </button>
          </NavLink>
          {/* <NavLink to=""> */}
          <button className="bg-blue-300 py-2 px-5 mx-2">About</button>
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
