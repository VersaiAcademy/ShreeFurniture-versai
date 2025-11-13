
import React from "react";
import { faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoreLocator from "../components/store";
import Toppicks from "../components/ProductCategory";
import Hero from "../components/Hero";
import RecommendedProducts from "../components/RecommendedProducts";

const Homepage = () => {

  return (
    <div>
     <Hero/>
      
      <div className="banner pt-5 px-10 rounded-md">
        <img className="rounded-md" 
         src="/india/2624x308 Pixle (3).jpg" alt="" />
      </div>
      
      <Toppicks/>

      <div className="banner pt-5 px-10 rounded-md ">
        <img
        className="rounded-md" 
        src="/Sri/2624x308 Pixle.jpg" alt="" />
      </div>

  <div className="pt-10 pb-10 px-5 md:px-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800 mb-3">
            India's Finest Online Furniture Brand
          </h1>
          <p className="text-center text-sm md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Buy Furniture Online from our extensive collection of wooden furniture units
          </p>

          <div className="space-y-4 md:space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/dining" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/india/IMG_5698.JPG"
                  alt="Dining Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
              <a href="/sofa" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/india/IMG_5696.JPG"
                  alt="Sofa Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
              <a href="/bedroom" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/india/IMG_5697.JPG"
                  alt="Bedroom Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/living-room" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/images/Web 1.jpg"
                  alt="Living Room Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
              <a href="/study-table" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/images/Web 2.jpg"
                  alt="Study Table Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
              <a href="/center-table" className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-full object-cover"
                  src="/images/Web 3.jpg"
                  alt="Center Table Collection"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-10 border-gray-200" />
      </div>
      
      {/* Recommended Products Component */}
      <RecommendedProducts />

      {/* setcion start */}
      
      <div className="pt-5 px-5">
  <div className="flex flex-col md:flex-row mb-10">
    <div className="pt-0 md:pt-10 cursor-pointer" onClick={() => window.location.href = '/living-room'}>
      <img
        src="/india/Living Room 2.jpg"
        alt="Living Room"
        className="w-[50rem]"
      />
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex pl-0 md:pl-10 gap-3 pt-5 md:pt-10">
        <div className="cursor-pointer" onClick={() => window.location.href = '/living-room'}>
          <img
            src="/Sri/5.jpg"
            alt="Living Room"
            className="w-96"
          />
        </div>
        <div className="cursor-pointer" onClick={() => window.location.href = '/living-room'}>
          <img
            src="/Sri/6.jpg"
            alt="Living Room"
            className="w-96"
          />
        </div>
      </div>
      <div className="flex justify-between gap-3 pl-0 md:pl-10">
        <div className="cursor-pointer" onClick={() => window.location.href = '/living-room'}>
          <img
            src="/Sri/7.jpg"
            alt="Living Room"
            className="w-96"
          />
        </div>
        <div className="cursor-pointer" onClick={() => window.location.href = '/living-room'}>
          <img
            src="/Sri/8.jpg"
            alt="Living Room"
            className="w-96"
          />
        </div>
      </div>
    </div>
  </div>
  <hr />
</div>


  

      <div className="pt-3 pb-3 px-10 bg-pink-50">
        <div className="flex justify-between items-center">
          <div>
            {" "}
            <h3 className="text-3xl  font-bold">
              Home Furnishing Items
            </h3>
            <p className="pb-3  text-gray-400 ">
              Give Your Home A Touch Of WOW
            </p>
          </div>
          <div>
            <button className="bg-gray-300 p-2 border-black border focus:border-orange-300 rounded-sm">
              VIEW ALL <span className="text-xl">{">"}</span>
            </button>
          </div>
        </div>

        <div className="pt-3 flex flex-col gap-3  overflow-hidden pb-4">
          <div className="flex justify-center gap-4 h-24 md:h-96">
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/curtain.jpg"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/bed.webp"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/sofacover.jpg"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 h-24 md:h-96">
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/mat.jpg"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/bed2.webp"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
            <div className=" w-48 md:w-[25rem] h-52 md:h-96 overflow-hidden bg-white p-2 rounded-md flex flex-col ">
              <img
                className="object-cover rounded-md transition-transform transform-gpu hover:scale-105 w-auto h-72 "
                src="/images/table.jpg"
                alt="Image"
              />
              <p className="pt-2 pb-2 text-center">
                <h2 className="text-xl">Curtains</h2>
                <h6 className=""> 560+Options | From Rs 380</h6>
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      {/* <div className="p-5 flex gap-3 flex-col md:flex-row justify-center">
        <img
          src="/images/new-mattress-banner.jpg"
          alt=""
          className="w-auto md:w-[45rem]"
        />
        <img
          src="/images/new-temple-banner.jpg"
          alt=""
          className="w-auto md:w-[45rem]"
        />
      </div> */}

     <div className="pt-5 px-5">
  <div className="flex flex-col md:flex-row mb-10 gap-5">
    {/* Main Big Image */}
    <a href="/dining" className="pt-0 md:pt-10 cursor-pointer group">
      <img 
        src="/dining/Web Dining table Sets.jpg" 
        alt="Dining Table Sets" 
        className="w-full md:w-[50rem]  transition-transform transform-gpu group-hover:scale-[1.02] shadow-md hover:shadow-xl" 
      />
    </a>

    {/* Right Section (Smaller Images) */}
    <div className="flex flex-col gap-5">
      <div className="flex pl-0 md:pl-10 gap-5 pt-5 md:pt-10">
        <a href="/dining" className="flex-1 group cursor-pointer">
          <img
            src="/dining/1.jpg"
            alt="Dining Furniture"
            className="object-cover  transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
          />
        </a>
        <a href="/dining" className="flex-1 group cursor-pointer">
          <img
            src="/dining/2.jpg"
            alt="Dining Furniture"
            className="object-cover  transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
          />
        </a>
      </div>

      <div className="flex pl-0 md:pl-10 gap-5">
        <a href="/dining" className="flex-1 group cursor-pointer">
          <img
            src="/dining/3.jpg"
            alt="Dining Furniture"
            className="object-cover  transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
          />
        </a>
        <a href="/dining" className="flex-1 group cursor-pointer">
          <img
            src="/dining/4.jpg"
            alt="Dining Furniture"
            className="object-cover transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
          />
        </a>
      </div>
    </div>
  </div>
  <hr />
</div>


      

      <StoreLocator/>
     

      <div className="pt-10 pb-10 px-5 md:px-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
              Customer Reviews & Experience
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              See what our customers say about their furniture journey
            </p>
          </div>

          {/* Video Section - Center */}
          <div className="mb-10">
            <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl group">
              <video
                className="w-full h-auto"
                controls
                poster="/india/SFV Thumbnail (1).jpg"
              >
                <source src="/india/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Play Button Overlay (optional) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300 pointer-events-none">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );

};

export default Homepage;
