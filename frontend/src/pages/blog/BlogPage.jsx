import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/blog/BlogCard';
import axios from 'axios';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleBlogs, setVisibleBlogs] = useState(9);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'beds', name: 'Beds' },
    { id: 'sofas', name: 'Sofas' },
    { id: 'dining', name: 'Dining' },
    { id: 'study-office', name: 'Study & Office' },
    { id: 'storage', name: 'Storage' },
    { id: 'trend-alert', name: 'Trend Alert' },
    { id: 'buying-guide', name: 'Buying Guide' }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseUrl}/api/blogs`);
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  const displayedBlogs = filteredBlogs.slice(0, visibleBlogs);
  const hasMore = visibleBlogs < filteredBlogs.length;

  const loadMore = () => {
    setVisibleBlogs(prev => prev + 6);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=600&fit=crop)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Blogs & Articles
          </h1>
          <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Expert tips, design inspiration, and furniture guides for your dream home
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleBlogs(9);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No blogs found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10 md:mt-12">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
        
      </div>
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

export default BlogPage;