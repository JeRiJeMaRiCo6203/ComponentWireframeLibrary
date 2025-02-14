import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-16 mx-48 px-16 py-8 border-2 border-b-0 border-[#f4f4f4] bg-[#f4f4f4] rounded-t-lg gap-2 text-sm">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <p
            className="hover:text-[#6a6a6a] cursor-pointer transition-all"
            onClick={scrollToTop}
          >
            Back to Top
          </p>
          <div className="h-5 w-[2px] bg-[#e7e7e7]"></div>
          <NavLink to="/">
            <p className="hover:text-[#6a6a6a] cursor-pointer transition-all">
              Home
            </p>
          </NavLink>
          <div className="h-5 w-[2px] bg-[#e7e7e7]"></div>
          <NavLink to="/about">
            <p className="hover:text-[#6a6a6a] cursor-pointer transition-all">
              About
            </p>
          </NavLink>
          <div className="h-5 w-[2px] bg-[#e7e7e7]"></div>
          <a
            className="hover:text-[#6a6a6a] cursor-pointer transition-all"
            href="https://layzy.gitbook.io/layzy-docs/"
            target="_blank"
          >
            Guide
          </a>
        </div>
        <div>2025 © Layzy</div>
      </div>
    </div>
  );
};

export default Footer;