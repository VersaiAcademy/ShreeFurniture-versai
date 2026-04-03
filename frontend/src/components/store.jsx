import React, { useState, useEffect, useRef } from 'react';

export default function StoreLocator() {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);

  const stores = [
    {
      name: "Bangalore",
      image: "/Sri/bangalore.jpg",
      location: "https://www.google.com/maps/place/Sri+Furniture+Village/@12.886353,77.7427318,828m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bae6d552e92df95:0x17a35dba51dd0e77!8m2!3d12.886353!4d77.7427318!16s%2Fg%2F11gh3cqq39?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Bhubaneshwar",
      image: "/Sri/Bhubaneshwar.jpg",
      location: "https://www.google.com/maps/place/SRI+FURNITURE+VILLAGE+BHUBANESWAR/@20.2724888,85.8508513,670m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19a7e3cf9a7d2d:0xb59f8efb13d20af0!8m2!3d20.2724888!4d85.8508513!16s%2Fg%2F11sbpvv8fs?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Hyderabad",
      image: "/Sri/HYDRABAD Miyapur.png",
      location: "https://www.google.com/maps/search/shree+furniture+village+HYDERABAD+Miyapur/@17.4958037,78.3561454,17z?entry=s&sa=X&ved=1t%3A199789"
    },
    {
      name: "Guntur",
      image: "/Sri/Guntur.jpg",
      location: "https://www.google.com/maps/search/shree+furniture+village+Guntur/@16.3280899,80.4383042,815m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Autonagar Vijaywada",
      image: "/Sri/autonagar vijaywada.jpg",
      location: "https://www.google.com/maps/place/Sri+Furniture+Village/@16.4909597,80.6694336,814m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a35e5c4c3f6821f:0x3a6979786c6f84e3!8m2!3d16.4909597!4d80.6694336!16s%2Fg%2F11h03dsz0n?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Pune ",
      image: "/Sri/Pune (1).jpg",
      location: "https://maps.app.goo.gl/LSyWZ8k7VHu6cjep6"
    },
    {
      name: "Kondapur",
      image: "/Sri/Kondapur.jpg",
      location: "https://maps.app.goo.gl/ihLKTMDoi2LT1yAr9"
    },
    {
      name: "Seethapuram Vijaywada",
      image: "/Sri/seetapuram, vijaywada.jpg",
      location: "https://www.google.com/maps/place/Sri+Furniture+Village/@16.4909597,80.6694336,814m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a35e5c4c3f6821f:0x3a6979786c6f84e3!8m2!3d16.4909597!4d80.6694336!16s%2Fg%2F11h03dsz0n?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Pawan Handicraft",
      image: "/Sri/pawan handicrafft.png",
      location: "https://www.google.com/maps/search/shree+furniture+village+pawan+handicrafts/@50.5455636,71.490629,8843607m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Narsingi",
      image: "/Sri/Narsingi.jpeg",
      location: "https://maps.app.goo.gl/nFTLzp5nZrWMqnnV9"
    },
    {
      name: "Satun Art Palace",
      image: "/Sri/satun art palace.png",
      location: "https://maps.google.com/?q=Pune+India"
    },
    {
      name: "Satyun Handicraft",
      image: "/Sri/satyun handicraftt.png",
      location: "https://www.google.com/maps/place/Satyun+Handicrafts+-+Satyun/data=!4m2!3m1!1s0x0:0xe69db63cf2566155?sa=X&ved=1t:2428&ictx=111"
    },
    {
      name: "Satyun Art Export",
      image: "/Sri/satyyun art export.png",
      location: "https://www.google.com/maps/place/Satyun+Handicrafts+-+Satyun/data=!4m2!3m1!1s0x0:0xe69db63cf2566155?sa=X&ved=1t:2428&ictx=111"
    },
  ];

  const displayedStores = showAll ? stores : stores.slice(0, 6);

  // Auto-scroll effect for mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScroll = () => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;

      // If reached end, scroll back to start
      if (currentScroll + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by one card width (288px = w-72)
        container.scrollBy({ left: 288, behavior: 'smooth' });
      }
    };

    // Start auto-scroll after 5 seconds, then every 5 seconds
    const intervalId = setInterval(autoScroll, 5000);

    // Stop auto-scroll when user manually scrolls
    const handleUserScroll = () => {
      clearInterval(intervalId);
    };

    container.addEventListener('touchstart', handleUserScroll);
    container.addEventListener('mousedown', handleUserScroll);

    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener('touchstart', handleUserScroll);
        container.removeEventListener('mousedown', handleUserScroll);
      }
    };
  }, []);

  const handleStoreClick = (location) => {
    window.open(location, '_blank');
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -288, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 288, behavior: 'smooth' });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto" id='location'>
      <p className="text-center text-3xl font-semibold pb-10 pt-5">
        14+ Experience Stores Across India
      </p>
      
      <div className="flex flex-col gap-8">
        {/* Mobile view - Horizontal scroll with buttons */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {stores.map((store, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-72 cursor-pointer snap-center"
                onClick={() => handleStoreClick(store.location)}
              >
                <img
                  className="h-64 w-72 object-cover rounded-lg"
                  src={store.image}
                  alt={`${store.name} store`}
                />
                <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-lg bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg">
                  {store.name}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-10"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-10"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop view - Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {displayedStores.map((store, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer"
              onClick={() => handleStoreClick(store.location)}
            >
              <img
                className="h-64 w-96 object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105"
                src={store.image}
                alt={`${store.name} store`}
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-700 p-3 rounded-lg transition-opacity">
                {store.name}
              </p>
            </div>
          ))}
        </div>
        
        {/* Show More/Less button - only for desktop */}
        <div className="text-center hidden md:block">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-orange-600 rounded-md text-white h-12 px-8 cursor-pointer capitalize hover:bg-orange-700 transition-colors font-medium"
          >
            {showAll ? 'Show Less' : 'Explore All Experience Stores'}
          </button>
        </div>
      </div>
    </div>
  );
}