import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTruck, faLock } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online'); // Default to online
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      // Save that we want to checkout
      localStorage.setItem('afterLoginRedirect', '/checkout');
      toast.info('Please login to checkout');
      navigate('/login?next=/checkout');
      return;
    }

    // Load cart and address
    loadCartData();
    loadAddress();
  }, [navigate]);

  // Auto-trigger payment after login (runs when cart and address are loaded)
  useEffect(() => {
    const shouldAutoPay = localStorage.getItem('shouldAutoPayAfterLogin');
    const paymentMode = sessionStorage.getItem('paymentMode');
    
    // Only auto-trigger if: flag is set, cart loaded, address loaded, not already loading
    if (shouldAutoPay === 'true' && !loading && !addressLoading && cartItems.length > 0) {
      // Set payment method to online if saved
      if (paymentMode === 'online') {
        setPaymentMethod('online');
        sessionStorage.removeItem('paymentMode');
        
        // Wait a moment for paymentMethod state to update, then check
        setTimeout(() => {
          // For online payment, address is required - check if we have it
          if (address) {
            console.log('✅ Address available, auto-triggering payment after login...');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            // Trigger payment
            handlePayment();
          } else {
            // If no address, clear flag and let user add address first
            console.log('⚠️ Address required for payment, user needs to add address first');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            toast.info('Please add delivery address to continue payment');
          }
        }, 500);
        return;
      } else {
        // Payment mode not set or not online, clear flag
        localStorage.removeItem('shouldAutoPayAfterLogin');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length, address, loading, addressLoading]);

  const loadCartData = async () => {
    try {
      const token = localStorage.getItem('token');
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
      
      // Calculate total
      const total = items.reduce((sum, item) => {
        const price = item.price || (item.product?.price || 0);
        const qty = item.qty || 1;
        return sum + (price * qty);
      }, 0);
      
      setTotalAmount(total);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast.error('Failed to load cart items');
    }
  };

  const loadAddress = async () => {
    try {
      setAddressLoading(true);
      const response = await API.get('/api/address');
      setAddress(response.data);
    } catch (error) {
      // Address may not exist yet
      setAddress(null);
    } finally {
      setAddressLoading(false);
    }
  };

  const [cashfreeLoading, setCashfreeLoading] = useState(false);

  const loadCashfreeSDK = () => {
    return new Promise((resolve, reject) => {
      if (window?.Cashfree) {
        return resolve(window.Cashfree);
      }
      const existingScript = document.getElementById('cashfree-sdk');
      if (existingScript) {
        existingScript.onload = () => resolve(window.Cashfree);
        existingScript.onerror = reject;
        return;
      }
      const script = document.createElement('script');
      script.id = 'cashfree-sdk';
      script.src = 'https://sdk.cashfree.com/js/ui/pg-sdk.js';
      script.async = true;
      script.onload = () => resolve(window.Cashfree);
      script.onerror = (err) => reject(err);
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

      if (paymentMethod === 'cod') {
        // For COD, user needs address first
        if (!address) {
          toast.error('Please add delivery address first');
          navigate('/address/0/0/0'); // Navigate to address page
          return;
        }

        setLoading(true);
        const response = await API.post('/api/orders', {
          address: address._id,
          total: totalAmount,
          mode: 'cod'
        });
        
        toast.success(response.data.message || 'Order placed successfully!');
        setLoading(false);
        navigate('/');
        return;
      }

      // Online payment - directly open Cashfree payment gateway
      if (!address) {
        // For online payment, we can create address after payment, but user should add it
        toast.error('Please add delivery address first');
        navigate('/address/0/0/0');
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

      const payload = {
        amount: amountNumber,
        currency: 'INR',
        name,
        email,
        phone,
        customer_id: customerId
      };

      console.log('🟢 Sending Cashfree create payload:', payload);
      const res = await API.post('/api/cashfree/create', payload);

      const respPayload = res.data || {};
      const cfData = respPayload.data || {};
      const backendOrderId = respPayload.orderId;

      console.log('📦 Cashfree response:', {
        orderId: backendOrderId,
        payment_link: respPayload.payment_link,
        payment_session_id: respPayload.payment_session_id,
        cfDataKeys: Object.keys(cfData)
      });

      const paymentLink = respPayload.payment_link || 
                         cfData.payment_link || 
                         cfData.paymentLink || 
                         cfData.paymentUrl ||
                         cfData.redirect_url || 
                         cfData.checkout_url;

      const paymentSessionId = respPayload.payment_session_id || 
                              cfData.payment_session_id || 
                              cfData.paymentSessionId ||
                              cfData.paymentSessionID;

      const orderId = backendOrderId || cfData.order_id || cfData.orderId;

      if (!orderId) {
        console.error('❌ No orderId in Cashfree response:', respPayload);
        toast.error('Payment initialization failed: missing order ID');
        setLoading(false);
        return;
      }

      // Save order info BEFORE redirect (critical!)
      localStorage.setItem('cf_orderId', orderId);
      localStorage.setItem('cf_addressId', address._id);
      localStorage.setItem('cf_total', String(amountNumber));
      console.log('💾 Saved payment info:', { orderId, addressId: address._id, total: amountNumber });

      if (paymentLink && typeof paymentLink === 'string' && paymentLink.startsWith('http')) {
        console.log('✅ Payment link received! Redirecting NOW to Cashfree payment gateway...');
        console.log('🔗 Payment URL:', paymentLink);
        toast.success('Redirecting to payment gateway...');
        setLoading(false);
        // IMMEDIATE redirect - use replace to prevent back button/loops
        window.location.replace(paymentLink);
        return; // Exit immediately
      }

      if (paymentSessionId && typeof paymentSessionId === 'string') {
        try {
          setCashfreeLoading(true);
          const cashfree = await loadCashfreeSDK();
          if (!cashfree || typeof cashfree.initialiseDropCheckout !== 'function') {
            throw new Error('Cashfree SDK failed to load');
          }
          toast.info('Opening secure Cashfree checkout...');
          await cashfree.initialiseDropCheckout({
            paymentSessionId,
            redirectTarget: '_self',
          });
          setCashfreeLoading(false);
          setLoading(false);
          return;
        } catch (sdkError) {
          console.error('Cashfree SDK initialise error:', sdkError);
          toast.error(sdkError?.message || 'Failed to open Cashfree checkout.');
          setCashfreeLoading(false);
          setLoading(false);
          return;
        }
      }

      console.error('❌ CRITICAL: No payment link or session ID returned from Cashfree!');
      console.error('📦 Full response:', JSON.stringify(respPayload, null, 2));
      toast.error('Payment initialization failed: Cashfree did not return payment link. Please check console.');
      setLoading(false);
    } catch (error) {
      console.error('❌ Payment error:', error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        (typeof error === 'string' ? error : 'Failed to initiate payment. Please try again.');
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
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
                    
                    return (
                      <div key={item._id} className="flex gap-4 pb-4 border-b last:border-0">
                        <img
                          src={image}
                          alt={item.product_name || product.pname}
                          className="w-24 h-24 object-cover rounded"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.product_name || product.pname}</h3>
                          <p className="text-sm text-gray-600">Quantity: {qty}</p>
                          <p className="text-lg font-bold text-orange-500 mt-2">₹{price.toLocaleString()}</p>
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
                    onClick={() => navigate('/address/0/0/0')}
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
                    onClick={() => navigate('/address/0/0/0')}
                    className="text-orange-500 text-sm mt-2"
                  >
                    Change Address
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No address added</p>
                  <button
                    onClick={() => navigate('/address/0/0/0')}
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

              {/* Price Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t mt-4">
                  <span>Total</span>
                  <span className="text-orange-500">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

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

