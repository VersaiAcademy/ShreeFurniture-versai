import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Main carousel banners (4-5 images)
  const mainBanners = [
    {
      id: 1,
      imageUrl: "/home/Home Page Banner 1440x879 (1).png",
      title: "Relax in Premium quality",
      subtitle: "Lounge Chair",
      offer: "UPTO 50% OFF",
      description: "on all chairs",
      buttonText: "BUY NOW",
      bgColor: "from-amber-700/80 to-amber-900/80"
    },
    {
      id: 2,
      imageUrl: "/home/Home Page Banner 1440x879 (2).png",
      title: "Modern Bedroom Collection",
      subtitle: "Luxury Beds",
      offer: "₹5000 OFF",
      description: "Premium Quality",
      buttonText: "SHOP NOW",
      bgColor: "from-gray-800/80 to-gray-900/80"
    },
    {
      id: 3,
      imageUrl: "/home/Home Page Banner 1440x879.png",
      title: "Comfort Redefined",
      subtitle: "Sofa Collection",
      offer: "UPTO 40% OFF",
      description: "Exclusive Designs",
      buttonText: "EXPLORE",
      bgColor: "from-blue-800/80 to-blue-900/80"
    },
    {
      id: 4,
      imageUrl: "/Sri/IMG_5693.jpeg",
      title: "Family Time Essentials",
      subtitle: "Dining Sets",
      offer: "UPTO 35% OFF",
      description: "Premium Wood Finish",
      buttonText: "VIEW MORE",
      bgColor: "from-green-800/80 to-green-900/80"
    }
  ];

  // Top small banner
  const topSmallBanner = {
    id: 5,
    imageUrl: "/home/Header Web Baneer (1) (1).png",
    tag: "",
    subtitle: "",
    tagColor: ""
  };

  // Bottom small banner
  const bottomSmallBanner = {
    id: 6,
    imageUrl: "/home/Header Web Baneer Jpeg (1).jpg",
    tag: "",
    tagColor: ""
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mainBanners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainBanners.length) % mainBanners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full px-3 sm:px-4 md:px-2 lg:px-4 py-3 sm:py-4 md:py-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          
          {/* Left: Main Carousel Banner - Takes 8 columns on desktop */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-[200px] xs:h-[240px] sm:h-[300px] md:h-[420px] lg:h-[480px] xl:h-[540px] rounded-xl overflow-hidden bg-gray-100 shadow-xl group">
              
              {/* Carousel Images */}
              <div className="relative w-full h-full">
                {mainBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-2.5 z-10">
                {mainBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 sm:h-2 md:h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-6 sm:w-8 md:w-10"
                        : "bg-white/60 hover:bg-white/90 w-1.5 sm:w-2 md:w-2.5"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Top and Bottom Small Banners - Takes 4 columns on desktop */}
         <div className="hidden sm:grid lg:col-span-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-2 md:gap-3 lg:gap-2">
            
            {/* Top Small Banner */}
            <div className="relative w-full h-[150px] xs:h-[180px] sm:h-[200px] md:h-[240px] lg:h-[237px] xl:h-[267px] rounded-xl overflow-hidden shadow-xl group">
              <img
                src={topSmallBanner.imageUrl}
                alt="Special Deal Banner"
                className="w-full h-full object-cover object-center transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop';
                }}
              />
              {/* Optional overlay with text */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-2">
                    {topSmallBanner.tag}
                  </span>
                  <p className="text-white text-sm font-semibold">{topSmallBanner.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Bottom Small Banner */}
            <div className="relative w-full h-[150px] xs:h-[180px] sm:h-[200px] md:h-[240px] lg:h-[237px] xl:h-[267px] rounded-xl overflow-hidden shadow-xl group">
              <img
                src={bottomSmallBanner.imageUrl}
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop';
                }}
              />
              {/* Optional overlay with text */}
              <div className="absolute inset-0 opacity-0 duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full">
                    {bottomSmallBanner.tag}
                  </span>
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
