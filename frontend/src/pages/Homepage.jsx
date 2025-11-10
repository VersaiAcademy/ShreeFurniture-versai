
import React from "react";
import { faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoreLocator from "../components/store";
import Toppicks from "../components/ProductCategory";
import Hero from "../components/Hero";

const Homepage = () => {

  // Hardcoded banners - yaha apni images ka path daal do
  // const mainBanner = {
  //   id: 1,
  //   imageUrl: "/Sri/IMG_5693.jpeg",
  //   title: "Dining Set"
  // };

  // const topSmallBanner = {
  //   id: 2,
  //   imageUrl: "/Sri/IMG_5694.JPG",
  //   title: "Bed Special Deal",
  //   tag: "SPECIAL DEAL",
  //   price: "₹50000 OFF",
  //   subtitle: "INSTANT DISCOUNT",
  //   buttonText: "BUY NOW"
  // };

  // const bottomSmallBanner = {
  //   id: 3,
  //   imageUrl: "/product/Banner.jpg",
  //   title: "Mattress Deal",
  //   tag: "Ships In 2 Days",
  //   price: "₹9,999",
  //   subtitle: "FREE Delivery Available",
  //   buttonText: "BUY NOW"
  // };

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
      <div className="pt-5 px-5">
        <h3 className="text-2xl  font-bold">Recomended For You</h3>
        <p className="pb-3 ">Dive Into Your Tailored Selections Today!</p>
        <div className="flex flex-col md:flex-row mb-10">
          <div className="pt-0 md:pt-10">
            <div className="cursor-pointer relative top-8">
              <span className="bg-orange-400 text-white rounded-l-md p-1">
                BIG DEAL
              </span>
              <span className="bg-black text-white p-1 rounded-r-md">58%</span>
            </div>
            <img src="/images/cst1.webp" alt="" />
            <p className="text-xl font-mono">Fabric sofa</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex pl-0 md:pl-10 gap-3">
              <div>
                <div className="cursor-pointer relative top-8">
                  <span className="bg-orange-400 text-white rounded-l-md p-1">
                    BIG DEAL
                  </span>
                  <span className="bg-black text-white p-1 rounded-r-md">
                    58%
                  </span>
                </div>
                <img src="/images/cst2.webp" alt="" className="w-96" />
                <p className="text-xl font-mono">Fabric sofa</p>
              </div>
              <div>
                <div className="cursor-pointer relative top-8">
                  <span className="bg-orange-400 text-white rounded-l-md p-1">
                    BIG DEAL
                  </span>
                  <span className="bg-black text-white p-1 rounded-r-md">
                    58%
                  </span>
                </div>
                <img src="/images/cst3.webp" alt="" className="w-96" />
                <p className="text-xl font-mono">Fabric sofa</p>
              </div>
            </div>
            <div className="flex justify-between gap-3 pl-0 md:pl-10">
              <div>
                <div className="cursor-pointer relative top-8">
                  <span className="bg-orange-400 text-white rounded-l-md p-1">
                    BIG DEAL
                  </span>
                  <span className="bg-black text-white p-1 rounded-r-md">
                    58%
                  </span>
                </div>
                <img src="/images/cst1.webp" alt="" className="w-96" />
                <p className="text-xl font-mono">Fabric sofa</p>
              </div>
              <div>
                <div className="cursor-pointer relative top-8">
                  <span className="bg-orange-400 text-white rounded-l-md p-1">
                    BIG DEAL
                  </span>
                  <span className="bg-black text-white p-1 rounded-r-md">
                    58%
                  </span>
                </div>
                <img src="/images/cst1.webp" alt="" className="w-96" />
                <p className="text-xl font-mono">Fabric sofa</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* setcion start */}
      <div className="pt-5 px-5">
        <h3 className="text-2xl  pb-3 font-bold">
          Best-Sellers Of The Season
        </h3>

        <div
          id="default-carousel"
          className="relative w-[29rem] md:w-[1450px] h-60 md:h-[500px] "
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-[40rem]">
            {/* Item 1 */}
            <div
              className=" hidden duration-700 ease-in-out "
              data-carousel-item=""
            >
              <div className="flex justify-between">
                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs1.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>
                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs2.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>
                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs4.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" hidden duration-700 ease-in-out "
              data-carousel-item=""
            >
              <div className="flex justify-between">
                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs3.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>

                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs5.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>
                <div className="relative w-48 md:w-[30rem] h-96 md:h-[40rem] overflow-hidden cursor-pointer">
                  <img
                    className="object-cover rounded-md transition-transform transform-gpu hover:scale-105"
                    src="/images/cs6.webp"
                    alt="Image"
                  />
                  <p>Walken Bed With Storage (King Size, Honey Finish)</p>

                  <p>
                    <b>Rs 43,898 </b>
                    <del>Rs 73,898 </del>
                    <span className="text-green-300 pl-3">39% OFF</span>
                  </p>
                  <p className="text-orange-400">
                    <FontAwesomeIcon icon={faTruck} />
                    Ship in 2 Days
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to={0}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to={1}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to={2}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to={3}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to={4}
            />
          </div>
          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>

        <hr />
      </div>
      <div className="pt-5 px-5">
        <div className="flex justify-between items-center">
          <div>
            {" "}
            <h3 className="text-2xl  font-bold">
              Living Room Furniture
            </h3>
            <small className="pb-3 font-bold text-gray-400 ">
              Let’s Brew N Binge
            </small>
          </div>
          <div>
            <button className="bg-gray-300 p-2 border-black border focus:border-orange-300 rounded-sm">
              VIEW ALL <span className="text-xl">{">"}</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-10">
          <div className="pt-0 md:pt-10">
            <img
              src="/images/living-furniture1.jpg"
              alt=""
              className="w-[50rem]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex pl-0 md:pl-10 gap-3 pt-5 md:pt-10">
              <div>
                <img
                  src="/Sri/5.jpg"
                  alt=""
                  className="w-96"
                />
                {/* <p className="text-xl font-mono">Fabric sofa</p> */}
              </div>
              <div>
                <img
                  src="/Sri/6.jpg"
                  alt=""
                  className="w-96"
                />
                {/* <p className="text-xl font-mono">Fabric sofa</p> */}
              </div>
            </div>
            <div className="flex justify-between gap-3 pl-0 md:pl-10">
              <div>
                <img
                  src="/Sri/7.jpg"
                  alt=""
                  className="w-96"
                />
                {/* <p className="text-xl font-mono">Fabric sofa</p> */}
              </div>
              <div>
                <img
                  src="/Sri/8.jpg"
                  alt=""
                  className="w-96"
                />
                {/* <p className="text-xl font-mono">Fabric sofa</p> */}
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
          <a href="/dining" className="pt-0 md:pt-10 cursor-pointer group">
            <img 
              src="/dining/Web Dining table Sets.jpg" 
              alt="Dining Table Sets" 
              className="w-full md:w-[50rem] rounded-lg transition-transform transform-gpu group-hover:scale-[1.02] shadow-md hover:shadow-xl" 
            />
          </a>
          <div className="flex flex-col gap-5">
            <div className="flex pl-0 md:pl-10 gap-5 pt-5 md:pt-10">
              <a href="/dining" className="flex-1 group cursor-pointer">
                <img
                  src="/dining/1.jpg"
                  alt="Dining Furniture"
                  className="object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
                />
              </a>
              <a href="/dining" className="flex-1 group cursor-pointer">
                <img
                  src="/dining/2.jpg"
                  alt="Dining Furniture"
                  className="object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
                />
              </a>
            </div>
            <div className="flex pl-0 md:pl-10 gap-5">
              <a href="/dining" className="flex-1 group cursor-pointer">
                <img
                  src="/dining/3.jpg"
                  alt="Dining Furniture"
                  className="object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
                />
              </a>
              <a href="/dining" className="flex-1 group cursor-pointer">
                <img
                  src="/dining/4.jpg"
                  alt="Dining Furniture"
                  className="object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105 w-full h-72 shadow-md hover:shadow-xl"
                />
              </a>
            </div>
          </div>
        </div>
        <hr />
      </div>

      

      <StoreLocator/>
      {/* <div className="p-3 ">
        <p className="text-center text-3xl  pb-10 pt-5">
          14+ Experience Stores Across India
        </p>
        <div className="flex text-center gap-3 flex-col ">
          <div className="flex items-center  justify-center gap-5">
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/Sri/bangalore.jpg"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Banglore
              </p>
            </div>
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/Sri/Bhubaneshwar.jpg"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Bhubaneshwar
              </p>
            </div>
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/Sri/HYDRABAD Miyapur.png"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Hydrabad
              </p>
            </div>
          </div>
          <div className="flex items-center  justify-center gap-5">
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/images/37.jpg"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Udaipur
              </p>
            </div>
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/images/lucknow.jpg"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Lucknow
              </p>
            </div>
            <div className="relative group">
              <img
                className="h-auto w-96 rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src="/images/kirtinagar.jpg"
                alt="image description"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg  ">
                Krithinagar
              </p>
            </div>
          </div>
          <div>
            <button className="bg-orange-600 rounded-md text-white h-10 w-60 cursor-pointer capitalize hover:translate-x-1 items-center text-center">
              explore all experience stores
            </button>
          </div>{" "}
        </div>
      </div> */}

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
