import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";

const AboutPage = () => {
  const [logoRotate, setLogoRotate] = useState(false);

  const handleLogoRotate = () => {
    setLogoRotate(!logoRotate);
  }

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
        <div className="mx-48 pt-48 pb-16">
          <div className="flex flex-col justify-center items-center">
            <p className="spacemono text-lg font-bold -mt-1 tracking-tighter text-white">
              layzy
            </p>
            <h1 className="pt-4 text-[4rem] font-bold leading-[4.5rem] tracking-tight text-white text-center">
              Helps lazy web designers <br/> be even lazier.
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-48 flex justify-center mt-16 mb-64">
        <div
          className={`h-[10rem] w-[10rem] relative overflow-hidden transition-all duration-[2s] cursor-pointer ${logoRotate ? "rotate-180" : ""}`} 
          onClick={() => handleLogoRotate()}
        >
          <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="300" height="300" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="3" fill="black" >
              <animate
                attributeName="r"
                values="3;4.5;0;3;3"
                dur="3s"
                keyTimes="0;0.15;.3;.5;1"
                calcMode="spline"
                keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
                repeatCount="indefinite"
              />
              <animate
                attributeName="visibility"
                values="hidden;visible;hidden;hidden"
                dur="6s"
                keyTimes="0;.15;.65;1"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d="M50,25 A25,25 0 0,1 50,75"
              fill="none"
              stroke="black"
              stroke-width="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="visibility"
                values="hidden;visible;hidden;hidden"
                dur="6s"
                keyTimes="0;.075;.575;1"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M50,25 A25,25 0 0,0 50,75"
              fill="none"
              stroke="black"
              stroke-width="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="visibility"
                values="hidden;visible;hidden;hidden"
                dur="6s"
                keyTimes="0;.075;.575;1"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M50,25 A12.5,25 0 0,1 50,75"
              fill="none"
              stroke="black"
              stroke-width="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75"
                dur="3s"
                keyTimes="0;.15;.3;.5;1"
                calcMode="spline"
                keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M50,25 A12.5,25 0 0,0 50,75"
              fill="none"
              stroke="black"
              stroke-width="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75"
                dur="3s"
                keyTimes="0;.15;.3;.5;1"
                calcMode="spline"
                keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
                repeatCount="indefinite"
              />
            </path>
          </svg>
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
