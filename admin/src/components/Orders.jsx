import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const intervalRef = useRef(null);

  // Load orders function
  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        setLoading(false);
        return;
      }

      // Use the publicOrders endpoint which has better formatting
      const response = await axiosInstance.get(`/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle standardized response format: { success, message, data, pagination }
      let list = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        list = response.data.data;
      } else if (Array.isArray(response.data)) {
        list = response.data;
      } else if (response.data?.orders && Array.isArray(response.data.orders)) {
        list = response.data.orders;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        list = response.data.data;
      }
      
      // Ensure all orders have required fields (no undefined/null)
      const formattedOrders = list.map(order => ({
        _id: order._id || order.id || 'N/A',
        orderId: order.orderId || order._id?.toString().substring(0, 8) || 'N/A',
        name: order.name || 'N/A',
        phone: order.phone || 'N/A',
        email: order.email || 'N/A',
        address: order.address || 'N/A',
        city: order.city || 'N/A',
        state: order.state || 'N/A',
        pincode: order.pincode || 'N/A',
        productName: order.productName || 'Custom Order',
        productPrice: order.productPrice || 0,
        paymentStatus: order.paymentStatus || 'pending',
        paymentMode: order.paymentMode || 'na',
        formType: order.formType || 'order',
        createdAt: order.createdAt || new Date()
      }));
      
      setOrders(formattedOrders);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load orders:', error);
      if (error.response?.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadOrders();
    
    // Set up polling every 10 seconds for real-time updates
    intervalRef.current = setInterval(() => {
      loadOrders();
    }, 10000); // Poll every 10 seconds

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  // Format order items for display
  const formatOrderItems = (order) => {
    if (order.products && Array.isArray(order.products) && order.products.length > 0) {
      return order.products.map(p => p.pname || p.name || 'Product').join(', ');
    }
    if (order.productName) {
      return order.productName;
    }
    if (order.product && typeof order.product === 'object') {
      return order.product.pname || order.product.name || 'Product';
    }
    return 'Custom Order';
  };

  // Get customer name
  const getCustomerName = (order) => {
    if (order.name) return order.name;
    if (order.user && typeof order.user === 'object') {
      if (order.user.first_name || order.user.last_name) {
        return `${order.user.first_name || ''} ${order.user.last_name || ''}`.trim();
      }
      return order.user.username || order.user.email || 'N/A';
    }
    return 'N/A';
  };

  // Get phone number
  const getPhone = (order) => {
    if (order.phone) return order.phone;
    if (order.user && typeof order.user === 'object' && order.user.phone) {
      return order.user.phone;
    }
    if (order.address && typeof order.address === 'object' && order.address.phone) {
      return order.address.phone;
    }
    return 'N/A';
  };

  // Get address
  const getAddress = (order) => {
    if (order.address && typeof order.address === 'string') {
      return order.address;
    }
    if (order.address && typeof order.address === 'object') {
      const addr = order.address;
      const parts = [
        addr.address_line1,
        addr.address_line2,
        addr.area,
        addr.landmark
      ].filter(Boolean);
      return parts.length > 0 ? parts.join(', ') : 'N/A';
    }
    return 'N/A';
  };

  // Get pincode
  const getPincode = (order) => {
    if (order.pincode) return order.pincode;
    if (order.address && typeof order.address === 'object' && order.address.zip) {
      return order.address.zip;
    }
    if (order.address && typeof order.address === 'object' && order.address.postalcode) {
      return order.address.postalcode;
    }
    return 'N/A';
  };

  // Get amount
  const getAmount = (order) => {
    if (order.productPrice !== undefined && order.productPrice !== null) {
      return Number(order.productPrice);
    }
    if (order.total !== undefined && order.total !== null) {
      return Number(order.total);
    }
    if (order.amount !== undefined && order.amount !== null) {
      return Number(order.amount);
    }
    return 0;
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Orders Management</h2>
            <p>View and manage customer orders</p>
          </div>
          {lastUpdate && (
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
              <span style={{ marginLeft: '8px', color: '#10b981' }}>●</span>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>All Orders ({orders.length})</h3>
          <button 
            onClick={loadOrders}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        {loading && orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No orders found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Order Items</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id || order.id}>
                    <td className="font-mono text-sm">{order.orderId || order._id?.substring(0, 8) || 'N/A'}</td>
                    <td>{getCustomerName(order)}</td>
                    <td>{getPhone(order)}</td>
                    <td style={{ maxWidth: '200px', wordBreak: 'break-word' }}>{getAddress(order)}</td>
                    <td>{getPincode(order)}</td>
                    <td style={{ maxWidth: '200px', wordBreak: 'break-word' }}>{formatOrderItems(order)}</td>
                    <td>₹{getAmount(order).toLocaleString('en-IN')}</td>
                    <td>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor:
                            order.paymentStatus === 'paid' || order.paymentStatus === 'success'
                              ? '#d4edda'
                              : order.paymentStatus === 'cod'
                              ? '#e0e7ff'
                              : order.paymentStatus === 'pending'
                              ? '#fff3cd'
                              : '#f8d7da',
                          color:
                            order.paymentStatus === 'paid' || order.paymentStatus === 'success'
                              ? '#155724'
                              : order.paymentStatus === 'cod'
                              ? '#1e3a8a'
                              : order.paymentStatus === 'pending'
                              ? '#92400e'
                              : '#721c24'
                        }}
                      >
                        {(order.paymentStatus || 'pending')?.toUpperCase()}
                      </span>
                    </td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
