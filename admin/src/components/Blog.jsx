import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'buying-guide',
    categoryName: 'Buying Guide',
    author: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'published',
    date: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    { id: 'beds', name: 'Beds' },
    { id: 'sofas', name: 'Sofas' },
    { id: 'dining', name: 'Dining' },
    { id: 'study-office', name: 'Study & Office' },
    { id: 'storage', name: 'Storage' },
    { id: 'trend-alert', name: 'Trend Alert' },
    { id: 'buying-guide', name: 'Buying Guide' }
  ];

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/blogs?status=all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      const cat = categories.find(c => c.id === value);
      setFormData({
        ...formData,
        category: value,
        categoryName: cat ? cat.name : ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const token = localStorage.getItem('adminToken');
    const fd = new FormData();
    fd.append('image', imageFile);

    try {
      const response = await axios.post('/api/upload', fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.imageUrl || response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData({ ...formData, slug });
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please login as admin');
      return;
    }

    setUploading(true);

    let imageUrl = formData.image;
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    let formattedDate = formData.date;
    if (formData.date) {
      const dateObj = new Date(formData.date);
      formattedDate = dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    const submitData = { ...formData, image: imageUrl, date: formattedDate };

    try {
      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog._id}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Blog updated successfully');
      } else {
        await axios.post('/api/blogs', submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Blog created successfully');
      }
      setShowForm(false);
      setEditingBlog(null);
      resetForm();
      loadBlogs();
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'buying-guide',
      categoryName: 'Buying Guide',
      author: '',
      excerpt: '',
      content: '',
      image: '',
      status: 'published',
      date: new Date().toISOString().split('T')[0]
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleEdit = (blog) => {
    let editDate = new Date().toISOString().split('T')[0];
    if (blog.date) {
      const parts = blog.date.split(' ');
      if (parts.length === 3) {
        const months = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
        const month = months[parts[1]];
        const day = parts[0].padStart(2, '0');
        const year = parts[2];
        if (month && day && year) {
          editDate = `${year}-${month}-${day}`;
        }
      }
    }

    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      categoryName: blog.categoryName,
      author: blog.author,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      status: blog.status,
      date: editDate
    });
    setImagePreview(blog.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Blog deleted');
      loadBlogs();
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Blog Management</h2>
          <button className="btn btn-success" onClick={() => {
            setShowForm(true);
            setEditingBlog(null);
            resetForm();
          }}>
            Add New Blog
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{ flex: 1 }}
                  required
                />
                <button type="button" className="btn" onClick={generateSlug}>Generate Slug</button>
              </div>
            </div>
            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Admin"
              />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
              />
              {imagePreview && (
                <div style={{ marginTop: '10px' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Excerpt / Short Description *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-success" disabled={uploading}>
                {uploading ? 'Uploading...' : (editingBlog ? 'Update Blog' : 'Add Blog')}
              </button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Blogs</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>
                  <img src={blog.image || 'https://placehold.co/50x50/f97316/white?text=No+Img'} alt={blog.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td>{blog.title}</td>
                <td>{blog.categoryName}</td>
                <td>{blog.author}</td>
                <td>
                  <span className={`stock-badge ${blog.status === 'published' ? 'bg-blue' : 'bg-red'}`}>
                    {blog.status}
                  </span>
                </td>
                <td>{blog.date || formatDateForDisplay(blog.createdAt)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-edit" onClick={() => handleEdit(blog)}>✏️</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .card { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-success { background: #10B981; color: white; }
        .btn-edit { background: #3B82F6; color: white; margin-right: 5px; }
        .btn-danger { background: #EF4444; color: white; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
        .stock-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .bg-blue { background: #DBEAFE; color: #1D4ED8; }
        .bg-red { background: #FEE2E2; color: #B91C1C; }
      `}</style>
    </div>
  );
};

export default Blog;