//Wooden-Street-Main-Project-\admin\src\components\Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic fields
    pname: '',
    pdesc: '',
    price: '',
    offer: '0',
    stock_count: '0',
    material: '',
    warranty: '36 Months',
    brand: 'Shri Furniture Village',
    rating: '5',
    color: '',
    category: '',
    
    // Product Overview fields
    dimensions: '',
    sku: '',
    finish: '',
    storage: '',
    size: '',
    seater: '',
    features: '',
    pack_content: '',
    delivery_condition: 'Knocked Down',
    dispatch_in: '5 Weeks',
    customization: 'Customized can be as per requirement.',
    note: 'If a board is required, we use MDF instead of plywood',
    fabric_color: '',
    design: 'Modern',
    
    // Images
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    imageFiles: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setFormData({ ...formData, imageFiles: files });
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImagesToCloudinary = async () => {
    if (!formData.imageFiles || formData.imageFiles.length === 0) return [];
    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const isMultiple = formData.imageFiles.length > 1;
      const endpoint = isMultiple 
        ? `/api/upload/multiple` 
        : `/api/upload`;
      const fieldName = isMultiple ? 'images' : 'image';

      const fd = new FormData();
      formData.imageFiles.forEach((file) => fd.append(fieldName, file));

      const response = await axios.post(endpoint, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (isMultiple) return response.data.imageUrls || [];
      return [response.data.imageUrl].filter(Boolean);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload images');
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.pname?.trim() || !formData.pdesc?.trim() || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please login as admin');
      return;
    }

    let submitData = {
      pname: formData.pname.trim(),
      pdesc: formData.pdesc.trim(),
      price: Number(formData.price),
      offer: Number(formData.offer) || 0,
      stock_count: Number(formData.stock_count) || 0,
      material: formData.material.trim(),
      warranty: formData.warranty.trim(),
      brand: formData.brand.trim(),
      rating: Number(formData.rating) || 5,
      color: formData.color?.trim() || '',
      category: formData.category,
      
      // Product Overview
      dimensions: formData.dimensions.trim(),
      sku: formData.sku.trim(),
      finish: formData.finish.trim(),
      storage: formData.storage.trim(),
      size: formData.size.trim(),
      seater: formData.seater.trim(),
      features: formData.features.trim(),
      pack_content: formData.pack_content.trim(),
      delivery_condition: formData.delivery_condition.trim(),
      dispatch_in: formData.dispatch_in.trim(),
      customization: formData.customization.trim(),
      note: formData.note.trim(),
      fabric_color: formData.fabric_color.trim(),
      design: formData.design.trim(),
      
      img1: formData.img1 || '',
      img2: formData.img2 || '',
      img3: formData.img3 || '',
      img4: formData.img4 || '',
      img5: formData.img5 || ''
    };

    try {
      // Upload images
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const urls = await uploadImagesToCloudinary();
        if (urls.length === 0) {
          alert('Image upload failed');
          return;
        }
        submitData.img1 = urls[0] || submitData.img1;
        submitData.img2 = urls[1] || submitData.img2;
        submitData.img3 = urls[2] || submitData.img3;
        submitData.img4 = urls[3] || submitData.img4;
        submitData.img5 = urls[4] || submitData.img5;
      }

      if (!submitData.img1) {
        alert('At least one image is required');
        return;
      }

      if (editingProduct) {
        await axios.put(
          `/api/admin/products/${editingProduct._id}`, 
          submitData, 
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        alert('Product updated successfully!');
      } else {
        await axios.post(
          `/api/admin/products`, 
          submitData, 
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        alert('Product added successfully!');
      }
      
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      await loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      pname: '', pdesc: '', price: '', offer: '0', stock_count: '0',
      material: '', warranty: '36 Months', brand: 'Shri Furniture Village',
      rating: '5', color: '', category: '',
      dimensions: '', sku: '', finish: '', storage: '', size: '', seater: '',
      features: '', pack_content: '', delivery_condition: 'Knocked Down',
      dispatch_in: '5 Weeks', customization: 'Customized can be as per requirement.',
      note: 'If a board is required, we use MDF instead of plywood',
      fabric_color: '', design: 'Modern',
      img1: '', img2: '', img3: '', img4: '', img5: '', imageFiles: []
    });
    setImagePreviews([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      pname: product.pname || '',
      pdesc: product.pdesc || '',
      price: String(product.price || ''),
      offer: String(product.offer || '0'),
      stock_count: String(product.stock_count || '0'),
      material: product.material || '',
      warranty: product.warranty || '36 Months',
      brand: product.brand || 'Shri Furniture Village',
      rating: String(product.rating || '5'),
      color: product.color || '',
      category: product.category || '',
      dimensions: product.dimensions || '',
      sku: product.sku || '',
      finish: product.finish || '',
      storage: product.storage || '',
      size: product.size || '',
      seater: product.seater || '',
      features: product.features || '',
      pack_content: product.pack_content || '',
      delivery_condition: product.delivery_condition || 'Knocked Down',
      dispatch_in: product.dispatch_in || '5 Weeks',
      customization: product.customization || '',
      note: product.note || '',
      fabric_color: product.fabric_color || '',
      design: product.design || 'Modern',
      img1: product.img1 || '',
      img2: product.img2 || '',
      img3: product.img3 || '',
      img4: product.img4 || '',
      img5: product.img5 || '',
      imageFiles: []
    });
    setImagePreviews([product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean));
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Product deleted!');
        loadProducts();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div className="p-10 text-center"><h3>Loading...</h3></div>;

  return (
    <div>
      {/* Header for Product Management */}
      <div className="card">
        <div className="flex justify-between items-center">
          <h2>Products Management</h2>
          <button className="btn btn-success" onClick={() => { setShowForm(true); setEditingProduct(null); resetForm(); }}>
            ➕ Add Product
          </button>
        </div>
      </div>

      {/* Product Add/Edit Form */}
      {showForm && (
        <div className="card product-form">
          <h3>{editingProduct ? '✏️ Edit' : '➕ Add'} Product</h3>
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="form-section">
              <h4>📝 Basic Information</h4>
              <div className="form-group">
                <label>Product Name *</label>
                <input type="text" name="pname" value={formData.pname} onChange={handleInputChange} required placeholder="e.g., Lorenz 3 Seater Sofa" />
              </div>
              <div className="grid-responsive">
                <div className="form-group">
                  <label>Brand *</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Design</label>
                  <input type="text" name="design" value={formData.design} onChange={handleInputChange} placeholder="Modern" />
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="pdesc" value={formData.pdesc} onChange={handleInputChange} rows="3" required />
              </div>
              <div className="grid-responsive-3">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="1" />
                </div>
                <div className="form-group">
                  <label>Offer (%)</label>
                  <input type="number" name="offer" value={formData.offer} onChange={handleInputChange} min="0" max="100" />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" name="stock_count" value={formData.stock_count} onChange={handleInputChange} min="0" />
                </div>
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  {categories.map(cat => <option key={cat._id} value={cat.slug || cat.name}>{cat.name}</option>)}
                </select>
              </div>
            </div>

            {/* Product Overview */}
            <div className="form-section">
              <h4>📋 Product Overview</h4>
              <div className="grid-responsive">
                <div className="form-group">
                  <label>Material *</label>
                  <input type="text" name="material" value={formData.material} onChange={handleInputChange} required placeholder="Sheesham Wood" />
                </div>
                <div className="form-group">
                  <label>Warranty *</label>
                  <input type="text" name="warranty" value={formData.warranty} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Dimensions</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleInputChange} placeholder="77 L x 31 W x 14 H" />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="UWAWSB010TF002" />
                </div>
                <div className="form-group">
                  <label>Finish</label>
                  <input type="text" name="finish" value={formData.finish} onChange={handleInputChange} placeholder="Teak Finish" />
                </div>
                <div className="form-group">
                  <label>Storage</label>
                  <input type="text" name="storage" value={formData.storage} onChange={handleInputChange} placeholder="Drawer Storage" />
                </div>
                <div className="form-group">
                  <label>Size</label>
                  <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="King Size" />
                </div>
                <div className="form-group">
                  <label>Seater</label>
                  <input type="text" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="L Shape / 3 Seater" />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder="Cotton, Jade Ivory" />
                </div>
                <div className="form-group">
                  <label>Fabric Color</label>
                  <input type="text" name="fabric_color" value={formData.fabric_color} onChange={handleInputChange} placeholder="Steel Grey" />
                </div>
                <div className="form-group">
                  <label>Delivery Condition</label>
                  <input type="text" name="delivery_condition" value={formData.delivery_condition} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Dispatch In</label>
                  <input type="text" name="dispatch_in" value={formData.dispatch_in} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Features</label>
                <input type="text" name="features" value={formData.features} onChange={handleInputChange} placeholder="Premium Fabric, Orthopedic Firm Seating" />
              </div>
              <div className="form-group">
                <label>Pack Content</label>
                <input type="text" name="pack_content" value={formData.pack_content} onChange={handleInputChange} placeholder="1 Sofa with 4 Cushions" />
              </div>
              <div className="form-group">
                <label>Customization</label>
                <textarea name="customization" value={formData.customization} onChange={handleInputChange} rows="2" />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" value={formData.note} onChange={handleInputChange} rows="2" />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select name="rating" value={formData.rating} onChange={handleInputChange}>
                  {[1,2,3,4,5].map(r => <option key={r} value={r}>{'⭐'.repeat(r)}</option>)}
                </select>
              </div>
            </div>

            {/* Images */}
            <div className="form-section">
              <h4>📷 Images * (1-5)</h4>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-3" />
              {imagePreviews.length > 0 && (
                <div className="image-preview-container">
                  {imagePreviews.map((preview, i) => (
                    <div key={i} className="image-preview-item">
                      <img src={preview} alt={`Preview ${i+1}`} className="product-image-preview" />
                      <div className="image-tag">
                        {i === 0 ? '🌟 Main' : `#${i+1}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-success flex-1" disabled={uploading}>
                {uploading ? '⏳ Uploading...' : (editingProduct ? '✅ Update Product' : '➕ Add Product')}
              </button>
              <button type="button" className="btn btn-cancel flex-1" onClick={() => { setShowForm(false); resetForm(); }} disabled={uploading}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List Table */}
      <div className="card">
        <h3>📦 All Products ({products.length})</h3>
        {products.length === 0 ? (
          <div className="no-products-message">
            <p className="text-5xl">📦</p>
            <h4>No products found</h4>
            <p className="text-gray-600">Click '+ Add Product' to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="image-col">Image</th> {/* Custom class for image column */}
                  <th>Name</th>
                  <th className="hide-on-mobile">Brand</th>
                  <th>Price</th>
                  <th className="hide-on-mobile">Stock</th>
                  <th className="hide-on-mobile">Category</th>
                  <th className="actions-col">Actions</th> {/* Custom class for actions column */}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>
                      <img 
                        src={p.img1 || 'https://via.placeholder.com/60?text=No+Image'} 
                        alt={p.pname} 
                        className="product-table-image" /> {/* Image size fixed here */}
                    </td>
                    <td>
                        <span className="font-semibold block">{p.pname}</span>
                        <span className="show-on-mobile text-sm text-gray-500">{p.brand}</span>
                    </td>
                    <td className="hide-on-mobile">{p.brand}</td>
                    <td>
                        <strong>₹{p.price?.toLocaleString()}</strong>
                        {p.offer > 0 && <span className="text-xs text-red-500 ml-2">({p.offer}% OFF)</span>}
                    </td>
                    <td className="hide-on-mobile">
                      <span className={`stock-badge ${p.stock_count > 0 ? 'bg-blue' : 'bg-red'}`}>
                        {p.stock_count || 0}
                      </span>
                    </td>
                    <td className="hide-on-mobile">{p.category}</td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button className="btn btn-sm btn-edit" onClick={() => handleEdit(p)}>✏️ Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        /* --- Global & Base Styles --- */
        .card { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        h2, h3 { color: #333; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .flex-1 { flex: 1; }
        .gap-2 { gap: 0.5rem; }
        .text-center { text-align: center; }
        .text-gray-600 { color: #666; }
        .font-semibold { font-weight: 600; }
        .text-sm { font-size: 0.875rem; }
        .ml-2 { margin-left: 0.5rem; }
        .block { display: block; }
        .no-products-message { padding: 40px; text-align: center; }


        /* --- Button Styles --- */
        .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 3px 6px rgba(0,0,0,0.15); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-success { background: #10B981; color: white; } /* Tailwind green-500 */
        .btn-success:hover { background: #059669; }
        .btn-edit { background: #3B82F6; color: white; } /* Tailwind blue-500 */
        .btn-edit:hover { background: #2563EB; }
        .btn-danger { background: #EF4444; color: white; } /* Tailwind red-500 */
        .btn-danger:hover { background: #DC2626; }
        .btn-cancel { background: #E5E7EB; color: #4B5563; } /* Tailwind gray-200 */
        .btn-cancel:hover { background: #D1D5DB; }
        .btn-sm { padding: 6px 10px; font-size: 12px; }

        /* --- Form Styles --- */
        .product-form { max-width: 900px; margin-left: auto; margin-right: auto; }
        .form-section { margin-bottom: 25px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa; }
        .form-section h4 { margin: 0 0 15px 0; color: #1F2937; font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: 500; color: #4B5563; font-size: 14px; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #10B981; box-shadow: 0 0 0 1px #10B981; }
        .form-actions { display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid #eee; }

        /* Form Grid - Responsive */
        .grid-responsive { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .grid-responsive-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) {
          .grid-responsive, .grid-responsive-3 { grid-template-columns: 1fr; }
            .form-actions button { margin-bottom: 10px; }
        }


        /* --- Image Preview --- */
        .image-preview-container { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .image-preview-item { position: relative; }
        .product-image-preview { width: 90px; height: 90px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; }
        .image-tag { position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.6); color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }

        /* --- Table Styles --- */
        .overflow-x-auto { overflow-x: auto; -webkit-overflow-scrolling: touch; } /* For smooth scrolling on mobile */
        .table { min-width: 800px; border-collapse: separate; border-spacing: 0; } /* Set min-width for table to prevent content squash on small screens */
        .table th { background: #F3F4F6; padding: 12px 15px; text-align: left; font-weight: 600; border-bottom: 2px solid #E5E7EB; color: #374151; font-size: 13px; }
        .table td { padding: 12px 15px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; font-size: 14px; }
        .table tr:hover { background: #F9FAFB; }

        /* Specific Table Columns */
        .product-table-image { 
            width: 40px; 
            height: 40px; 
            object-fit: cover; 
            border-radius: 4px; 
            border: 1px solid #eee;
            /* Images are now smaller as requested */
        }
        .image-col { width: 60px; } /* Fixed width for image column */
        .actions-col { width: 140px; text-align: center; } /* Fixed width for actions column */
        .actions-col button { margin: 0 2px; }

        /* Stock Badge */
        .stock-badge {
            padding: 4px 8px;
            border-radius: 9999px; /* Full rounded corners */
            font-weight: 600;
            font-size: 0.75rem;
            display: inline-block;
        }
        .bg-blue { background-color: #DBEAFE; color: #1D4ED8; } /* Tailwind blue-100/700 */
        .bg-red { background-color: #FEE2E2; color: #B91C1C; } /* Tailwind red-100/700 */
        
        /* Responsive Table Hide/Show */
        .show-on-mobile { display: none; }
        @media (max-width: 640px) {
            .hide-on-mobile { display: none; }
            .table { min-width: 500px; } /* Smaller min-width for mobile view */
            .show-on-mobile { display: block; } /* Show small info on mobile */
        }

      `}</style>
    </div>
  );
};

export default Products;