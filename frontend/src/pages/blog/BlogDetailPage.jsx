import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../../components/blog/BlogCard';
import axios from 'axios';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseUrl}/api/blogs/slug/${slug}`);
        setBlog(response.data.blog);
        if (response.data.blog.category) {
          const relatedRes = await axios.get(`${baseUrl}/api/blogs?category=${response.data.blog.category}`);
          const filtered = relatedRes.data.blogs.filter(b => b.slug !== slug);
          setRelatedBlogs(filtered.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const getCategoryColor = (category) => {
    const colors = {
      'trend-alert': 'bg-orange-100 text-orange-700',
      'buying-guide': 'bg-blue-100 text-blue-700',
      'beds': 'bg-green-100 text-green-700',
      'sofas': 'bg-yellow-100 text-yellow-700',
      'dining': 'bg-red-100 text-red-700',
      'study-office': 'bg-purple-100 text-purple-700',
      'storage': 'bg-indigo-100 text-indigo-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The article you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blogs
        </button>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src={blog.image || 'https://placehold.co/1200x600/f97316/white?text=Blog'}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x600/f97316/white?text=Blog';
              }}
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                {blog.categoryName}
              </span>
              <span className="text-sm text-gray-500">By <span className="text-orange-500">{blog.author}</span></span>
              <span>|</span>
              <span className="text-sm text-gray-500">{blog.date}</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>

        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedBlogs.map((related) => (
                <BlogCard key={related.id} blog={related} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pt-10 pb-5 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-b from-orange-100 to-white">
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

export default BlogDetailPage;