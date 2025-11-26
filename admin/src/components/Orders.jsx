import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const list = response.data?.data || response.data?.orders || [];
      setOrders(list);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div>
      <div className="card">
        <h2>Orders Management</h2>
        <p>View and manage customer orders</p>
      </div>

      <div className="card">
        <h3>All Orders</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="font-mono text-sm">{order.orderId}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.pincode}</td>
                  <td>{order.productName || 'Custom'}</td>
                  <td>₹{Number(order.productPrice || 0).toLocaleString('en-IN')}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          order.paymentStatus === 'paid'
                            ? '#d4edda'
                            : order.paymentStatus === 'cod'
                            ? '#e0e7ff'
                            : '#fff3cd',
                        color:
                          order.paymentStatus === 'paid'
                            ? '#155724'
                            : order.paymentStatus === 'cod'
                            ? '#1e3a8a'
                            : '#92400e'
                      }}
                    >
                      {order.paymentStatus?.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
