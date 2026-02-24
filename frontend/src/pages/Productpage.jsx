import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faStar,
  faChevronDown,
  faChevronUp,
  faTh,
  faThList,
  faFilter,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import API from '../utils/api';

const Productpage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [fastDelivery, setFastDelivery] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSeaters, setSelectedSeaters] = useState([]);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');

  // Accordion states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isSeaterOpen, setIsSeaterOpen] = useState(true);

  // Mobile Filter Modal State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Material options (from products)
  const [materials, setMaterials] = useState([]);
  const [userWishlistIds, setUserWishlistIds] = useState(new Set());
  const [wishlistLoadingMap, setWishlistLoadingMap] = useState({});

  // Seater options
  const seaterOptions = ['3 Seater', '3+1+1 Seater', '2 Seater', '5 Seater', '6 Seater'];

  // Main category -> subcategory names mapping
  const MAIN_CATEGORY_MAP = {
    'sofas': ['Sofa Cum Beds', '3 Seater Sofas', '1 Seater Sofas', '3+1+1 Sofa Sets', 'L Shaped Sofas',],
    'living': ['TV Units', 'Temples', 'Book Shelves', 'Display Units', 'Shoe Racks', 'Sideboards', 'Chest of Drawers', 'Chairs', 'Stools', 'Benches', 'Swings', 'Coffee Tables', 'Side Tables', 'Console Tables', 'Wall Shelves & Hanger', 'Wall Mirrors', 'Wooden Diwan', 'Benches', 'Stools'],
    'bedroom': ['King Size Beds', 'Queen Size Beds', 'Single Beds', 'Hydraulic Storage Beds', 'Poster Beds', 'Wooden Wardrobe'],
    'dining-kitchen': ['Dining Tables', '2 Seater Dining Sets', '4 Seater Dining Sets', '6 Seater Dining Sets', 'Dining Chairs', 'Benches', 'Kitchen Cabinets', 'Crockery Units', 'Wooden Tray', 'Wooden Jars', 'Spice Box', 'Chopping Board', 'Coasters', 'Tissue Box'],
    'storage': ['TV Units', 'Book Shelves', 'Display Units', 'Shoe Racks', 'Home Temples', 'Magazine Racks', 'Wooden Corner', 'Chest of Drawers', 'Wardrobes', 'Bed Side Tables', 'Dressing', 'Almira', 'Bar Cabinets'],
    'study-office': ['Study Tables', 'Wooden Corner'],
    'custom-furnitures': ['Custom Sofas', 'Custom Wardrobes', 'Custom Beds', 'Custom Tables']
  };

  // Helper: slugify a name
  const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '').replace(/&/g, '');

  // Build reverse map
  const SLUG_TO_NAME = {};
  Object.keys(MAIN_CATEGORY_MAP).forEach((main) => {
    SLUG_TO_NAME[main] = main.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ');
    MAIN_CATEGORY_MAP[main].forEach((sub) => {
      SLUG_TO_NAME[slugify(sub)] = sub;
    });
  });

  useEffect(() => {
    const invalidSlugs = ['profile', 'userprofile', 'login', 'register', 'cart', 'wishlist', 'address', 'checkout', 'cashfree-callback'];
    if (slug && invalidSlugs.includes(slug.toLowerCase())) {
      if (slug.toLowerCase() === 'profile' || slug.toLowerCase() === 'userprofile') {
        navigate('/userprofile', { replace: true });
      } else {
        navigate(`/${slug.toLowerCase()}`, { replace: true });
      }
      return;
    }

    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || params.get('q');
    if (searchParam) {
      fetchProductsBySearch(searchParam);
      return;
    }

    if (slug && !invalidSlugs.includes(slug.toLowerCase())) {
      fetchProductsBySlug(slug);
    } else if (!slug) {
      setProducts([]);
      setLoading(false);
    }
  }, [slug, location.search, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bedSize = params.get('bed_size');
    const sofaSize = params.get('sofa_size');
    const diningSize = params.get('dining_size');
    const genericSize = params.get('size');

    const sizeFromQuery = bedSize || sofaSize || diningSize || genericSize || '';
    if (sizeFromQuery) {
      setSelectedSizeFilter(sizeFromQuery);
      if (seaterOptions.some(s => s.toLowerCase() === sizeFromQuery.toLowerCase())) {
        setSelectedSeaters([sizeFromQuery]);
      }
    }
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, fastDelivery, priceRange, selectedMaterials, selectedSeaters, sortBy]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await API.get('/api/wishlist');
        const items = Array.isArray(res.data) ? res.data : (res.data.wishlist || []);
        const ids = new Set(items.map(i => {
          if (i.product && typeof i.product === 'object') return i.product._id || i.product.id;
          return i.product || i._id || i.id;
        }));
        setUserWishlistIds(ids);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      }
    };

    fetchWishlist();
  }, []);

  const fetchProductsBySlug = async (categorySlug) => {
    const invalidSlugs = ['profile', 'userprofile', 'login', 'register', 'cart', 'wishlist', 'address', 'checkout', 'cashfree-callback'];
    if (!categorySlug || invalidSlugs.includes(categorySlug.toLowerCase())) {
      setError("Invalid category");
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      let categoryParam = categorySlug;
      const mapEntry = MAIN_CATEGORY_MAP[categorySlug];
      if (mapEntry && Array.isArray(mapEntry) && mapEntry.length > 0) {
        const subsSlugs = mapEntry.map(s => slugify(s));
        const parts = [categorySlug, ...subsSlugs];
        categoryParam = parts.join(',');
      } else if (SLUG_TO_NAME[categorySlug]) {
        categoryParam = categorySlug;
      } else {
        categoryParam = [categorySlug, categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)].join(',');
      }

      const res = await API.get('/api/products', { params: { category: categoryParam } });

      const productsData = Array.isArray(res.data) ? res.data : (res.data.products || []);
      setProducts(productsData);

      const uniqueMaterials = [...new Set(productsData.map(p => p.material).filter(Boolean))];
      setMaterials(uniqueMaterials.map((m, i) => ({ name: m, count: productsData.filter(p => p.material === m).length })));
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsBySearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/api/products`, { params: { search: query } });
      const productsData = Array.isArray(res.data) ? res.data : (res.data.products || []);
      setProducts(productsData);

      const uniqueMaterials = [...new Set(productsData.map(p => p.material).filter(Boolean))];
      setMaterials(uniqueMaterials.map((m) => ({ name: m, count: productsData.filter(p => p.material === m).length })));
    } catch (err) {
      setError("Failed to search products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (fastDelivery) {
      filtered = filtered.filter(p => p.stock_count > 0);
    }

    const [min, max] = priceRange;
    filtered = filtered.filter(p => {
      const price = calcDiscountedPrice(p.price, p.offer);
      return price >= min && price <= max;
    });

    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => selectedMaterials.includes(p.material));
    }

    if (selectedSeaters.length > 0) {
      filtered = filtered.filter(p =>
        selectedSeaters.some(seater => p.pname.toLowerCase().includes(seater.toLowerCase()))
      );
    }

    if (selectedSizeFilter) {
      const q = selectedSizeFilter.toLowerCase();
      filtered = filtered.filter(p => {
        const sizeField = (p.size || '').toString().toLowerCase();
        const pname = (p.pname || '').toString().toLowerCase();
        return sizeField.includes(q) || pname.includes(q);
      });
    }

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
    setPriceRange([0, 500000]);
    setSelectedMaterials([]);
    setSelectedSeaters([]);
    setSortBy('recommended');
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('Please login to add items to cart');
        navigate('/login');
        return;
      }
      const response = await API.post('/api/cart', {
        product: product._id,
        product_name: product.pname,
        price: calcDiscountedPrice(product.price, product.offer),
        qty: 1
      });
      toast.success(response.data.message || 'Product added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product to cart');
    }
  };

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    const prodId = product._id;
    if (wishlistLoadingMap[prodId]) return;

    const currentlyHas = userWishlistIds.has(prodId);
    const prevSet = new Set(userWishlistIds);

    const newSet = new Set(prevSet);
    if (currentlyHas) newSet.delete(prodId); else newSet.add(prodId);
    setUserWishlistIds(newSet);
    setWishlistLoadingMap(prev => ({ ...prev, [prodId]: true }));

    try {
      if (!currentlyHas) {
        const res = await API.post('/api/wishlist', { product: prodId });
        toast.success(res.data.message || 'Added to wishlist');
        try { window.dispatchEvent(new Event('wishlistUpdated')); } catch (e) { }
      } else {
        const res = await API.delete(`/api/wishlist/${prodId}`);
        toast.success(res.data.message || 'Removed from wishlist');
        try { window.dispatchEvent(new Event('wishlistUpdated')); } catch (e) { }
      }
    } catch (err) {
      setUserWishlistIds(prevSet);
      toast.error(err.response?.data?.message || 'Failed to update wishlist');
    } finally {
      setWishlistLoadingMap(prev => { const copy = { ...prev }; delete copy[prodId]; return copy; });
    }
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
        <div className="text-center px-4">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => {
              setError("");
              setLoading(true);
              if (slug) fetchProductsBySlug(slug);
            }}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const FiltersContent = ({ isMobile }) => (
    <>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      <div className={`overflow-y-auto ${isMobile ? 'max-h-[calc(100vh-160px)]' : 'max-h-[calc(100vh-120px)]'}`}>
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
                min="0"
                max="500000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full accent-orange-500"
              />
              <input
                type="range"
                min="0"
                max="500000"
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
                  onClick={() => setPriceRange([0, 500000])}
                  className="px-4 py-2 text-orange-500 text-sm font-medium hover:bg-orange-50 rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

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

        <div className="p-4">
          <button
            onClick={resetFilters}
            className="w-full py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-50 font-medium"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </>
  );

  const getCategoryTitle = () => {
    if (!slug) return "";

    // Special case: show 3-1-1 instead of 311
    if (slug === "311-sofa-sets") {
      return "3-1-1 Sofa Sets";
    }

    // If we have a pretty name in the map, use it
    if (SLUG_TO_NAME[slug]) {
      return SLUG_TO_NAME[slug];
    }

    // If it's a main category, format it nicely
    if (MAIN_CATEGORY_MAP[slug]) {
      return slug
        .split("-")
        .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : ""))
        .join(" ");
    }

    // Fallback
    return formatCategoryName(slug);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="sticky top-0 z-20 bg-gray-50 pt-2 pb-1 lg:hidden">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 mb-3 bg-orange-500 text-white rounded-lg shadow-md font-semibold"
          >
            <FontAwesomeIcon icon={faFilter} />
            Filter Products
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm sticky top-4">
              <FiltersContent isMobile={false} />
            </div>
          </div>

          {isFilterModalOpen && (
            <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center shadow-sm">
                <h2 className="text-xl font-bold">Product Filters</h2>
                <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                  <FontAwesomeIcon icon={faTimes} size="xl" />
                </button>
              </div>

              <div className="pb-20">
                <FiltersContent isMobile={true} />
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t shadow-2xl">
                <button
                  onClick={applyFilters}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600"
                >
                  Show {filteredProducts.length} Products
                </button>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {getCategoryTitle()}
                </h1>

              </div>
              {MAIN_CATEGORY_MAP[slug] && MAIN_CATEGORY_MAP[slug].length > 0 && (
                <>
                  <div className="text-sm text-gray-600 mt-1 hidden sm:block">{MAIN_CATEGORY_MAP[slug].join(' • ')}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {MAIN_CATEGORY_MAP[slug].map((sub) => {
                      const subSlug = sub.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '').replace(/&/g, '');
                      return (
                        <button
                          key={sub}
                          onClick={() => navigate(`/${subSlug}`)}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 text-sm text-gray-800 font-medium hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">Sort By :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center gap-3">
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

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-6 sm:p-12 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Try adjusting your filters</p>
                <button onClick={resetFilters} className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm sm:text-base">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={`gap-4 sm:gap-5 ${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex flex-col'}`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/dtproduct/${product._id}`)}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group 
                      ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
                    `}
                  >
                    <div className={`relative overflow-hidden aspect-[4/3] ${viewMode === 'list' ? 'w-full sm:w-1/3 flex-shrink-0' : ''}`}>
                      {(() => {
                        const displayImage = product.natural_finish_image || product.stone_finish_image || product.img1 || product.image || (product.images && product.images[0]) || '';
                        return (
                          <img
                            src={displayImage}
                            alt={product.pname}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
                          />
                        );
                      })()}

                      <button
                        onClick={(e) => handleAddToWishlist(e, product)}
                        className={`absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition z-10 ${wishlistLoadingMap[product._id] ? 'opacity-60 cursor-wait' : 'hover:bg-orange-500 hover:text-white'}`}
                      >
                        <FontAwesomeIcon icon={faHeart} className={userWishlistIds.has(product._id) ? 'text-red-500' : 'text-gray-500'} />
                      </button>

                      {product.offer > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          {product.offer}% Off
                        </div>
                      )}

                      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-transform duration-300
                          ${viewMode === 'grid' ? 'translate-y-full group-hover:translate-y-0' : 'group-hover:opacity-100 opacity-0'}
                      `}>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm hover:bg-orange-600 transition flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faShoppingCart} />
                          Add to Cart
                        </button>
                      </div>

                      {product.stock_count === 0 && (
                        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded font-semibold text-sm">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-3 sm:p-4 ${viewMode === 'list' ? 'w-full sm:w-2/3 flex flex-col justify-between' : ''}`}>
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[40px] sm:min-h-[48px] text-sm sm:text-base">{product.pname}</h3>
                      <p className="text-xs text-gray-500 mb-2">By {product.brand}</p>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="text-xs sm:text-sm">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded text-[10px] sm:text-xs text-gray-600 mb-3">
                        <div className="w-2 h-2 rounded-full bg-orange-300 border border-gray-300"></div>
                        4+ Options
                      </div>

                      <div className="border-t pt-2 sm:pt-3">
                        {product.offer > 0 && (
                          <span className="inline-block bg-orange-500 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded mb-1 sm:mb-2">Deal Price</span>
                        )}
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xl sm:text-2xl font-bold text-green-600">
                            ₹ {calcDiscountedPrice(product.price, product.offer).toLocaleString()}
                          </span>
                          {product.offer > 0 && (
                            <>
                              <span className="text-gray-400 line-through text-xs sm:text-sm">₹{product.price.toLocaleString()}</span>
                              <span className="text-green-600 font-semibold text-xs sm:text-sm">{product.offer}% Off</span>
                            </>
                          )}
                        </div>
                        {viewMode === 'list' && (
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition flex items-center justify-center gap-2"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Add to Cart
                          </button>
                        )}
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
