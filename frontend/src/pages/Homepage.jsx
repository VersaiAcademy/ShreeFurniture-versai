
import React from "react";
import { faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoreLocator from "../components/store";
import Toppicks from "../components/ProductCategory";
import Hero from "../components/Hero";
import RecommendedProducts from "../components/RecommendedProducts";

const Homepage = () => {
  console.log('🏠 Homepage component rendering...');

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Banner Section 1 */}
      <div className="pt-5 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="/india/2624x308 Pixle (3).jpg"
              alt="Special Offer Banner"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <Toppicks />

      {/* Banner Section 2 */}
      <div className="pt-5 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="/images/2624x308 Pixle (3).png"
              alt="Featured Collection Banner"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="pt-10 md:pt-16 pb-10 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            India's Finest Online Furniture Brand
          </h1>

          <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Buy Furniture Online from our extensive collection of wooden furniture units
          </p>

          <div className="space-y-4 md:space-y-6">

            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

              {/* Dining */}
              <a href="/dining-kitchen" className="relative overflow-hidden rounded-lg shadow-md bg-white">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/india/IMG_5698.JPG"
                    alt="Dining Collection"
                    loading="lazy"
                  />
                </div>
              </a>

              {/* Sofa */}
              <a href="/sofas" className="relative overflow-hidden rounded-lg shadow-md bg-white">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/india/IMG_5696.JPG"
                    alt="Sofa Collection"
                    loading="lazy"
                  />
                </div>
              </a>

              {/* Bedroom */}
              <a href="/bedroom" className="relative overflow-hidden rounded-lg shadow-md bg-white sm:col-span-2 lg:col-span-1">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/india/IMG_5697.JPG"
                    alt="Bedroom Collection"
                    loading="lazy"
                  />
                </div>
              </a>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

              {/* Living */}
              <a href="/living" className="relative overflow-hidden rounded-lg shadow-md bg-white">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/images/Web 1.jpg"
                    alt="Living Room Collection"
                    loading="lazy"
                  />
                </div>
              </a>

              {/* Study */}
              <a href="/study-tables" className="relative overflow-hidden rounded-lg shadow-md bg-white">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/images/Web 2.jpg"
                    alt="Study Table Collection"
                    loading="lazy"
                  />
                </div>
              </a>

              {/* Center Table */}
              <a href="/coffee-tables" className="relative overflow-hidden rounded-lg shadow-md bg-white sm:col-span-2 lg:col-span-1">
                <div className="w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src="/images/Web 3.jpg"
                    alt="Center Table Collection"
                    loading="lazy"
                  />
                </div>
              </a>
            </div>

          </div>
        </div>

        <hr className="mt-10 md:mt-16 border-gray-200" />
      </div>



      {/* Recommended Products Component */}
      <RecommendedProducts />

      {/* setcion start */}

      <div className="pt-5 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row mb-10 gap-4 lg:gap-6">
          <div className="pt-0 lg:pt-10 cursor-pointer flex-1" onClick={() => window.location.href = '/living'}>
            <img
              src="/india/Living Room 2.jpg"
              alt="Living Room"
              className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
          </div>
          <div className="flex flex-col gap-3 lg:flex-1">
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:pl-10 pt-5 lg:pt-10">
              <div className="cursor-pointer" onClick={() => window.location.href = '/living'}>
                <img
                  src="/Sri/5.jpg"
                  alt="Living Room"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="cursor-pointer" onClick={() => window.location.href = '/living'}>
                <img
                  src="/Sri/6.jpg"
                  alt="Living Room"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:pl-10">
              <div className="cursor-pointer" onClick={() => window.location.href = '/living'}>
                <img
                  src="/Sri/7.jpg"
                  alt="Living Room"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="cursor-pointer" onClick={() => window.location.href = '/living'}>
                <img
                  src="/Sri/8.jpg"
                  alt="Living Room"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200" />
      </div>




      <div className="pt-5 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row mb-10 gap-4 lg:gap-6">
          <div className="pt-0 lg:pt-10 cursor-pointer flex-1" onClick={() => window.location.href = '/dining-kitchen'}>
            <img
              src="/dining/Living Room.png"
              alt="Dining Table Sets"
              className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
          </div>
          <div className="flex flex-col gap-3 lg:flex-1">
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:pl-10 pt-5 lg:pt-10">
              <div className="cursor-pointer" onClick={() => window.location.href = '/dining-kitchen'}>
                <img
                  src="/dining/1.jpg"
                  alt="Dining Furniture"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="cursor-pointer" onClick={() => window.location.href = '/dining-kitchen'}>
                <img
                  src="/dining/2.jpg"
                  alt="Dining Furniture"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:pl-10">
              <div className="cursor-pointer" onClick={() => window.location.href = '/dining-kitchen'}>
                <img
                  src="/dining/3.jpg"
                  alt="Dining Furniture"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="cursor-pointer" onClick={() => window.location.href = '/dining-kitchen'}>
                <img
                  src="/dining/4.jpg"
                  alt="Dining Furniture"
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200" />
      </div>




      <StoreLocator />


      <div className="pt-10 pb-10 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-b from-orange-100 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 md:mb-3 px-2">
              Behind The Scenes: Our Manufacturing Excellence
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black px-4 max-w-3xl mx-auto">
              Take a tour of our state-of-the-art facility where quality meets craftsmanship
            </p>
          </div>

          {/* Video Section - Center */}
          <div className="mb-8 md:mb-10">
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
            <div className="text-center mt-4 md:mt-6 px-4">
              <p className="text-black text-xs sm:text-sm md:text-base">
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
