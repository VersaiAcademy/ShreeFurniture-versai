import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTruck, faLock, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { trackInitiateCheckout } from '../utils/metaPixel';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('afterLoginRedirect', '/checkout');
      toast.info('Please login to checkout');
      navigate('/login?next=/checkout');
      return;
    }

    loadCartData();
    loadAddress();
  }, [navigate]);

  // Track InitiateCheckout event when cart items are loaded
  useEffect(() => {
    if (cartItems.length > 0 && totalAmount > 0) {
      trackInitiateCheckout(cartItems, totalAmount);
    }
  }, [cartItems, totalAmount]);

  // Auto-trigger payment after login
  useEffect(() => {
    const shouldAutoPay = localStorage.getItem('shouldAutoPayAfterLogin');
    const paymentMode = sessionStorage.getItem('paymentMode');
    
    if (shouldAutoPay === 'true' && !loading && !addressLoading && cartItems.length > 0) {
      if (paymentMode === 'online') {
        setPaymentMethod('online');
        sessionStorage.removeItem('paymentMode');
        
        setTimeout(() => {
          if (address) {
            console.log('✅ Address available, auto-triggering payment after login...');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            handlePayment();
          } else {
            console.log('⚠️ Address required for payment');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            toast.info('Please add delivery address to continue payment');
          }
        }, 500);
        return;
      } else {
        localStorage.removeItem('shouldAutoPayAfterLogin');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length, address, loading, addressLoading]);

  const loadCartData = async () => {
    try {
      const response = await API.get('/api/cart');
      
      let items = [];
      if (Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data.cart) {
        items = response.data.cart;
      } else if (response.data.items) {
        items = response.data.items;
      }

      setCartItems(items);
      calculateTotal(items);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast.error('Failed to load cart items');
    }
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.price || (item.product?.price || 0);
      const qty = item.qty || 1;
      return sum + (price * qty);
    }, 0);
    const total = subtotal - couponDiscount;
    setTotalAmount(total);
  };

  const loadAddress = async () => {
    try {
      const response = await API.get('/api/address');
      setAddress(response.data || null);
    } catch (error) {
      console.error('Failed to load address:', error);
      setAddress(null);
    } finally {
      setAddressLoading(false);
    }
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SRIFURNITURE10') {
      const discount = Math.round(totalAmount * 0.1); // 10% discount
      setCouponDiscount(discount);
      setCouponApplied(true);
      setCouponError('');
      toast.success('Coupon applied successfully! 10% discount added.');
    } else {
      setCouponError('Invalid coupon code');
      setCouponDiscount(0);
      setCouponApplied(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponApplied(false);
    setCouponError('');
    toast.info('Coupon removed');
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLastError(null);
    handlePayment();
  };

  // Update quantity
  const handleUpdateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await API.put(`/api/cart/${itemId}`, { qty: newQty });
      
      // Update local state
      const updatedItems = cartItems.map(item => 
        item._id === itemId ? { ...item, qty: newQty } : item
      );
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await API.delete(`/api/cart/${itemId}`);
      
      // Update local state
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
      toast.success('Item removed from cart');
      
      // If cart becomes empty, redirect to home
      if (updatedItems.length === 0) {
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item');
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  /**
   * Load Cashfree JS SDK v3
   * Uses the correct SDK for PG Orders API
   */
  const loadCashfreeSDK = () => {
    return new Promise((resolve, reject) => {
      // Check if SDK is already loaded
      if (window?.Cashfree && typeof window.Cashfree === 'function') {
        console.log('✅ Cashfree SDK already loaded');
        return resolve(window.Cashfree);
      }

      // Check if script is already being loaded
      const existingScript = document.getElementById('cashfree-sdk-v3');
      if (existingScript) {
        existingScript.onload = () => {
          if (window?.Cashfree) {
            resolve(window.Cashfree);
          } else {
            reject(new Error('Cashfree SDK loaded but window.Cashfree not available'));
          }
        };
        existingScript.onerror = () => reject(new Error('Failed to load Cashfree SDK script'));
        return;
      }

      // Load Cashfree JS SDK v3 (correct SDK for PG Orders)
      const script = document.createElement('script');
      script.id = 'cashfree-sdk-v3';
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Cashfree SDK v3 loaded successfully');
        if (window?.Cashfree && typeof window.Cashfree === 'function') {
          resolve(window.Cashfree);
        } else {
          reject(new Error('Cashfree SDK loaded but initialization function not found'));
        }
      };
      
      script.onerror = (err) => {
        console.error('❌ Failed to load Cashfree SDK:', err);
        reject(new Error('Failed to load Cashfree SDK script'));
      };
      
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        navigate('/login?next=/checkout');
        return;
      }

      if (cartItems.length === 0) {
        toast.error('Cart is empty');
        navigate('/cart');
        return;
      }

      // Handle COD
      if (paymentMethod === 'cod') {
        if (!address) {
          toast.error('Please add delivery address first. Click "Continue to Address" to proceed.');
          return;
        }

        setLoading(true);
        const response = await API.post('/api/orders', {
          address: address._id,
          total: totalAmount,
          mode: 'cod'
        });
        
        toast.success(response.data.message || 'Order placed successfully!');
        const summary = response.data.orderSummary || null;
        if (summary) {
          sessionStorage.setItem('paymentSuccessSummary', JSON.stringify(summary));
        }
        sessionStorage.setItem('paymentSuccessMessage', response.data.message || 'Order placed successfully!');
        setLoading(false);
        navigate(`/payment-success?order_id=${response.data.orderId || ''}&mode=cod`);
        return;
      }

      // Online payment - Cashfree
      if (!address) {
        toast.error('Please add delivery address first. Click "Continue to Address" to proceed.');
        return;
      }

      setLoading(true);
      const rawAmount = Math.round(totalAmount);
      
      if (!Number.isFinite(rawAmount) || rawAmount <= 0) {
        toast.error('Invalid total amount');
        setLoading(false);
        return;
      }

      const amountNumber = Number(rawAmount);
      const name = localStorage.getItem('first_name') || localStorage.getItem('username') || 'Guest';
      const email = localStorage.getItem('email') || 'orders@shreefurniture.com';
      const phone = address.mob1 ? String(address.mob1) : '9999999999';
      const customerId = localStorage.getItem('id') || email || phone;

      // Create Cashfree order
      const payload = {
        amount: amountNumber,
        email: email,
        phone: phone,
        customer_id: customerId,
        name: name
      };

      console.log('🟢 Creating Cashfree order:', payload);
      const res = await API.post('/api/cashfree/create', payload);

      const respPayload = res.data || {};
      const paymentSessionId = respPayload.payment_session_id;
      const orderId = respPayload.orderId;

      console.log('📦 Cashfree response:', {
        orderId,
        hasPaymentSessionId: !!paymentSessionId,
        paymentSessionIdLength: paymentSessionId?.length
      });

      // Validate response
      if (!orderId) {
        console.error('❌ No orderId in response:', respPayload);
        toast.error('Payment initialization failed: missing order ID');
        setLoading(false);
        return;
      }

      if (!paymentSessionId || typeof paymentSessionId !== 'string') {
        console.error('❌ Invalid payment_session_id:', {
          paymentSessionId,
          type: typeof paymentSessionId,
          fullResponse: respPayload
        });
        toast.error('Payment initialization failed: invalid payment session ID');
        setLoading(false);
        return;
      }

      // Save order info
      localStorage.setItem('cf_orderId', orderId);
      localStorage.setItem('cf_addressId', address._id);
      localStorage.setItem('cf_total', String(amountNumber));
      console.log('💾 Saved payment info:', { orderId, addressId: address._id, total: amountNumber });

      // Initialize Cashfree checkout
      try {
        console.log('🔄 Loading Cashfree SDK...');
        const Cashfree = await loadCashfreeSDK();
        
        console.log('🔄 Initializing Cashfree with production mode...');
        const cashfree = await Cashfree({ mode: 'production' });
        
        if (!cashfree || typeof cashfree.checkout !== 'function') {
          throw new Error('Cashfree checkout method not available after initialization');
        }

        console.log('✅ Opening Cashfree checkout with paymentSessionId:', paymentSessionId.substring(0, 20) + '...');
        toast.info('Opening secure Cashfree checkout...');
        
        // Open checkout
        await cashfree.checkout({
          paymentSessionId: paymentSessionId,
          redirectTarget: '_self'
        });
        
        console.log('✅ Cashfree checkout opened successfully');
        setLoading(false);
        return;
      } catch (sdkError) {
        console.error('❌ Cashfree SDK error:', {
          error: sdkError,
          message: sdkError?.message,
          stack: sdkError?.stack,
          paymentSessionId: paymentSessionId?.substring(0, 20)
        });
        toast.error(sdkError?.message || 'Failed to open Cashfree checkout. Please try again.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      setLastError(error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to initiate payment. Please try again.';
      toast.error(message);
      setLoading(false);
    }
  };

  if (loading || addressLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = item.product || {};
                    const price = item.price || 0;
                    const qty = item.qty || 1;
                    const image = product.natural_finish_image || product.stone_finish_image || product.img1 || product.image || '';
                    const isUpdating = updatingItems[item._id];
                    
                    return (
                      <div key={item._id} className="flex gap-4 pb-4 border-b last:border-0">
                        <img
                          src={image}
                          alt={item.product_name || product.pname}
                          className="w-24 h-24 object-cover rounded"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{item.product_name || product.pname}</h3>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              disabled={isUpdating}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                              title="Remove item"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(item._id, qty - 1)}
                                disabled={qty <= 1 || isUpdating}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FontAwesomeIcon icon={faMinus} className="text-xs" />
                              </button>
                              <span className="w-12 text-center font-semibold">{qty}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item._id, qty + 1)}
                                disabled={isUpdating}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                              >
                                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Price: ₹{price.toLocaleString()}</p>
                            <p className="text-lg font-bold text-orange-500">₹{(price * qty).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delivery Address</h2>
                {!address && (
                  <button
                    onClick={() => navigate(`/address/${couponDiscount}/${totalAmount}/${0}`)}
                    className="text-orange-500 hover:text-orange-600 text-sm"
                  >
                    + Add Address
                  </button>
                )}
              </div>
              {address ? (
                <div className="text-gray-700">
                  <p className="font-semibold">{address.mob1}</p>
                  <p>{address.address}, {address.area}</p>
                  <p>{address.city}, {address.state} - {address.postalcode}</p>
                  <p className="text-sm text-gray-500 mt-2">Landmark: {address.landmark}</p>
                  <button
                    onClick={() => navigate(`/address/${couponDiscount}/${totalAmount}/${0}`)}
                    className="text-orange-500 text-sm mt-2"
                  >
                    Change Address
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No address added</p>
                  <button
                    onClick={() => navigate(`/address/${couponDiscount}/${totalAmount}/${0}`)}
                    className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Add Address
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              
              {/* Payment Method Selection */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                       style={{ borderColor: paymentMethod === 'online' ? '#f97316' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mr-3"
                  />
                  <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-orange-500" />
                  <span className="font-medium">Online Payment</span>
                </label>
                
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                       style={{ borderColor: paymentMethod === 'cod' ? '#f97316' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mr-3"
                  />
                  <FontAwesomeIcon icon={faTruck} className="mr-2 text-orange-500" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-4 mb-6">
                <h3 className="text-lg font-semibold mb-3">Have a Coupon?</h3>
                {!couponApplied ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm">{couponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-green-800">SRIFURNITURE10</p>
                        <p className="text-sm text-green-600">10% discount applied</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{(totalAmount + couponDiscount).toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Coupon Discount (10%)</span>
                    <span>-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t mt-4">
                  <span>Total</span>
                  <span className="text-orange-500">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Continue to Address Button */}
              <button
                onClick={() => navigate(`/address/${couponDiscount}/${totalAmount}/${0}`)}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all mb-3"
              >
                Continue to Address
              </button>

              {/* Pay Now Button */}
              <button
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faLock} />
                    {paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
                  </>
                )}
              </button>

              {lastError && retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  disabled={loading}
                  className="w-full mt-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
                >
                  Try Again ({retryCount}/3)
                </button>
              )}

              {paymentMethod === 'online' && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Cashfree
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;