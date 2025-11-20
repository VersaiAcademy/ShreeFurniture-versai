
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


  

 <div className="pt-5 px-5">
  <div className="flex flex-col md:flex-row mb-10">
    <div className="pt-0 md:pt-10 cursor-pointer" onClick={() => window.location.href = '/dining'}>
      <img
        src="/dining/Web Dining table Sets.jpg"
        alt="Dining Table Sets"
        className="w-full md:w-[50rem] transition-transform transform-gpu hover:scale-[1.02]"
      />
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex pl-0 md:pl-10 gap-3 pt-5 md:pt-10">
        <div className="cursor-pointer" onClick={() => window.location.href = '/dining'}>
          <img
            src="/dining/1.jpg"
            alt="Dining Furniture"
            className="w-full md:w-96 transition-transform transform-gpu hover:scale-105"
          />
        </div>
        <div className="cursor-pointer" onClick={() => window.location.href = '/dining'}>
          <img
            src="/dining/2.jpg"
            alt="Dining Furniture"
            className="w-full md:w-96 transition-transform transform-gpu hover:scale-105"
          />
        </div>
      </div>
      <div className="flex justify-between gap-3 pl-0 md:pl-10">
        <div className="cursor-pointer" onClick={() => window.location.href = '/dining'}>
          <img
            src="/dining/3.jpg"
            alt="Dining Furniture"
            className="w-full md:w-96 transition-transform transform-gpu hover:scale-105"
          />
        </div>
        <div className="cursor-pointer" onClick={() => window.location.href = '/dining'}>
          <img
            src="/dining/4.jpg"
            alt="Dining Furniture"
            className="w-full md:w-96 transition-transform transform-gpu hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
  <hr />
</div>


      

      <StoreLocator/>
     

      <div className="pt-10 pb-5 px-5 md:px-10 bg-gradient-to-b from-orange-100 to-white">
  <div className="max-w-7xl mx-auto">
    {/* Section Heading */}
    <div className="text-center mb-4">
      <h2 className="text-2xl md:text-4xl font-bold text-black mb-3">
        Behind The Scenes: Our Manufacturing Excellence
      </h2>
      <p className="text-sm md:text-lg text-black">
        Take a tour of our state-of-the-art facility where quality meets craftsmanship
      </p>
    </div>

    {/* Video Section - Center */}
    <div className="mb-10">
      <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/WPSjhKGGLog?si=5twZUtGOn30wPlJy"
            title="Manufacturing Unit Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Optional: Additional Info Below Video */}
      <div className="text-center mt-6">
        <p className="text-black text-sm md:text-base">
          🏭 Witness our dedication to quality | ✨ Premium materials & expert craftsmanship | 🔧 Modern manufacturing process
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  );

};

export default Homepage;
