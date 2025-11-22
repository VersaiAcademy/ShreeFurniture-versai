import React, { useState, useEffect } from 'react';
import API from '../utils/axiosInstance';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await API.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('You must be logged in as admin to perform this action.');
      window.location.href = '/';
      return;
    }
    
    try {
      if (editingCategory) {
        await API.put(`/api/categories/${editingCategory._id}`, formData);
      } else {
        await API.post('/api/categories', formData);
      }
      
      setShowForm(false);
      setEditingCategory(null);
      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      const serverMsg = error?.response?.data?.message || error?.response?.data || error.message;
      alert(`Failed to save category: ${serverMsg}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: ''
    });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await API.delete(`/api/categories/${id}`);
        loadCategories();
      } catch (error) {
        console.error('Failed to delete category:', error);
        const serverMsg = error?.response?.data?.message || error?.response?.data || error.message;
        alert(`Failed to delete category: ${serverMsg}`);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Categories Management</h2>
          <button 
            className="btn btn-success" 
            onClick={() => {
              setShowForm(true);
              setEditingCategory(null);
              resetForm();
            }}
          >
            Add New Category
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Dining Tables"
              />
            </div>
            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                placeholder="e.g., dining-tables"
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-success">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Categories</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <button 
                    className="btn" 
                    onClick={() => handleEdit(category)}
                    style={{ marginRight: '5px' }}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
