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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        setProduct(response.data);
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

  const [selectedImage, setSelectedImage] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    delivery: false,
    warranty: false,
    terms: false,
    faqs: false,
    disclaimer: false,
  });

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
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

  // These will be calculated in the render section when product is available

  // Update selected image when product loads
  useEffect(() => {
    if (product?.img1) {
      setSelectedImage(product.img1);
    }
  }, [product]);

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

  // Calculate values that depend on product data
  const discountedPrice = Math.floor(product.price - (product.price * product.offer) / 100);
  const images = [product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean);
  const colorOptions = [
    { name: 'Honey Finish', image: product.img1 },
    { name: 'Teak Finish', image: product.img2 },
  ].filter(option => option.image); // Only show options that have images

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Sticky Image Gallery */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img
                  src={selectedImage}
                  alt={product.pname}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`View ${index + 1}`}
                      className={`w-20 h-20 object-cover cursor-pointer rounded-md flex-shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-4 border-orange-500'
                          : 'border-2 border-gray-300 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
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
                ({product.size}, {product.finish})
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={product.rating} />
                <span className="text-gray-700">{product.rating}</span>
                <button className="ml-auto flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm">Add to wishlist</span>
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{discountedPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {product.offer}% off
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Select Finish:</h3>
                <div className="flex gap-3">
                  {colorOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(option.image)}
                      className={`px-6 py-3 border-2 rounded-lg transition-all font-medium ${
                        selectedImage === option.image
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 hover:border-orange-300 text-gray-700'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.pdesc}
              </p>

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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Visible Product Overview (matches admin style) */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Overview</h3>

              {(() => {
                const overviewItems = [
                  { label: 'Designs', value: product.design },
                  { label: 'Material', value: product.material },
                  { label: 'Color', value: product.color || product.fabric_color },
                  { label: 'Seater', value: product.seater },
                  { label: 'Finish', value: product.finish },
                  { label: 'Upholstery Material', value: product.fabric_color },
                  { label: 'Leg Material', value: product.leg_material },
                  { label: 'Brand', value: product.brand },
                  { label: 'Dimensions (Inch)', value: product.dimensions },
                  { label: 'Dimensions (cm)', value: product.dimensions_cm },
                  { label: 'Foam', value: product.foam },
                  { label: 'Armrest', value: product.armrest },
                  { label: 'Shape', value: product.shape },
                  { label: 'Product Quantity', value: product.product_quantity || product.quantity || '1 Unit' },
                  { label: 'Storage', value: product.storage || 'Without Storage' },
                  { label: 'Sku', value: product.sku },
                  { label: 'Delivery Condition', value: product.delivery_condition }
                ];

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-700">
                    {overviewItems.map((it) => (
                      <div key={it.label} className="flex items-start">
                        <div className="w-40 text-gray-600">{it.label}</div>
                        <div className="flex-1">: <span className="text-gray-800">{it.value ?? '—'}</span></div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Product Details Sections */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-2xl font-bold p-6 border-b bg-gray-50">Product Details</h2>

              {/* Overview */}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mt-4">
                      <div>
                        <span className="font-semibold text-gray-900">Material:</span>{' '}
                        <span className="text-gray-700">{product.material}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Warranty:</span>{' '}
                        <span className="text-gray-700">{product.warranty}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Brand:</span>{' '}
                        <span className="text-gray-700">{product.brand}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Dimensions:</span>{' '}
                        <span className="text-gray-700">{product.dimensions}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Finish:</span>{' '}
                        <span className="text-gray-700">{product.finish}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Storage:</span>{' '}
                        <span className="text-gray-700">{product.storage}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">SKU:</span>{' '}
                        <span className="text-gray-700">{product.sku}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Design:</span>{' '}
                        <span className="text-gray-700">{product.design}</span>
                      </div>
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
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Am I promised doorstep delivery?
                      </p>
                      <p>Yes, we provide doorstep delivery for all orders.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Is purchase amount inclusive of all taxes?
                      </p>
                      <p>Yes, all prices displayed are inclusive of taxes.</p>
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
    </div>
  );
};

export default DetailProduct;