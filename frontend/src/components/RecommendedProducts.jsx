import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import Loader from './Loader';

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Changed to 10 for 2 rows
  const [imageErrors, setImageErrors] = useState({});
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [addingToWishlist, setAddingToWishlist] = useState({});
  const navigate = useNavigate();

  // Base URL from environment or default
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://shreefurniture-backend-production.up.railway.app';

  // ✅ Fetch products and wishlist on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/api/products?limit=20&page=1');
      console.log('✅ Products fetched:', response.data.products);
      setProducts(response.data.products || []);

      // Fetch wishlist if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const wishlistRes = await API.get('/api/wishlist');
          const wishlistIds = new Set(
            (wishlistRes.data.wishlist || []).map(item =>
              (item.product && item.product._id) ? item.product._id : item.product
            ).filter(Boolean)
          );
          setWishlistItems(wishlistIds);
        } catch (err) {
          console.warn('Could not fetch wishlist:', err);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching recommended products:', error);
      setError('Failed to load products. Please check your connection.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, products.length));
  };

  const handleProductClick = (productId) => {
    navigate(`/dtproduct/${productId}`);
  };

  const handleImageError = (productId, imageUrl) => {
    console.error(`❌ Image failed to load for product ${productId}:`, imageUrl);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  // ✅ Handle add/remove from wishlist
  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    if (addingToWishlist[productId]) return;

    try {
      setAddingToWishlist(prev => ({ ...prev, [productId]: true }));

      if (wishlistItems.has(productId)) {
        // Remove from wishlist
        await API.delete(`/api/wishlist/${productId}`);
        setWishlistItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success('Removed from wishlist');
      } else {
        // Add to wishlist
        await API.post('/api/wishlist', { product: productId });
        setWishlistItems(prev => new Set(prev).add(productId));
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('❌ Wishlist error:', error);
      if (error.response?.status === 400) {
        toast.info(error.response.data.message || 'Already in wishlist');
      } else {
        toast.error('Failed to update wishlist');
      }
    } finally {
      setAddingToWishlist(prev => ({ ...prev, [productId]: false }));
    }
  };

  // ✅ Improved image URL handler
  const getImageUrl = (product) => {
    // Collect possible image values from multiple known fields (main + variants)
    const candidates = [];

    // common fields
    candidates.push(product.img1, product.img2, product.img3, product.img4, product.img5);
    candidates.push(product.image, product.img, product.images && product.images[0]);
    // variant fields - prefer natural finish first, then stone
    candidates.push(product.natural_finish_image, product.natural_finish_img2, product.stone_finish_image, product.stone_finish_img2);
    // sometimes uploaded fields may have capitalized keys or different naming
    candidates.push(product.Image, product.ImageUrl, product.imageUrl);

    // flatten and pick first non-empty string
    const raw = candidates.flat().find(v => typeof v === 'string' && v.trim() !== '') || null;

    if (!raw) {
      console.warn('⚠️ No image field found for product:', product._id);
      return null;
    }

    let imgField = raw.trim();
    // Normalize backslashes
    imgField = imgField.replace(/\\/g, '/');

    // If already a complete URL (http:// or https://)
    if (imgField.startsWith('http://') || imgField.startsWith('https://')) {
      return imgField;
    }

    // If starts with '/', construct full URL
    if (imgField.startsWith('/')) {
      const fullUrl = `${API_BASE_URL}${imgField}`;
      return fullUrl;
    }

    // If it looks like a filename (no protocol, maybe just name.jpg), try common upload paths
    const possiblePaths = [
      `${API_BASE_URL}/uploads/banners/${imgField}`,
      `${API_BASE_URL}/uploads/${imgField}`,
      `${API_BASE_URL}/images/${imgField}`,
      `${API_BASE_URL}/${imgField}`,
    ];

    return possiblePaths[0];
  };

  const displayedProducts = products.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="pt-5 md:pt-8 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Recommended For You</h3>
          <p className="text-sm sm:text-base text-gray-600 pb-4 md:pb-6">Dive Into Your Tailored Selections Today!</p>
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-5 md:pt-8 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Recommended For You</h3>
          <div className="text-center py-10">
            <p className="text-gray-500 text-base mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 md:pt-8 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Recommended For You</h3>
        <p className="text-sm sm:text-base text-gray-600 pb-4 md:pb-6">Dive Into Your Tailored Selections Today!</p>

        {/* Products Grid - 2 Rows Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-6">
          {displayedProducts.map((product) => {
            const imageUrl = getImageUrl(product);
            const hasImageError = imageErrors[product._id];

            return (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => handleProductClick(product._id)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
                  {imageUrl && !hasImageError ? (
                    <img
                      src={product.natural_finish_image || imageUrl}
                      alt={product.pname || 'Product'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(product._id, imageUrl)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <ShoppingCart size={48} className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 font-medium">Image Not Available</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.offer > 0 && (
                    <div className="absolute top-2 right-2 flex items-center z-10">
                      <span className="bg-orange-400 text-white rounded-l-md px-2 py-1 text-xs font-bold">
                        BIG DEAL
                      </span>
                      <span className="bg-black text-white rounded-r-md px-2 py-1 text-xs font-bold">
                        {product.offer}%
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    className={`absolute top-2 left-2 p-2 rounded-full shadow transition-all z-10 ${wishlistItems.has(product._id)
                      ? 'bg-red-100 hover:bg-red-200'
                      : 'bg-white hover:bg-orange-50'
                      }`}
                    onClick={(e) => handleAddToWishlist(e, product._id)}
                    disabled={addingToWishlist[product._id]}
                    aria-label={wishlistItems.has(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      size={18}
                      className={wishlistItems.has(product._id) ? 'fill-red-500 text-red-500' : 'text-red-500'}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-3 md:p-4">
                  {/* Product Name */}
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {product.pname || 'Unnamed Product'}
                  </p>

                  {/* Brand */}
                  <p className="text-xs text-gray-500 mb-2">
                    {product.brand || 'SRI Furniture Village'}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(Math.floor(product.rating || 4))].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.rating_count || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{Math.floor(product.price - (product.price * (product.offer || 0)) / 100).toLocaleString('en-IN')}
                    </span>
                    {product.offer > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-colors active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Added to cart!');
                    }}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {visibleCount < products.length && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleViewMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors shadow-md hover:shadow-lg active:scale-95"
            >
              View More Products →
            </button>
          </div>
        )}

        {/* Show All Products Message */}
        {visibleCount >= products.length && products.length > 10 && (
          <div className="text-center py-6 text-gray-600 text-sm sm:text-base">
            Showing all {products.length} products
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">No products available at the moment</p>
          </div>
        )}

        <hr className="mt-6 border-gray-200" />
      </div>
    </div>
  );
};

export default RecommendedProducts;