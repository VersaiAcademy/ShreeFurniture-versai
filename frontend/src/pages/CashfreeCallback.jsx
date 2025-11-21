import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';

const CashfreeCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const verify = async () => {
      try {
        setLoading(true);
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Please login to verify payment');
          toast.error('Please login to verify payment');
          setTimeout(() => navigate('/login'), 1500);
          setLoading(false);
          return;
        }

        // Prefer orderId from query params (Cashfree may add it to return URL), else from localStorage
        const params = new URLSearchParams(location.search);
        const orderIdQ = params.get('orderId') || params.get('order_id') || params.get('orderId') || null;
        const orderId = orderIdQ || localStorage.getItem('cf_orderId');
        const addressId = params.get('addressId') || localStorage.getItem('cf_addressId');
        const total = params.get('total') || localStorage.getItem('cf_total');

        if (!orderId) {
          setMessage('Missing order id for verification');
          toast.error('Missing order id for verification');
          setLoading(false);
          setTimeout(() => navigate('/cart'), 2000);
          return;
        }

        // Verify payment and create order
        const res = await API.post('/api/cashfree/verify', { orderId, addressId, total });
        if (res.status === 200 && res.data.message) {
          setMessage('Payment successful. Order placed.');
          toast.success(res.data.message || 'Payment successful. Order placed.');
          // clear stored cart info used for verification
          localStorage.removeItem('cf_orderId');
          localStorage.removeItem('cf_addressId');
          localStorage.removeItem('cf_total');
          setLoading(false);
          // Navigate to orders page (not profile) after short delay
          // User can manually go to profile if needed
          setTimeout(() => {
            // Try to go to orders page instead of profile
            // If orders page doesn't exist, go to home
            navigate('/', { replace: true });
            // After a moment, show success message
            setTimeout(() => {
              toast.success('Order placed successfully! Check your orders.');
            }, 500);
          }, 1500);
          return;
        }

        setMessage('Payment verification failed');
        toast.error('Payment verification failed');
        setLoading(false);
        setTimeout(() => navigate('/cart'), 2000);
      } catch (err) {
        console.error('Cashfree verify error:', err.response?.data || err.message || err);
        const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
        setMessage(`Verification error: ${errorMsg}`);
        toast.error(err.response?.data?.message || 'Verification failed. If payment succeeded, contact support.');
        setLoading(false);
        setTimeout(() => navigate('/cart'), 2000);
      }
    };

    verify();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow text-center w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600">{message}</p>
          </div>
        ) : (
          <p className="text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CashfreeCallback;
