import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar
        page={'about'}
        openFilterPopup={() => {}} 
        tags={undefined} 
        onTagDelete={() => {}}
        handleFocus={() => {}}
        onSearchDelete={() => {}}
        searchTerm={undefined} 
        gotoEditables={() => {}}
        gotoSnippet={() => {}}
      />
      <div className="bg-gradient-to-tr from-[#DF99F7] to-[#FFDBB0]">
        <div className="mx-48 pt-48 pb-28 mb-64">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 97C75.9574 97 97 75.9574 97 50C97 24.0426 75.9574 3 50 3M50 97C24.0426 97 3 75.9574 3 50C3 24.0426 24.0426 3 50 3M50 97C64.9906 97 77.1429 75.9574 77.1429 50C77.1429 24.0426 64.9906 3 50 3M50 97C35.0094 97 22.8571 75.9574 22.8571 50C22.8571 24.0426 35.0094 3 50 3M53 50C53 51.6569 51.6569 53 50 53C48.3431 53 47 51.6569 47 50C47 48.3431 48.3431 47 50 47C51.6569 47 53 48.3431 53 50Z"
                stroke="white"
                stroke-width="6"
              />
            </svg>
            <p className="spacemono text-lg font-bold -mt-1 tracking-tighter text-white">
              layzy
            </p>
            <h1 className="pt-4 spacemono text-[3rem] font-bold leading-[3rem] tracking-tight text-white text-center">
              A wireframe library, made to help you develop astonishing interfaces.
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-48 flex justify-center my-64">
        <div className='max-w-[32rem] w-full'>
          <div className="text-xs text-[#a6a6a6] text-center">About Us</div>
          <div className="my-4">
            We are a team of passionate developers dedicated to creating high-quality wireframe libraries to help you build amazing user interfaces. Our goal is to provide you with the tools you need to bring your ideas to life.
          </div>
          <div className="mb-4">
            Our library is designed to be easy to use and highly customizable, so you can create the perfect wireframe for your project. Whether you're a seasoned developer or just getting started, we're here to help you succeed.
          </div>
        </div>
      </div>
      <div className="mx-48 my-64">
        <div className="text-xs text-[#a6a6a6] text-center">Meet the Devs</div>
        <div className="mt-4 flex justify-evenly">
          <div className="text-center hover:scale-105 transition-all">
            <div className="text-[8rem] cursor-default">🤓</div>
            <div className="-mt-2">Syafiq</div>
          </div>
          <div className="text-center hover:scale-105 transition-all">
            <div className="text-[8rem] cursor-default">🫰</div>
            <div className="-mt-2">Jerico</div>
          </div>
          <div className="text-center hover:scale-105 transition-all">
            <div className="text-[8rem] cursor-default">🗿</div>
            <div className="-mt-2">Matthew</div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AboutPage;
