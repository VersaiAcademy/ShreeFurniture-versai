import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    const colors = {
      'trend-alert': 'bg-orange-100 text-orange-700',
      'buying-guide': 'bg-blue-100 text-blue-700',
      'divine-decor': 'bg-purple-100 text-purple-700',
      'bedroom': 'bg-green-100 text-green-700',
      'living': 'bg-yellow-100 text-yellow-700',
      'dining-kitchen': 'bg-red-100 text-red-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={blog.image || 'https://placehold.co/600x400/f97316/white?text=Blog'}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/f97316/white?text=Blog';
          }}
        />
        <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(blog.category)}`}>
          {blog.categoryName}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>By <span className="text-orange-500">{blog.author}</span></span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-orange-500 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {blog.excerpt}
        </p>
        <button className="text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors flex items-center gap-1">
          Read Article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;