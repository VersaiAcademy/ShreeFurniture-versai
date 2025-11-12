//frontend/src/pages/DetaileProduct.jsx

import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Zap, ChevronRight, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../utils/api';
import Loader from '../components/Loader';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Similar Products
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  // State for Variant Selection
  const [activeImageSet, setActiveImageSet] = useState('natural'); // Default to 'natural'
  const [selectedImage, setSelectedImage] = useState('');

  // State for Pincode Check
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({ available: null, message: '' });

  // State for Collapsible Sections
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    delivery: false,
    warranty: false,
    terms: false,
    faqs: false,
    disclaimer: false,
  });

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        const data = response.data;
        setProduct(data);

        // Prefer product.img1 as the initial selected image. If not present, use first natural or stone variant.
        const naturalImgs = [data.natural_finish_image, data.natural_finish_img2, data.natural_finish_img3, data.natural_finish_img4].filter(Boolean);
        const stoneImgs = [data.stone_finish_image, data.stone_finish_img2, data.stone_finish_img3, data.stone_finish_img4].filter(Boolean);
        const primary = data.img1 || naturalImgs[0] || stoneImgs[0] || '';
        if (primary) setSelectedImage(primary);
        if (naturalImgs.length > 0) setActiveImageSet('natural');
        else if (stoneImgs.length > 0) setActiveImageSet('stone');

        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  // Small stars renderer used in multiple places
  const RatingStars = ({ rating = 0 }) => {
    const count = Math.max(0, Number(rating) || 0);
    return (
      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
        ))}
      </div>
    );
  };
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = () => {
    alert('Added to cart! (Connect this to your backend)');
  };

  const handleFinishSelect = (finishType, imageSet) => {
    if (imageSet.length === 0) return;
    setSelectedImage(imageSet[0]);
    setActiveImageSet(finishType);
  };

  // --- Pincode Logic ---
  const handlePincodeCheck = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setDeliveryInfo({ available: false, message: 'Please enter a valid 6-digit Pincode.' });
      return;
    }
    
    setDeliveryInfo({ available: null, message: 'Checking...' });
    
    try {
      // Representative pincode mapping for serviceable cities.
      // NOTE: This is a simple lookup with one representative pincode per city.
      // Expand the `allowedPincodes` map with your full postcode lists when available.
      const serviceableCityMap = {
        Ahmedabad: ['380001'],
        Amritsar: ['143001'],
        Bangalore: ['560001'],
        Chandigarh: ['160001'],
        Chennai: ['600001'],
        Churu: ['331001'],
        Coimbatore: ['641001'],
        Faridabad: ['121001'],
        Ghaziabad: ['201001'],
        Gurgaon: ['122001'],
        Hyderabad: ['500001'],
        Indore: ['452001'],
        Jaipur: ['302001'],
        Jodhpur: ['342001'],
        Kochi: ['682001'],
        Lucknow: ['226001'],
        Ludhiana: ['141001'],
        Madurai: ['625001'],
        Mangalore: ['575001'],
        Mumbai: ['400001'],
        Mysore: ['570001'],
        Delhi: ['110001'],
        Noida: ['201301'],
        Patna: ['800001'],
        Pune: ['411001'],
        Raipur: ['492001'],
        Ranchi: ['834001'],
        Surat: ['395001'],
        Trivandrum: ['695001'],
        Udaipur: ['313001'],
        Visakhapatnam: ['530001'],
        Kanpur: ['208001'],
        Bhopal: ['462001'],
      };

      const allowedPincodes = new Set(Object.values(serviceableCityMap).flat());

      // Simulate async check to mimic network latency
      await new Promise((r) => setTimeout(r, 450));

      if (allowedPincodes.has(pincode)) {
        const cities = Object.keys(serviceableCityMap).join(', ');
        setDeliveryInfo({ 
          available: true, 
          message: `Delivery available in: ${cities}. Estimated: ${product.dispatch_in || '5-7 Days'}` 
        });
      } else {
        setDeliveryInfo({ 
          available: false, 
          message: 'Sorry, delivery is not available to this Pincode.' 
        });
      }
    } catch (error) {
      setDeliveryInfo({ available: false, message: 'Could not connect to service. Try again.' });
    }
  };


  // --- Render Loading/Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // --- Product Data Derivations ---
  const _price = Number(product.price) || 0;
  const _offer = Number(product.offer) || 0;
  const discountedPrice = Math.floor(_price - (_price * _offer) / 100);
  const originalPrice = _price ? _price.toLocaleString('en-IN') : 'N/A';
  const finalPrice = discountedPrice.toLocaleString('en-IN');

  const stoneFinishImages = [
    product.stone_finish_image, product.stone_finish_img2,
    product.stone_finish_img3, product.stone_finish_img4,
  ].filter(Boolean);

  const naturalFinishImages = [
    product.natural_finish_image, product.natural_finish_img2,
    product.natural_finish_img3, product.natural_finish_img4,
  ].filter(Boolean);

  let currentThumbnails = [];
  if (activeImageSet === 'stone' && stoneFinishImages.length > 0) {
    currentThumbnails = stoneFinishImages;
  } else if (activeImageSet === 'natural' && naturalFinishImages.length > 0) {
    currentThumbnails = naturalFinishImages;
  } else {
    currentThumbnails = []; // Fallback empty if no variant is ready
  }

  const colorOptions = [
    { name: 'Natural', key: 'natural', images: naturalFinishImages, thumbnail: product.natural_finish_image },
    { name: 'Stone', key: 'stone', images: stoneFinishImages, thumbnail: product.stone_finish_image },
  ].filter(option => option.images.length > 0); 
  
  // Default image if no variant is ready
  const displayImage = selectedImage || product.img1 || 'placeholder-image-url';


  // --- JSX Render ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Sticky Image Gallery */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img
                  src={displayImage}
                  alt={product.pname}
                  className="w-full h-96 object-contain bg-white rounded-lg mb-4"
                />
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {/* Thumbnails */}
                  {currentThumbnails.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${activeImageSet} View ${index + 1}`}
                      className={`w-20 h-20 object-contain cursor-pointer rounded-md flex-shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-4 border-orange-500'
                          : 'border-2 border-gray-300 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>

              {/* BANNER SECTION */}
              <div className="mt-6">
                <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/Sri/2624x308 Pixle.jpg" 
                    alt="Discount Banner" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Content */}
          <div className="lg:w-1/2 space-y-6">
            {/* Product Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.pname}
              </h1>
              <p className="text-sm text-gray-600 mb-3">
                By {product.brand || 'Sri Furniture Village'}
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={product.rating || 5} />
                <span className="text-gray-700">({product.rating_count || 55})</span>
                <button className="ml-auto flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm">Add to wishlist</span>
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{finalPrice}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {product.offer}% Off
                </span>
              </div>

              {/* Color Selection (Finish Buttons) */}
              {colorOptions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-900">Select Finish:</h3>
                  <div className="flex gap-4 p-4 border border-orange-300 rounded-xl bg-orange-50">
                    {/* Variant Buttons - Stone and Natural */}
                    {colorOptions.map((option) => (
                      <div
                        key={option.key}
                        onClick={() => handleFinishSelect(option.key, option.images)} 
                        className={`cursor-pointer rounded-lg p-1 transition-all w-1/2 ${
                          activeImageSet === option.key 
                            ? 'border-4 border-orange-500 bg-white shadow-lg'
                            : 'border-2 border-transparent hover:border-gray-300 bg-white'
                        }`}
                      >
                        <img
                          src={option.thumbnail || 'placeholder-thumbnail-url'}
                          alt={`${option.name} Finish`}
                          className="w-full h-16 object-contain object-center rounded-md mb-2"
                        />
                        <p className="text-center text-sm font-medium text-gray-800">
                          {option.name} Finish
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Check (Pincode) */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Delivery:</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                        <span className="text-sm text-gray-600">
                            Check Delivery availability by area:
                        </span>
                        <div className="flex-grow flex border border-gray-400 rounded-md overflow-hidden">
                            <input
                                type="number"
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="p-2 flex-grow focus:outline-none text-sm"
                            />
                            <button 
                                onClick={handlePincodeCheck}
                                className="bg-orange-500 text-white p-2 hover:bg-orange-600 transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                     {/* Delivery Status Message */}
                    {deliveryInfo.message && (
                        <p className={`text-sm font-medium pl-3 ${
                            deliveryInfo.available === true ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {deliveryInfo.message}
                        </p>
                    )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <select className="border border-gray-400 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500">
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
              </div>

              {/* Action Buttons (Buy Now / Add to Cart) */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
                >
                  BUY NOW
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
                >
                  ADD TO CART
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex justify-around items-center border-t border-b py-3 mb-6">
                <div className="text-center">
                    <span role="img" aria-label="warranty" className="text-2xl">🛡️</span>
                    <p className="text-xs text-gray-600 mt-1">
                        {product.warranty || '36 Month'}Warranty
                    </p>
                </div>
                <div className="text-center">
                    <span role="img" aria-label="delivery" className="text-2xl">🚚</span>
                    <p className="text-xs text-gray-600 mt-1">
                        Free shipping on prepaid order
                    </p>
                </div>
                <div className="text-center">
                    <span role="img" aria-label="secure" className="text-2xl">🌐</span>
                    <p className="text-xs text-gray-600 mt-1">
                        Safe & Secure
                    </p>
                </div>
              </div>

              {/* Product Overview Table */}
              <div className="bg-white rounded-lg shadow-md mb-6 border border-gray-200 overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-900 px-6 py-4 border-b border-gray-200 bg-gray-50">
                  Product Overview
                </h3>
                <div className="p-6">
                  {(() => {
                      const overviewItems = [
                          { label: 'Brand', value: product.brand || 'SRI FURNITURE VILLAGE' },
                          { label: 'SKU', value: product.sku || 'SFV-4034-N' },
                          { label: 'Dimensions (In Centimeters)', value: product.dimensions_cm  },
                          { label: 'Dimensions (In Inches)', value: product.dimensions },
                          { label: 'Primary Material', value: product.material || 'Solid Sheesham Wood' },
                          { label: 'Warranty', value: product.warranty || '36 Months Warranty' },
                          { label: 'Delivery', value: product.dispatch_in || '10-12 Days' },
                          { label: 'Delivery Condition', value: product.delivery_condition || 'Knocked Down' },
                          { label: 'Caring', value: product.caring  },
                          { label: 'Mattress', value: product.mattress_size },
                      ];

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {overviewItems.map((it) => (
                            <div key={it.label} className="space-y-1">
                              <div className="text-sm text-gray-600 font-medium">{it.label}</div>
                              <div className="text-sm text-gray-900 font-normal">{it.value ?? '—'}</div>
                            </div>
                          ))}
                        </div>
                      );
                  })()}
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-orange-700 mb-3">
                  Special Offers
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">›</span>
                    <span>
                      <span className="font-semibold">Valentine Day Sale</span> - Apply
                      Coupon LOVEIT10 & Get Up to 20% Off{' '}
                      <span className="text-blue-600 cursor-pointer underline">T&C</span>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">›</span>
                    <span>
                      <span className="font-semibold">Store Discount</span> - Get up to
                      10% off{' '}
                      <span className="text-blue-600 cursor-pointer underline">T&C</span>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">›</span>
                    <span>
                      <span className="font-semibold">No Cost EMI</span> - Available on
                      Net Cart Value of ₹39,990+{' '}
                      <span className="text-blue-600 cursor-pointer underline">T&C</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

        

            {/* Product Details Accordion Sections */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-2xl font-bold p-6 border-b bg-gray-50">Product Details</h2>

              {/* Overview (Detail Text) */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('overview')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">Overview</span>
                  {expandedSections.overview ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.overview && (
                  <div className="px-6 pb-6 text-gray-700 space-y-4">
                    <p>
                      A classic contemporary companion for your abode. Tall backrest,
                      comfortable design, and elegant craftsmanship make this a complete
                      package!
                    </p>
                    <p>
                      Crafted from solid wood with premium finish, it showcases high
                      sturdiness and durability.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mt-4 text-sm">
                      <div><span className="font-semibold text-gray-900">Material:</span> <span className="text-gray-700">{product.material}</span></div>
                      <div><span className="font-semibold text-gray-900">Warranty:</span> <span className="text-gray-700">{product.warranty}</span></div>
                      <div><span className="font-semibold text-gray-900">Brand:</span> <span className="text-gray-700">{product.brand}</span></div>
                      <div><span className="font-semibold text-gray-900">Dimensions:</span> <span className="text-gray-700">{product.dimensions}</span></div>
                      <div><span className="font-semibold text-gray-900">Finish:</span> <span className="text-gray-700">{product.finish}</span></div>
                      <div><span className="font-semibold text-gray-900">Storage:</span> <span className="text-gray-700">{product.storage}</span></div>
                      <div><span className="font-semibold text-gray-900">SKU:</span> <span className="text-gray-700">{product.sku}</span></div>
                      <div><span className="font-semibold text-gray-900">Design:</span> <span className="text-gray-700">{product.design}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery & Installation */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('delivery')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    Delivery & Installation
                  </span>
                  {expandedSections.delivery ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.delivery && (
                  <div className="px-6 pb-6 text-gray-700 space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-base text-gray-900 mb-2">
                        Delivery:
                      </h4>
                      <p>
                        Our support and delivery teams will be in touch with you for a
                        hassle-free delivery.
                      </p>
                      <p className="mt-2">
                        Free delivery is only applicable for the first attempt. Extra
                        charges apply for subsequent attempts or weekend delivery.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-gray-900 mb-2">
                        Installation:
                      </h4>
                      <p>
                        Delivery Condition:{' '}
                        <span className="font-semibold">{product.delivery_condition}</span>
                      </p>
                      <p>
                        Dispatch In:{' '}
                        <span className="font-semibold">{product.dispatch_in}</span>
                      </p>
                      <p className="mt-2">
                        Expert assembly assistance will be provided for proper
                        installation.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Warranty */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('warranty')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">Warranty</span>
                  {expandedSections.warranty ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.warranty && (
                  <div className="px-6 pb-6 text-gray-700 space-y-3 text-sm">
                    <p>
                      This product comes with{' '}
                      <span className="font-semibold">{product.warranty}</span> warranty
                      period, covering manufacturing/workmanship defects.
                    </p>
                    <p className="font-semibold text-gray-900">
                      This limited warranty does not apply to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Normal wear and tear over prolonged use</li>
                      <li>Scratches or damages due to improper cleaning</li>
                      <li>Incorrect installation by customer</li>
                      <li>Wood decay due to water exposure</li>
                      <li>Natural wood characteristics like grain patterns</li>
                      <li>Upholstery fabrics (warranty applies to frame only)</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('terms')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    Terms And Conditions
                  </span>
                  {expandedSections.terms ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.terms && (
                  <div className="px-6 pb-6 text-gray-700 space-y-3 text-sm">
                    <p>
                      For questions or clarifications, contact Customer Support at
                      +91-9314444747.
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Understanding your Product:
                      </h4>
                      <p>
                        Accessories shown are for representation only and not part of the
                        actual product.
                      </p>
                      <p className="mt-2">
                        Hand-crafted furniture may have slight variations from images due
                        to artisanal nature.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Placing an Order:
                      </h4>
                      <p>
                        Check entrance dimensions before buying to ensure smooth delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* FAQ's */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">FAQ's</span>
                  {expandedSections.faqs ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.faqs && (
                  <div className="px-6 pb-6 text-gray-700 space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Which fabric is used in the upholstery?
                      </p>
                      <p>We use premium quality fabric for upholstery.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        What kind of wood do you use?
                      </p>
                      <p>{product.material} is used in the frame construction.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Is your furniture comfortable?
                      </p>
                      <p>
                        Yes, all our furniture is designed for optimal comfort and
                        ergonomics.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div>
                <button
                  onClick={() => toggleSection('disclaimer')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">Disclaimer</span>
                  {expandedSections.disclaimer ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </button>
                {expandedSections.disclaimer && (
                  <div className="px-6 pb-6 text-gray-700 text-sm space-y-2">
                    <p>{product.note}</p>
                    <p className="font-semibold text-gray-900">Customization:</p>
                    <p>{product.customization}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visually Similar Products Section */}
      <div className="max-w-7xl mx-auto mt-12 mb-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Visually Similar Divan Beds</h2>
        
        {similarLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => {
              const itemDiscountedPrice = Math.floor(item.price - (item.price * item.offer) / 100);
              const itemOriginalPrice = item.price ? item.price.toLocaleString('en-IN') : 'N/A';
              const itemFinalPrice = itemDiscountedPrice.toLocaleString('en-IN');

              return (
                <div 
                  key={item._id || item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => window.location.href = `/product/${item._id || item.id}`}
                >
                  <div className="relative">
                    <img
                      src={item.img1 || item.natural_finish_image || item.stone_finish_image || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={item.pname}
                      className="w-full h-48 object-cover"
                    />
                    <button 
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-orange-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Added to wishlist!');
                      }}
                    >
                      <Heart size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      {item.pname}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      By {item.brand || 'Sri Furniture Village'}
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      <RatingStars rating={item.rating || 4} />
                      <span className="text-xs text-gray-600">({item.rating_count || 0})</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-gray-900">₹ {itemFinalPrice}</span>
                      {item.offer > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">₹ {itemOriginalPrice}</span>
                          <span className="text-xs font-semibold text-green-600">{item.offer}% Off</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {/* Expert Advice Banner */}
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl p-6 shadow-md border border-orange-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-gray-900">Need Expert Advice?</h3>
                <div className="flex gap-3">
                  <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2">
                    <span>📞</span>
                    <span>Call Now.....</span>
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                    Visit Our Store
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No similar products found</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailProduct;