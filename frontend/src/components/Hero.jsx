import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Main carousel banners (4-5 images)
  const mainBanners = [
    {
      id: 1,
      imageUrl: "/Sri/IMG_5692.jpeg",
      title: "Relax in Premium quality",
      subtitle: "Lounge Chair",
      offer: "UPTO 50% OFF",
      description: "on all chairs",
      buttonText: "BUY NOW",
      bgColor: "from-amber-700/80 to-amber-900/80"
    },
    {
      id: 2,
      imageUrl: "/Sri/IMG_5693.jpeg",
      title: "Modern Bedroom Collection",
      subtitle: "Luxury Beds",
      offer: "₹5000 OFF",
      description: "Premium Quality",
      buttonText: "SHOP NOW",
      bgColor: "from-gray-800/80 to-gray-900/80"
    },
    {
      id: 3,
      imageUrl: "/Sri/IMG_5693.jpeg",
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
    imageUrl: "/Sri/Web Baneer (2).jpg",
    tag: "SPECIAL DEAL",
    subtitle: "INSTANT DISCOUNT",
    tagColor: "bg-orange-500"
  };

  // Bottom small banner
  const bottomSmallBanner = {
    id: 6,
    imageUrl: "/Sri/Web Baneer (3).jpg",
    tag: "Ships In 2 Days",
    tagColor: "bg-blue-500"
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
    <div className="px-2 md:px-4 lg:px-8 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-stretch">
        {/* Left: Main Carousel Banner */}
        <div className="lg:col-span-2">
          <div className="relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden bg-gray-100 shadow-lg group">
            {/* Carousel Images */}
            <div className="relative w-full h-[620px]">
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
                    className="w-full h-[426px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-white text-2xl font-bold">‹</span>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-white text-2xl font-bold">›</span>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {mainBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top and Bottom Small Banners */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="flex flex-col gap-2">
            {/* Top Small Banner */}
            <div className="aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
              <img
                src={topSmallBanner.imageUrl}
                alt="Top Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                {/* Optional Text or Tag */}
              </div>
            </div>

            {/* Bottom Small Banner */}
            <div className="aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
              <img
                src={bottomSmallBanner.imageUrl}
                alt="Bottom Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                {/* Optional Text or Tag */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
