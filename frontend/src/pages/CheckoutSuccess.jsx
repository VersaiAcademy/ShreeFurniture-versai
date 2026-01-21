//frontend/src/pages/CheckoutSuccess.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { trackPurchase } from '../utils/metaPixel';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Verifying payment...');
  const [orderId, setOrderId] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const mode = searchParams.get('mode') || 'online';
  const formatCurrency = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 'N/A';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    const verifyPayment = async () => {
      if (mode === 'cod') {
        const summary = sessionStorage.getItem('paymentSuccessSummary');
        const messageFromStorage = sessionStorage.getItem('paymentSuccessMessage');
        const cartItems = summary ? JSON.parse(summary).items : [];
        const totalAmount = summary ? JSON.parse(summary).totalAmount : 0;
        const orderId = searchParams.get('order_id');
        
        setOrderSummary(summary ? JSON.parse(summary) : null);
        setOrderId(orderId);
        setMessage(messageFromStorage || 'Order placed successfully! Our team will reach you shortly.');
        setSuccess(true);
        setLoading(false);
        
        // Track Purchase event (Meta Pixel) for COD
        if (cartItems.length > 0 && totalAmount > 0) {
          trackPurchase(cartItems, totalAmount, orderId);
        }
        
        sessionStorage.removeItem('paymentSuccessSummary');
        sessionStorage.removeItem('paymentSuccessMessage');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 5000);
        return;
      }

      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Please login to verify payment');
          toast.error('Please login to verify payment');
          setTimeout(() => navigate('/login?next=/checkout'), 1500);
          setLoading(false);
          return;
        }

        const orderIdFromUrl = searchParams.get('order_id') || searchParams.get('orderId');
        const orderIdFromStorage = localStorage.getItem('cf_orderId');
        const finalOrderId = orderIdFromUrl || orderIdFromStorage;

        if (!finalOrderId) {
          setMessage('Missing order ID for verification');
          toast.error('Missing order ID for verification');
          setLoading(false);
          setTimeout(() => navigate('/cart'), 2000);
          return;
        }

        setOrderId(finalOrderId);

        const addressId = localStorage.getItem('cf_addressId');
        const total = localStorage.getItem('cf_total');

        const res = await API.post('/api/cashfree/verify', { 
          orderId: finalOrderId, 
          addressId, 
          total 
        });

        if (res.status === 200 && res.data.message) {
          setSuccess(true);

          setMessage(
            res.data.message || 
            'Payment successful! Your order has been confirmed.'
          );
          if (res.data.orderSummary) {
            setOrderSummary(res.data.orderSummary);
            sessionStorage.setItem('paymentSuccessSummary', JSON.stringify(res.data.orderSummary));
            
            // Track Purchase event (Meta Pixel) for online payment
            const cartItems = res.data.orderSummary.items || [];
            const totalAmount = res.data.orderSummary.totalAmount || Number(total) || 0;
            if (cartItems.length > 0 && totalAmount > 0) {
              trackPurchase(cartItems, totalAmount, finalOrderId);
            }
          }

          toast.success('Order Confirmed! Email Sent.');

          // Clear data
          localStorage.removeItem('cf_orderId');
          localStorage.removeItem('cf_addressId');
          localStorage.removeItem('cf_total');
          localStorage.removeItem('shouldAutoPayAfterLogin');
          sessionStorage.removeItem('checkoutData');
          sessionStorage.removeItem('buyNowProduct');
          sessionStorage.removeItem('paymentMode');

          setLoading(false);

          // DO NOT redirect immediately — give user confirmation UI
          setTimeout(() => {
            sessionStorage.removeItem('paymentSuccessSummary');
            sessionStorage.removeItem('paymentSuccessMessage');
            navigate('/', { replace: true });
          }, 6000); // 6 seconds stay on confirmation page

          return;
        }

        setSuccess(false);
        setMessage('Payment verification failed');
        toast.error('Payment verification failed');
        setLoading(false);

      } catch (err) {
        console.error('Payment verification error:', err.response?.data || err.message);
        const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
        setSuccess(false);
        setMessage(`Verification error: ${errorMsg}`);
        toast.error(
          err.response?.data?.message || 
          'Verification failed. If payment succeeded, contact support.'
        );
        setLoading(false);

        setTimeout(() => navigate('/cart'), 4000);
      }
    };

    verifyPayment();
  }, [searchParams, navigate, mode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        
        {loading ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Payment Status</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">{message}</p>
            </div>
          </>
        ) : success ? (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-6xl mb-4"
            />
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Order Confirmed!
            </h2>

            <p className="text-gray-700 text-md mb-2">{message}</p>

            <div className="space-y-4 mt-4 text-left">
              {orderId && (
                <p className="text-gray-800 text-md">
                  <strong>Order ID:</strong>{' '}
                  <span className="font-mono font-semibold">{orderId}</span>
                </p>
              )}
              {orderSummary && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                  <p className="text-gray-700"><strong>Name:</strong> {orderSummary.name}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {orderSummary.phone}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {orderSummary.address}</p>
                  <p className="text-gray-700"><strong>Pincode:</strong> {orderSummary.pincode}</p>
                  <p className="text-gray-700"><strong>Product:</strong> {orderSummary.productName || 'Custom order'}</p>
                  <p className="text-gray-700"><strong>Amount:</strong> {formatCurrency(orderSummary.productPrice)}</p>
                  <p className="text-gray-700">
                    <strong>Payment Status:</strong> {orderSummary.paymentStatus?.toUpperCase()}
                  </p>
                </div>
              )}
              <p className="text-gray-600 text-sm">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting to home page...
              </p>
            </div>
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-red-500 text-6xl mb-4"
            />
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-700 text-md mb-4">{message}</p>
            <p className="text-gray-500 text-sm">
              Redirecting to cart...
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default CheckoutSuccess;
