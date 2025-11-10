import React, { useState, useEffect } from 'react';
import { MapPin, Users, Star, Award, TrendingUp, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Timeline data
  const timeline = [
    { year: '1999', title: 'Humble Beginnings', desc: 'Founded in Saryan village, Churu district, Rajasthan. Started with a small workshop and dedicated artisans.' },
    { year: '2001', title: 'Strategic Expansion', desc: 'Relocated to Bangalore area, establishing first showroom. Increased production capacity while maintaining quality.' },
    { year: '2010', title: 'Technological Advancement', desc: 'Added modern manufacturing units, embracing advanced technology while preserving traditional craftsmanship.' },
    { year: 'Today', title: 'Industry Leader', desc: '10 showrooms across India. Premier manufacturer of Sheesham wood furniture with nationwide presence.' }
  ];

  // Team members (placeholder)
  const team = [
    { name: 'Mr. Pawanchand', role: 'Founder & CEO', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Founder' },
    { name: 'Team Member', role: 'Head of Design', image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Designer' },
    { name: 'Team Member', role: 'Production Head', image: 'https://via.placeholder.com/300x300/A0522D/FFFFFF?text=Production' }
  ];

  // Google Reviews (placeholder)
  const reviews = [
    { name: 'Customer Name', rating: 5, text: 'Excellent quality furniture! The craftsmanship is outstanding and truly reflects traditional artistry.', location: 'Bangalore' },
    { name: 'Customer Name', rating: 5, text: 'Beautiful Sheesham wood pieces. Great customer service and timely delivery.', location: 'Hyderabad' },
    { name: 'Customer Name', rating: 5, text: 'Premium quality at reasonable prices. Highly recommend Saryan Art Palace!', location: 'Pune' },
    { name: 'Customer Name', rating: 5, text: 'Amazing furniture collection. The attention to detail is remarkable.', location: 'Mumbai' }
  ];

  // Products slider (placeholder)
  const products = [
    { image: 'https://via.placeholder.com/800x500/8B4513/FFFFFF?text=Dining+Sets', title: 'Elegant Dining Sets' },
    { image: 'https://via.placeholder.com/800x500/D2691E/FFFFFF?text=Bedroom+Collection', title: 'Luxurious Bedrooms' },
    { image: 'https://via.placeholder.com/800x500/A0522D/FFFFFF?text=Living+Room', title: 'Stylish Living Rooms' },
    { image: 'https://via.placeholder.com/800x500/CD853F/FFFFFF?text=Office+Furniture', title: 'Premium Office Sets' }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-700 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Saryan Art Palace
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto opacity-95 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            A Legacy of Excellence in Sheesham Wood Furniture
          </p>
          <div className={`mt-8 flex justify-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-3xl font-bold">25+</span>
              <p className="text-sm">Years Experience</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-3xl font-bold">10</span>
              <p className="text-sm">Showrooms</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-3xl font-bold">1000+</span>
              <p className="text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-16 fill-amber-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Founded in 1999 in the quaint village of Saryan, located in Sheegaon, Churu district, Rajasthan, Saryan Art Palace has grown from a modest Furniture factory into a renowned name in the industry for producing high-quality Sheesham wood furniture.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              The journey began with a small workshop where a team of dedicated artisans started crafting beautiful Sheesham wood furniture. The early years focused on building a reputation for quality and reliability.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Saryan Art Palace boasts a network of ten showrooms across India, located in Pune, Guntur, Vijayawada, Bengaluru, Hyderabad, Warangal, Raipur cities. These showrooms have become the go-to destinations for customers seeking high-quality Sheesham wood furniture.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Award className="w-16 h-16 text-amber-900 mb-4" />
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Recognized Excellence</h3>
              <p className="text-gray-700 mb-4">
                Celebrated as one of the premier manufacturers of Sheesham wood furniture in Rajasthan and across India.
              </p>
              <div className="flex items-center gap-2 text-amber-900">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">Commitment to Sustainability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900 mb-16">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-300 hidden md:block"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right md:pr-12 md:pl-0 pl-12">
                    <div className={`${index % 2 === 0 ? 'md:mr-0' : 'md:ml-0'}`}>
                      <h3 className="text-3xl font-bold text-amber-700 mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 md:pl-12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Store Locations Map */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900 mb-6">Our Showrooms</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Visit us at any of our 10 locations across India</p>
          <div className="bg-white rounded-3xl shadow-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 opacity-50"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-20 h-20 text-amber-700 mx-auto mb-4" />
              <p className="text-2xl font-semibold text-amber-900 mb-2">Interactive Map Coming Soon</p>
              <p className="text-gray-600">Locations: Pune • Guntur • Vijayawada • Bengaluru • Hyderabad • Warangal • Raipur & more</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900 mb-6">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">The passionate people behind our success</p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">{member.name}</h3>
                  <p className="text-amber-700 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Reviews Section */}
      <div className="py-20 bg-gradient-to-br from-amber-900 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">What Our Customers Say</h2>
          <p className="text-center opacity-90 mb-16 text-lg">Trusted by thousands across India</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm opacity-75">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Slider */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900 mb-6">Our Collections</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Exquisite Sheesham wood furniture crafted with perfection</p>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative h-96 md:h-[500px]">
                <img 
                  src={products[activeSlide].image} 
                  alt={products[activeSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white">{products[activeSlide].title}</h3>
                </div>
              </div>
            </div>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-amber-900" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-amber-900" />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeSlide ? 'w-8 bg-amber-700' : 'w-2 bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-20 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <TrendingUp className="w-12 h-12 text-amber-700 mb-4" />
              <h3 className="text-3xl font-bold text-amber-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The driving force behind Saryan Art Palace is its founder, Mr. Pawanchand. His unwavering dedication, hard work, and visionary leadership have been instrumental in the company's success and growth, earning the company a loyal customer base and a stellar reputation.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <Heart className="w-12 h-12 text-amber-700 mb-4 fill-current" />
              <h3 className="text-3xl font-bold text-amber-900 mb-4">Our Commitment</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Committed to sustainable practices, we ensure our Sheesham wood is responsibly sourced, ensuring minimal environmental impact. Our dedication to restoration and environmental responsibility resonates with environmentally conscious customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit Our Showroom</h2>
          <p className="text-xl mb-8 opacity-90">Experience the timeless beauty of Sheesham wood furniture</p>
          <button className="bg-white text-amber-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all transform hover:scale-105 shadow-lg">
            Find a Store Near You
          </button>
        </div>
      </div>
    </div>
  );
}