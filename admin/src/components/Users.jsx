import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async (q = search) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = { page, limit: 100 };
      if (q) params.search = q;
      const res = await axios.get(`/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsers([]);
      // Show friendly error for auth or network issues
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          setError('Unauthorized. Please login as admin.');
        } else if (err.response.status === 404) {
          setError('API not found. Check backend URL/deployment.');
        } else {
          setError(err.response.data?.message || 'Failed to load users');
        }
      } else if (err.request) {
        setError('No response from server. Check backend is running.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUserDetails = async (id) => {
    setDetailLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedUser(res.data);
    } catch (err) {
      console.error('Failed to load user details:', err);
      alert(err.response?.data?.message || 'Failed to load user details');
    } finally {
      setDetailLoading(false);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers(search);
  };

  return (
    <div>
      <h2>Registered Users</h2>
      {error && (
        <div style={{ marginBottom: 12, color: '#842029', background: '#f8d7da', padding: 8, borderRadius: 4 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSearch} style={{ marginBottom: 12 }}>
        <input
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: 300, marginRight: 8 }}
        />
        <button className="btn">Search</button>
      </form>

      <div className="card">
        {loading ? (
          <div>Loading users...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '8px 12px' }}>Name</th>
                  <th style={{ padding: '8px 12px' }}>Email</th>
                  <th style={{ padding: '8px 12px' }}>Phone</th>
                  <th style={{ padding: '8px 12px' }}>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: 12 }}>No users found</td>
                  </tr>
                )}
                {users.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={() => loadUserDetails(u._id)}>
                    <td style={{ padding: '8px 12px' }}>{u.name || '-'}</td>
                    <td style={{ padding: '8px 12px' }}>{u.email || '-'}</td>
                    <td style={{ padding: '8px 12px' }}>{u.phone || '-'}</td>
                    <td style={{ padding: '8px 12px' }}>{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className="btn" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
              <div style={{ alignSelf: 'center' }}>Page {page} / {totalPages}</div>
              <button className="btn" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedUser(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 800, maxWidth: '95%', background: 'white', padding: 20, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>User Details</h3>
              <button className="btn" onClick={() => setSelectedUser(null)}>Close</button>
            </div>
            {detailLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <p><strong>Name:</strong> {selectedUser.user?.first_name || selectedUser.user?.username} {selectedUser.user?.last_name}</p>
                <p><strong>Username:</strong> {selectedUser.user?.username}</p>
                <p><strong>Email:</strong> {selectedUser.user?.email}</p>
                <p><strong>Phone:</strong> {selectedUser.address?.mob1 || '-'}</p>
                <p><strong>Registered:</strong> {new Date(selectedUser.user?.createdAt).toLocaleString()}</p>
                <p><strong>Total Orders:</strong> {selectedUser.totalOrders || 0}</p>
                <h4>Recent Orders</h4>
                {selectedUser.recentOrders && selectedUser.recentOrders.length > 0 ? (
                  <ul>
                    {selectedUser.recentOrders.map(o => (
                      <li key={o._id}>{o.order_id} — ₹{o.total} — {o.status} — {new Date(o.createdAt).toLocaleString()}</li>
                    ))}
                  </ul>
                ) : (<div>No recent orders</div>)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
