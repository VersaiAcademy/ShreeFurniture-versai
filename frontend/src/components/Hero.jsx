import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // All images combined for mobile slider
  const allImages = [
    {
      id: 1,
      imageUrl: "/home/Home Page Banner 1440x879 (1).png",
      title: "Relax in Premium quality"
    },
    {
      id: 2,
      imageUrl: "/home/Home Page Banner 1440x879 (2).png",
      title: "Modern Bedroom Collection"
    },
    {
      id: 3,
      imageUrl: "/home/Home Page Banner 1440x879.png",
      title: "Comfort Redefined"
    },
    {
      id: 4,
      imageUrl: "/Sri/IMG_5693.jpeg",
      title: "Family Time Essentials"
    },
    {
      id: 5,
      imageUrl: "/india/Header web banner png Tv.png",
      title: "Special Deal"
    },
    {
      id: 6,
      imageUrl: "/india/Header web banner Chest of Drawer.png",
      title: "Promotional Banner"
    }
  ];

  // Main carousel banners for desktop (first 4 images)
  const mainBanners = allImages.slice(0, 4);

  // Top small banner
  const topSmallBanner = allImages[4];

  // Bottom small banner
  const bottomSmallBanner = allImages[5];

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const slideCount = isMobile ? allImages.length : mainBanners.length;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, allImages.length, mainBanners.length]);

  const nextSlide = () => {
    const slideCount = isMobile ? allImages.length : mainBanners.length;
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    const slideCount = isMobile ? allImages.length : mainBanners.length;
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Mobile Single Slider View
  if (isMobile) {
    return (
      
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[450px] rounded-xl overflow-hidden bg-gray-100 shadow-xl group">
            
            {/* All Images in Single Slider */}
            <div className="relative w-full h-full">
              {allImages.map((banner, index) => (
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
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      willChange: 'opacity'
                    }}
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10 shadow-lg active:scale-95"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10 shadow-lg active:scale-95"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator - All 6 dots */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white w-7 sm:w-8"
                      : "bg-white/60 hover:bg-white/90 w-2 sm:w-2.5"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (Original 3-column design)
  return (
    <div className="w-full px-3 sm:px-4 md:px-2 lg:px-4 py-3 sm:py-4 md:py-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          
          {/* Left: Main Carousel Banner - Takes 8 columns on desktop */}
          <div className="col-span-8">
            <div className="relative w-full h-[480px] xl:h-[540px] rounded-xl overflow-hidden bg-gray-100 shadow-xl group">
              
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
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        willChange: 'opacity'
                      }}
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
                {mainBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-10"
                        : "bg-white/60 hover:bg-white/90 w-2.5"
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
            <div className="relative w-full h-[257px] xl:h-[267px] rounded-xl overflow-hidden shadow-xl group">
              <img
                src={topSmallBanner.imageUrl}
                alt={topSmallBanner.title}
                className="w-full h-full object-cover object-center"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop';
                }}
              />
            </div>

            {/* Bottom Small Banner */}
            <div className="relative w-full h-[257px] xl:h-[267px] rounded-xl overflow-hidden shadow-xl group">
              <img
                src={bottomSmallBanner.imageUrl}
                alt={bottomSmallBanner.title}
                className="w-full h-full object-cover object-center"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
