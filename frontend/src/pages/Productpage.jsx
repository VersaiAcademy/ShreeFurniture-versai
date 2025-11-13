import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faShoppingCart, 
  faStar,
  faChevronDown,
  faChevronUp,
  faTh,
  faThList
} from "@fortawesome/free-solid-svg-icons";
import API from '../utils/api';

const Productpage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [fastDelivery, setFastDelivery] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSeaters, setSelectedSeaters] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  
  // Accordion states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isSeaterOpen, setIsSeaterOpen] = useState(true);

  // Material options (from products)
  const [materials, setMaterials] = useState([]);
  
  // Seater options
  const seaterOptions = ['3 Seater', '3+1+1 Seater', '2 Seater', '5 Seater', '6 Seater'];

  useEffect(() => {
    if (slug) {
      fetchProductsBySlug(slug);
    }
  }, [slug]);

  useEffect(() => {
    applyFilters();
  }, [products, fastDelivery, priceRange, selectedMaterials, selectedSeaters, sortBy]);

  const fetchProductsBySlug = async (categorySlug) => {
    setLoading(true);
    setError("");
    try {
      console.log("🔍 Fetching products for slug:", categorySlug);
      const res = await API.get(`/api/products?category=${encodeURIComponent(categorySlug)}`);
      
      const productsData = Array.isArray(res.data) ? res.data : (res.data.products || []);
      setProducts(productsData);
      
      // Extract unique materials
      const uniqueMaterials = [...new Set(productsData.map(p => p.material).filter(Boolean))];
      setMaterials(uniqueMaterials.map((m, i) => ({ name: m, count: productsData.filter(p => p.material === m).length })));
      
      console.log("✅ Products loaded:", productsData.length);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Fast delivery filter
    if (fastDelivery) {
      filtered = filtered.filter(p => p.stock_count > 0);
    }

    // Price range filter
    const [min, max] = priceRange;
    filtered = filtered.filter(p => {
      const price = calcDiscountedPrice(p.price, p.offer);
      return price >= min && price <= max;
    });

    // Material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => selectedMaterials.includes(p.material));
    }

    // Seater filter (check if product name contains seater info)
    if (selectedSeaters.length > 0) {
      filtered = filtered.filter(p => 
        selectedSeaters.some(seater => p.pname.toLowerCase().includes(seater.toLowerCase()))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => calcDiscountedPrice(a.price, a.offer) - calcDiscountedPrice(b.price, b.offer));
        break;
      case 'price-high':
        filtered.sort((a, b) => calcDiscountedPrice(b.price, b.offer) - calcDiscountedPrice(a.price, a.offer));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const calcDiscountedPrice = (price, offer) => {
    return Math.floor(price - (price * offer) / 100);
  };

  const formatCategoryName = (slug) => {
    if (!slug) return "";
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleMaterialToggle = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const handleSeaterToggle = (seater) => {
    setSelectedSeaters(prev =>
      prev.includes(seater) ? prev.filter(s => s !== seater) : [...prev, seater]
    );
  };

  const resetFilters = () => {
    setFastDelivery(false);
    setPriceRange([19989, 194989]);
    setSelectedMaterials([]);
    setSelectedSeaters([]);
    setSortBy('recommended');
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        navigate('/login');
        return;
      }
      await API.post('/api/cart', {
        product: product._id,
        product_name: product.pname,
        price: calcDiscountedPrice(product.price, product.offer),
        qty: 1
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    alert('Wishlist feature coming soon!');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon 
        key={i} 
        icon={faStar} 
        className={i < Math.floor(rating) ? "text-orange-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button onClick={() => fetchProductsBySlug(slug)} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm sticky top-4">
              {/* Filters Header */}
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* Fast Delivery Toggle */}
                <div className="p-4 border-b">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={fastDelivery}
                        onChange={(e) => setFastDelivery(e.target.checked)}
                      />
                      <div className={`w-11 h-6 rounded-full transition ${fastDelivery ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${fastDelivery ? 'transform translate-x-5' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">FAST DELIVERY</span>
                  </label>
                </div>

                {/* Price Range */}
                <div className="border-b">
                  <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">PRICE RANGE</span>
                    <FontAwesomeIcon icon={isPriceOpen ? faChevronUp : faChevronDown} className="text-gray-500" />
                  </button>
                  {isPriceOpen && (
                    <div className="px-4 pb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="19989"
                        max="194989"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full accent-orange-500"
                      />
                      <input
                        type="range"
                        min="19989"
                        max="194989"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-orange-500 mt-2"
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={applyFilters}
                          className="flex-1 bg-orange-500 text-white py-2 rounded text-sm font-medium hover:bg-orange-600"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => setPriceRange([19989, 194989])}
                          className="px-4 py-2 text-orange-500 text-sm font-medium hover:bg-orange-50 rounded"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Material Filter */}
                <div className="border-b">
                  <button
                    onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">MATERIAL</span>
                    <FontAwesomeIcon icon={isMaterialOpen ? faChevronUp : faChevronDown} className="text-gray-500" />
                  </button>
                  {isMaterialOpen && (
                    <div className="px-4 pb-4 space-y-2">
                      {materials.map((mat) => (
                        <label key={mat.name} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedMaterials.includes(mat.name)}
                            onChange={() => handleMaterialToggle(mat.name)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{mat.name}</span>
                          <span className="ml-auto text-xs text-gray-500">({mat.count})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Seater Filter */}
                <div className="border-b">
                  <button
                    onClick={() => setIsSeaterOpen(!isSeaterOpen)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">SEATER</span>
                    <FontAwesomeIcon icon={isSeaterOpen ? faChevronUp : faChevronDown} className="text-gray-500" />
                  </button>
                  {isSeaterOpen && (
                    <div className="px-4 pb-4 space-y-2">
                      {seaterOptions.map((seater) => (
                        <label key={seater} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedSeaters.includes(seater)}
                            onChange={() => handleSeaterToggle(seater)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{seater}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reset All Button */}
                <div className="p-4">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-50 font-medium"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort By :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">View As</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FontAwesomeIcon icon={faTh} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FontAwesomeIcon icon={faThList} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <img src="https://saferoomdesigns.com/wp-content/uploads/2021/06/item_no.png" alt="No products" className="w-64 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                <button onClick={resetFilters} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/dtproduct/${product._id}`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {(() => {
                        // Get main image or first variant image
                        let displayImage = product.img1;
                        
                        // If no main image, use first Stone finish image
                        if (!displayImage && product.stone_finish_image) {
                          displayImage = product.stone_finish_image;
                        }
                        
                        // If no Stone image, use first Natural finish image
                        if (!displayImage && product.natural_finish_image) {
                          displayImage = product.natural_finish_image;
                        }
                        
                        return (
                          <img
                            src={displayImage}
                            alt={product.pname}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
                          />
                        );
                      })()}
                      
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleAddToWishlist(e, product)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition z-10"
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>

                      {/* Badges */}
                      {product.offer > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold">
                          {product.offer}% Off
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faShoppingCart} />
                          Add to Cart
                        </button>
                      </div>

                      {product.stock_count === 0 && (
                        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[48px]">{product.pname}</h3>
                      <p className="text-sm text-gray-500 mb-2">By {product.brand}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                      </div>

                      {/* Options Badge */}
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600 mb-3">
                        <div className="w-3 h-3 rounded-full bg-orange-300 border border-gray-300"></div>
                        4+ Options
                      </div>

                      {/* Price Section */}
                      <div className="border-t pt-3">
                        {product.offer > 0 && (
                          <span className="inline-block bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-2">Deal Price</span>
                        )}
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-2xl font-bold text-green-600">
                            ₹ {calcDiscountedPrice(product.price, product.offer).toLocaleString()}
                          </span>
                          {product.offer > 0 && (
                            <>
                              <span className="text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                              <span className="text-green-600 font-semibold text-sm">{product.offer}% Off</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;