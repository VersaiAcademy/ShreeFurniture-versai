import React, { useState, useEffect } from 'react';
import { MapPin, Users, Star, Award, TrendingUp, Heart, ChevronLeft, ChevronRight, Store, Building2, Factory, Warehouse } from 'lucide-react';
import StoreLocator from "../components/store";


export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Timeline data matching Image 2
  const timeline = [
    { 
      year: '1999', 
      title: 'Humble Beginning', 
      desc: 'Founded in Satyun village, Churu district, Rajasthan. Started with a small workshop and dedicated artisans.'
    },
    { 
      year: '2003', 
      title: 'First Manufacturing unit', 
      desc: 'In 2003, as demand for their finely crafted furniture grew, Satyun Art Palace relocated to the Ramgarh Ricco area. This strategic move enabled the establishment of their first large-scale manufacturing unit.'
    },
    { 
      year: '2007', 
      title: 'German Machinery', 
      desc: 'Sri Furniture Village continued to expand, adding four more manufacturing units. Embracing advanced German furniture machinery.'
    },
    { 
      year: '2010', 
      title: 'First Showroom', 
      desc: 'In a significant milestone, Sri Furniture Village opened its first exclusive Sheesham wood furniture showroom in Hyderabad. The showroom showcased the exquisite range of products and received an overwhelming response from customers.'
    },
    { 
      year: '2020', 
      title: '10+ Experience store Across India', 
      desc: 'Sri Furniture Village boasts a network of ten showrooms across India, located in Pune, Guntur, Vijayawada, Bengaluru, Hyderabad, Visakhapatnam, and other major cities. These showrooms have become the go-to destinations for customers seeking high-quality, beautifully crafted Sheesham wood furniture.'
    },
    { 
      year: '2024', 
      title: 'Embracing the Digital Era', 
      desc: 'In April 2024, under the visionary leadership of Mr. Manish Jangid, Sri Furniture Village proudly stepped into the digital world. With a mission to connect tradition with technology, the brand launched its digital presence—bringing its exquisite craftsmanship, rich heritage, and premium Sheesham wood furniture to customers across India with just a click.'
    },
    { 
      year: '2025', 
      title: '15+ Experience store Across India', 
      desc: 'Sri Furniture Village boasts a network of ten showrooms across India, located in Pune, Guntur, 3 Showroom in Vijayawada, Bengaluru, 4 Showroom in Hyderabad, Visakhapatnam, and other major cities. These showrooms have become the go-to destinations for customers seeking high-quality, beautifully crafted Sheesham wood furniture.'
    }
  ];

  // Showrooms data matching home page
  const showrooms = [
    { city: 'Pune', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 2 },
    { city: 'Bhubaneswar', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    { city: 'Hyderabad', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 3 },
    // { city: 'Warangal', type: 'warehouse', icon: <Warehouse className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    { city: 'Guntur', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    { city: 'Vijayawada', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Khammam', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Karimnagar', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Siddipet', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    { city: 'Bangalore', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Raipur', type: 'store', icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Nasik', type: 'office', icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 },
    // { city: 'Nasik', type: 'factory', icon: <Factory className="w-5 h-5 sm:w-6 sm:h-6" />, count: 1 }
  ];

  // Visionaries matching Image 4
  const visionaries = [
    { 
      name: 'Mr. Pawan Jangid', 
      role: 'Founder & Director', 
      image: '/home/Pawan.png'
    },
    { 
      name: 'Mr. Ranveer Jangid', 
      role: 'Co-Founder', 
      image: '/home/Ranveer .png'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image - FIXED */}
      <div 
        className="relative bg-cover bg-center h-[40vh] sm:h-[50vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('/home/About us.jpg')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 "></div>
      
      </div>

      {/* Our Story Section - Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 mb-6 sm:mb-8">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Founded in 1999 in the small village of Satyun in Taranagar, Churu (Rajasthan), Sri Furniture Village has grown from a humble furniture workshop into a respected name in the Indian furniture industry. Started by the visionary Mr. Pawan Jangid, the company has built its reputation on quality, craftsmanship, and innovation in Sheesham wood furniture.
              </p>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mt-6 sm:mt-8 mb-4">Beginning</h3>
              <p>
               The journey of Sri Furniture Village began in a small workshop in Satyun village, where a handful of skilled artisans crafted beautiful Sheesham wood furniture with passion and precision. In those early days, the focus was simple—deliver genuine quality rooted in traditional craftsmanship. This dedication quickly earned local recognition, and the exceptional standard of their work laid a strong foundation for the company's future growth.
              </p>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <img 
              src="/home/About us 2.jpg"
              alt="Our Story"
              className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full h-auto"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'}
            />
          </div>
        </div>
      </div>

      {/* Our Journey Timeline - Responsive */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-orange-500 mb-4">Our Journey</h2>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block">
              <div className="w-1 h-8 sm:h-12 bg-orange-400 mx-auto"></div>
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-orange-400"></div>
                <div className="absolute left-0 top-0 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg -translate-x-1.5"></div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2 sm:mb-3">{item.year}</h3>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{item.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-400"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8 lg:pr-12' : 'text-left pl-8 lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <h3 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-3">{item.year}</h3>
                      <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Branches - Responsive */}
      <div className="py-6 sm:py-8 lg:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-orange-500 mb-2">Our Branches</h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-lg sm:text-xl">Where we are</p>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* India Map */}
            <div className="relative order-2 lg:order-1">
              <img 
                src="/home/Store India Map (1).jpg"
                alt="Our Branches Map"
                className="w-full h-auto rounded-xl"
                onError={(e) => e.target.src = 'https://via.placeholder.com/600x600/FFA500/FFFFFF?text=India+Map'}
              />
            </div>
            
            {/* Branches List */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {showrooms.map((showroom, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-orange-500 flex-shrink-0">
                        {showroom.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base">{showroom.city}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 capitalize">{showroom.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-6 sm:mt-8 bg-gray-50 rounded-xl p-4 sm:p-6">
                <h4 className="font-bold text-gray-800 mb-4 text-sm sm:text-base">Location Types</h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">Warehouse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">Office</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">Factory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet The Visionaries - Responsive */}
      <div className="py-4 sm:py-4 lg:py-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-orange-500 mb-6 sm:mb-6">Meet The Visionaries</h2>
          
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-4xl mx-auto">
            {visionaries.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/400x400/8B4513/FFFFFF?text=' + member.name}
                    />
                  </div>
                  <div className="p-4 sm:p-6 text-center bg-gradient-to-br from-orange-500 to-amber-500">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-sm sm:text-base text-white/90 font-semibold">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <StoreLocator/>
      {/* Vision & Mission - Responsive */}
      <div className="py-8 sm:py-8 lg:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-orange-500">
              <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-orange-500 mb-4 sm:mb-6" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                The driving force behind Sri Furniture Village is its founder, Mr. Pawan Jangid. His unwavering dedication, hard work, and visionary leadership have been instrumental in the company's success and growth, earning the company a loyal customer base and a stellar reputation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-orange-500">
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-orange-500 mb-4 sm:mb-6 fill-current" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Commitment</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Committed to sustainable practices, we ensure our Sheesham wood is responsibly sourced, ensuring minimal environmental impact. Our dedication to restoration and environmental responsibility resonates with environmentally conscious customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Responsive */}
      <div 
        className="relative bg-cover bg-center py-4 sm:py-4 lg:py-2"
        style={{
          backgroundImage: "url('/about/cta-bg.jpg')",
          backgroundAttachment: 'fixed'
        }}
      >
       
      </div>
    </div>
  );
}