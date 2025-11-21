import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Verifying payment...');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Please login to verify payment');
          toast.error('Please login to verify payment');
          setTimeout(() => navigate('/login?next=/checkout'), 1500);
          setLoading(false);
          return;
        }

        // Get order_id from URL params or localStorage
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
        
        // Get address and total from localStorage
        const addressId = localStorage.getItem('cf_addressId');
        const total = localStorage.getItem('cf_total');

        // Verify payment and create order
        const res = await API.post('/api/cashfree/verify', { 
          orderId: finalOrderId, 
          addressId, 
          total 
        });
        
        if (res.status === 200 && res.data.message) {
          setSuccess(true);
          setMessage(res.data.message || 'Payment successful! Order placed.');
          toast.success('Payment successful! Order placed.');
          
          // Clear stored payment info
          localStorage.removeItem('cf_orderId');
          localStorage.removeItem('cf_addressId');
          localStorage.removeItem('cf_total');
          localStorage.removeItem('shouldAutoPayAfterLogin');
          sessionStorage.removeItem('checkoutData');
          sessionStorage.removeItem('buyNowProduct');
          sessionStorage.removeItem('paymentMode');
          
          setLoading(false);
          
          // Navigate to home after showing success
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
          return;
        }

        setSuccess(false);
        setMessage('Payment verification failed');
        toast.error('Payment verification failed');
        setLoading(false);
      } catch (err) {
        console.error('Payment verification error:', err.response?.data || err.message || err);
        const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
        setSuccess(false);
        setMessage(`Verification error: ${errorMsg}`);
        toast.error(err.response?.data?.message || 'Verification failed. If payment succeeded, contact support.');
        setLoading(false);
        
        // Navigate to cart on error
        setTimeout(() => navigate('/cart'), 3000);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Payment Status</h2>
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600">{message}</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-green-500 text-6xl mb-2" 
            />
            <p className="text-green-600 font-semibold text-lg">{message}</p>
            {orderId && (
              <p className="text-gray-600 text-sm">
                Order ID: <span className="font-mono font-semibold">{orderId}</span>
              </p>
            )}
            <p className="text-gray-500 text-sm mt-4">
              Redirecting to home page...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              className="text-red-500 text-6xl mb-2" 
            />
            <p className="text-red-600 font-semibold text-lg">{message}</p>
            <p className="text-gray-500 text-sm mt-4">
              Redirecting to cart...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;

