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
      const response = await axios.get(`/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data || response.data.orders || []);
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
                <th>Product</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="font-mono text-sm">{order.order_id}</td>
                  <td>{order.user?.first_name || order.user?.username || 'N/A'}</td>
                  <td>{order.user?.phone || order.address?.mob1 || 'N/A'}</td>
                  <td>
                    <span className="text-sm max-w-xs">
                      {order.address?.address || 'N/A'}
                      {order.address?.area && `, ${order.address.area}`}
                      {order.address?.city && `, ${order.address.city}`}
                      {order.address?.postalcode && ` - ${order.address.postalcode}`}
                    </span>
                  </td>
                  <td>{order.product?.pname || 'N/A'}</td>
                  <td>₹{order.total?.toLocaleString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: order.status === 'delivered' ? '#d4edda' : 
                                     order.status === 'confirmed' ? '#fff3cd' : 
                                     order.status === 'dispatched' ? '#d1ecf1' : '#f8d7da',
                      color: order.status === 'delivered' ? '#155724' : 
                             order.status === 'confirmed' ? '#856404' : 
                             order.status === 'dispatched' ? '#0c5460' : '#721c24'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
