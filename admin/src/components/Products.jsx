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
    pname: '',
    pdesc: '',
    price: '',
    offer: '0',
    stock_count: '0',
    material: '',
    warranty: '36 Month Warranty',
    brand: 'SRI FURNITURE VILLAGE',
    rating: '5',
    category: '',
    dimensions: '',
    dimensions_cm: '',
    sku: '',
    finish: '',
    storage: 'Without Storage',
    size: '',
    seater: '',
    mattress_size: '', // NEW FIELD: Mattress Size
    caring: '', // NEW FIELD: Caring Instructions
    features: '',
    pack_content: '',
    delivery_condition: 'Knocked Down',
    dispatch_in: '10-12 Days',
    customization: 'Customized can be as per requirement.',
    note: 'If a board is required, we use MDF instead of plywood',
    fabric_color: '',
    design: 'Modern',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    imageFiles: [],
    
    // NEW VARIANT IMAGE FIELDS (4 per finish)
    stoneFinishFiles: [],
    naturalFinishFiles: [],
    stone_finish_image: '',
    stone_finish_img2: '',
    stone_finish_img3: '',
    stone_finish_img4: '',
    natural_finish_image: '',
    natural_finish_img2: '',
    natural_finish_img3: '',
    natural_finish_img4: '',
    imagePreviews: [],
    stoneFinishPreviews: [],
    naturalFinishPreviews: [],
  });

  // Local preview states (used for image preview UI)
  const [imagePreviews, setImagePreviews] = useState([]);
  const [stoneFinishPreviews, setStoneFinishPreviews] = useState([]);
  const [naturalFinishPreviews, setNaturalFinishPreviews] = useState([]);

  // Generic input handler for text/select/textarea fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle main images change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      alert('Maximum 5 main images allowed');
      return;
    }
    setFormData({ ...formData, imageFiles: files });
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Helper function to handle MULTIPLE variant image selection
  const handleVariantImageChange = (e, finishType) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('Maximum 4 variant images allowed');
      return;
    }

    if (finishType === 'stoneFinish') {
      setFormData(prev => ({ ...prev, stoneFinishFiles: files }));
      setStoneFinishPreviews(files.map(file => URL.createObjectURL(file)));
    } else if (finishType === 'naturalFinish') {
      setFormData(prev => ({ ...prev, naturalFinishFiles: files }));
      setNaturalFinishPreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const uploadImagesToCloudinary = async (files) => {
    if (!files || files.length === 0) return [];
    const token = localStorage.getItem('adminToken');
    const fd = new FormData();
    files.forEach((file) => fd.append('images', file));
    
    try {
      const response = await axios.post(`/api/upload/multiple`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.imageUrls || [];
    } catch (error) {
      console.error('Image upload failed:', error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pname?.trim() || !formData.pdesc?.trim() || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please login as admin');
      return;
    }

    setUploading(true);

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
      category: formData.category,
      dimensions: formData.dimensions.trim(),
      dimensions_cm: formData.dimensions_cm.trim(),
      sku: formData.sku.trim(),
      finish: formData.finish.trim(),
      storage: formData.storage.trim(),
      size: formData.size.trim(),
      seater: formData.seater.trim(),
      mattress_size: formData.mattress_size.trim(),
      caring: formData.caring.trim() || 'Professional Cleaning Only',
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
      img5: formData.img5 || '',
      // Initialize variant image fields with existing data (for update scenario)
      stone_finish_image: editingProduct?.stone_finish_image || '',
      stone_finish_img2: editingProduct?.stone_finish_img2 || '',
      stone_finish_img3: editingProduct?.stone_finish_img3 || '',
      stone_finish_img4: editingProduct?.stone_finish_img4 || '',
      natural_finish_image: editingProduct?.natural_finish_image || '',
      natural_finish_img2: editingProduct?.natural_finish_img2 || '',
      natural_finish_img3: editingProduct?.natural_finish_img3 || '',
      natural_finish_img4: editingProduct?.natural_finish_img4 || '',
    };

    try {
      // --- 1. Upload main product images ---
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const urls = await uploadImagesToCloudinary(formData.imageFiles);
        // assign uploaded main image URLs (preserve existing values if upload returned fewer)
        submitData.img1 = urls[0] || submitData.img1;
        submitData.img2 = urls[1] || submitData.img2;
        submitData.img3 = urls[2] || submitData.img3;
        submitData.img4 = urls[3] || submitData.img4;
        submitData.img5 = urls[4] || submitData.img5;
      }
      
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      await loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pname: '', pdesc: '', price: '', offer: '0', stock_count: '0',
      material: '', warranty: '36 Month Warranty', brand: 'SRI FURNITURE VILLAGE',
      rating: '5', category: '',
      dimensions: '', dimensions_cm: '', sku: '', finish: '', storage: 'Without Storage',
      size: '', seater: '', features: '', pack_content: '',
      mattress_size: '', // NEW
      caring: '', // NEW
      delivery_condition: 'Knocked Down', dispatch_in: '10-12 Days',
      customization: 'Customized can be as per requirement.',
      note: 'If a board is required, we use MDF instead of plywood',
      fabric_color: '', design: 'Modern',
      img1: '', img2: '', img3: '', img4: '', img5: '', 
      imageFiles: [],
      stoneFinishFiles: [], // Reset file inputs
      naturalFinishFiles: [], // Reset file inputs
      stone_finish_image: '',
      stone_finish_img2: '',
      stone_finish_img3: '',
      stone_finish_img4: '',
      natural_finish_image: '',
      natural_finish_img2: '',
      natural_finish_img3: '',
      natural_finish_img4: '',
    });
    setImagePreviews([]);
    setStoneFinishPreviews([]);
    setNaturalFinishPreviews([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    const stoneImages = [
      product.stone_finish_image,
      product.stone_finish_img2,
      product.stone_finish_img3,
      product.stone_finish_img4,
    ].filter(Boolean);

    const naturalImages = [
      product.natural_finish_image,
      product.natural_finish_img2,
      product.natural_finish_img3,
      product.natural_finish_img4,
    ].filter(Boolean);

    setFormData({
      pname: product.pname || '',
      pdesc: product.pdesc || '',
      price: String(product.price || ''),
      offer: String(product.offer || '0'),
      stock_count: String(product.stock_count || '0'),
      material: product.material || '',
      warranty: product.warranty || '36 Month Warranty',
      brand: product.brand || 'SRI FURNITURE VILLAGE',
      rating: String(product.rating || '5'),
      category: product.category || '',
      dimensions: product.dimensions || '',
      dimensions_cm: product.dimensions_cm || '',
      sku: product.sku || '',
      finish: product.finish || '',
      storage: product.storage || 'Without Storage',
      size: product.size || '',
      seater: product.seater || '',
      mattress_size: product.mattress_size || '',
      caring: product.caring || '',
      features: product.features || '',
      pack_content: product.pack_content || '',
      delivery_condition: product.delivery_condition || 'Knocked Down',
      dispatch_in: product.dispatch_in || '10-12 Days',
      customization: product.customization || 'Customized can be as per requirement.',
      note: product.note || 'If a board is required, we use MDF instead of plywood',
      fabric_color: product.fabric_color || '',
      design: product.design || 'Modern',
      // Main images
      img1: product.img1 || '',
      img2: product.img2 || '',
      img3: product.img3 || '',
      img4: product.img4 || '',
      img5: product.img5 || '',
      // Variant URLs (for existing images)
      stone_finish_image: product.stone_finish_image || '',
      stone_finish_img2: product.stone_finish_img2 || '',
      stone_finish_img3: product.stone_finish_img3 || '',
      stone_finish_img4: product.stone_finish_img4 || '',
      natural_finish_image: product.natural_finish_image || '',
      natural_finish_img2: product.natural_finish_img2 || '',
      natural_finish_img3: product.natural_finish_img3 || '',
      natural_finish_img4: product.natural_finish_img4 || '',
      // Reset file inputs on edit load
      imageFiles: [], 
      stoneFinishFiles: [],
      naturalFinishFiles: [],
    });
    
    setImagePreviews([product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean));
    setStoneFinishPreviews(stoneImages);
    setNaturalFinishPreviews(naturalImages);
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

  // Load products (used on mount and after create/update/delete)
  const loadProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    loadProducts();

    // load categories as well
    const loadCategories = async () => {
      try {
        const res = await axios.get(`/api/categories`);
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  if (loading) return <div className="p-10 text-center"><h3>Loading...</h3></div>;

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center">
          <h2>Products Management</h2>
          <button className="btn btn-success" onClick={() => { setShowForm(true); setEditingProduct(null); resetForm(); }}>
            ➕ Add Product
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card product-form">
          <h3>{editingProduct ? '✏️ Edit' : '➕ Add'} Product</h3>
          <form onSubmit={handleSubmit}>
            {/* Basic Info (JSX unchanged from previous version) */}
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

            {/* Product Overview (JSX unchanged from previous version) */}
            <div className="form-section">
              <h4>📋 Product Overview</h4>
              <div className="grid-responsive-3">
                <div className="form-group">
                  <label>SKU</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="SFV-3214-S" />
                </div>
                <div className="form-group">
                  <label>Material *</label>
                  <input type="text" name="material" value={formData.material} onChange={handleInputChange} required placeholder="Solid Sheesham Wood" />
                </div>
                <div className="form-group">
                  <label>Finish</label>
                  <input type="text" name="finish" value={formData.finish} onChange={handleInputChange} placeholder="Teak Finish" />
                </div>
                <div className="form-group">
                  <label>Size</label>
                  <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="King Size, Queen Size" />
                </div>
                <div className="form-group">
                  <label>Seater (Optional, e.g., for sofas)</label>
                  <input type="text" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="3 Seater" />
                </div>
                <div className="form-group">
                  <label>Storage</label>
                  <input type="text" name="storage" value={formData.storage} onChange={handleInputChange} placeholder="Without Storage, Box Storage" />
                </div>
              </div>
              
              {/* Dimensions */}
              <div className="grid-responsive">
                <div className="form-group">
                  <label>Dimensions (Inch)</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleInputChange} placeholder="L:84 x H:42 x W:74 (Inch)" />
                </div>
                <div className="form-group">
                  <label>Dimensions (cm)</label>
                  <input type="text" name="dimensions_cm" value={formData.dimensions_cm} onChange={handleInputChange} placeholder="L:213 x H:107 x W:188 (cm)" />
                </div>
              </div>
              
              <div className="grid-responsive">
                <div className="form-group">
                  <label>Mattress Size (Optional, for Beds only)</label>
                  <input type="text" name="mattress_size" value={formData.mattress_size} onChange={handleInputChange} placeholder="L:78 x W:72 (Inch)" />
                </div>
                <div className="form-group">
                  <label>Fabric Color (Optional, e.g., for sofas)</label>
                  <input type="text" name="fabric_color" value={formData.fabric_color} onChange={handleInputChange} placeholder="Ivory, Grey, Blue" />
                </div>
              </div>
            </div>

            {/* Logistics & Other Details (JSX unchanged from previous version) */}
            <div className="form-section">
              <h4>🚚 Logistics & Other Details</h4>
              <div className="grid-responsive-3">
                <div className="form-group">
                  <label>Warranty *</label>
                  <input type="text" name="warranty" value={formData.warranty} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Dispatch In</label>
                  <input type="text" name="dispatch_in" value={formData.dispatch_in} onChange={handleInputChange} placeholder="10-12 Days" />
                </div>
                <div className="form-group">
                  <label>Delivery Condition</label>
                  <input type="text" name="delivery_condition" value={formData.delivery_condition} onChange={handleInputChange} placeholder="Knocked Down, Pre-assembled" />
                </div>
              </div>
              <div className="form-group">
                <label>Caring/Maintenance Instructions</label>
                <input type="text" name="caring" value={formData.caring} onChange={handleInputChange} placeholder="Professional Cleaning Only, Wipe with Dry Cloth" />
              </div>
              <div className="form-group">
                <label>Customization Note</label>
                <textarea name="customization" value={formData.customization} onChange={handleInputChange} rows="2" placeholder="Customized can be as per requirement." />
              </div>
              <div className="form-group">
                <label>General Note (e.g., Materials used)</label>
                <textarea name="note" value={formData.note} onChange={handleInputChange} rows="2" placeholder="If a board is required, we use MDF instead of plywood" />
              </div>
            </div>

            {/* Images - ONLY COLOR VARIANTS */}
            <div className="form-section">
              <h4>🎨 Stone Finish Images (Max 4) *</h4>
              <div className="form-group">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={(e) => handleVariantImageChange(e, 'stoneFinish')} 
                  className="mb-2"
                  required={stoneFinishPreviews.length === 0}
                />
                {stoneFinishPreviews.length > 0 && (
                  <div className="image-preview-container mt-2">
                    {stoneFinishPreviews.map((preview, i) => (
                      <div key={`stone-${i}`} className="image-preview-item">
                        <img 
                          src={preview} 
                          alt={`Stone Finish ${i+1}`} 
                          className="product-image-preview" 
                        />
                        <div className="image-tag">Stone #{i+1}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <h4>🎨 Natural Finish Images (Max 4) *</h4>
              <div className="form-group">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={(e) => handleVariantImageChange(e, 'naturalFinish')} 
                  className="mb-2"
                  required={naturalFinishPreviews.length === 0}
                />
                {naturalFinishPreviews.length > 0 && (
                  <div className="image-preview-container mt-2">
                    {naturalFinishPreviews.map((preview, i) => (
                      <div key={`natural-${i}`} className="image-preview-item">
                        <img 
                          src={preview} 
                          alt={`Natural Finish ${i+1}`} 
                          className="product-image-preview" 
                        />
                        <div className="image-tag">Natural #{i+1}</div>
                    </div>
                    ))}
                  </div>
                )}
              </div>
            </div>            <div className="form-actions">
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

      {/* Product List */}
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
                  <th className="image-col">Image</th>
                  <th>Name</th>
                  <th className="hide-on-mobile">Brand</th>
                  <th>Price</th>
                  <th className="hide-on-mobile">Stock</th>
                  <th className="hide-on-mobile">Category</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>
                      {(() => {
                        // prefer stone variant first, then natural, then legacy img1
                        const firstImg = p.stone_finish_image || p.stone_finish_img2 || p.stone_finish_img3 || p.stone_finish_img4
                          || p.natural_finish_image || p.natural_finish_img2 || p.natural_finish_img3 || p.natural_finish_img4
                          || p.img1 || '';
                        const src = firstImg || 'https://via.placeholder.com/60?text=No+Image';
                        return (
                          <img src={src} alt={p.pname} className="product-table-image" />
                        );
                      })()}
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
                        <button className="btn btn-sm btn-edit" onClick={() => handleEdit(p)}>✏️</button>
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

      <style>{`
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
        .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 3px 6px rgba(0,0,0,0.15); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-success { background: #10B981; color: white; }
        .btn-success:hover { background: #059669; }
        .btn-edit { background: #3B82F6; color: white; }
        .btn-edit:hover { background: #2563EB; }
        .btn-danger { background: #EF4444; color: white; }
        .btn-danger:hover { background: #DC2626; }
        .btn-cancel { background: #E5E7EB; color: #4B5563; }
        .btn-cancel:hover { background: #D1D5DB; }
        .btn-sm { padding: 6px 10px; font-size: 12px; }
        .product-form { max-width: 900px; margin-left: auto; margin-right: auto; }
        .form-section { margin-bottom: 25px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa; }
        .form-section h4 { margin: 0 0 15px 0; color: #1F2937; font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: 500; color: #4B5563; font-size: 14px; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #10B981; box-shadow: 0 0 0 1px #10B981; }
        .form-actions { display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid #eee; }
        .grid-responsive { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .grid-responsive-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) {
          .grid-responsive, .grid-responsive-3 { grid-template-columns: 1fr; }
          .form-actions button { margin-bottom: 10px; }
        }
  .image-preview-container { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
  .image-preview-item { position: relative; width: 64px; height: 64px; }
  .product-image-preview { width: 64px; height: 64px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd; display: block; }
        .image-tag { position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.6); color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }
        .overflow-x-auto { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .table { min-width: 800px; border-collapse: separate; border-spacing: 0; }
        .table th { background: #F3F4F6; padding: 12px 15px; text-align: left; font-weight: 600; border-bottom: 2px solid #E5E7EB; color: #374151; font-size: 13px; }
        .table td { padding: 12px 15px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; font-size: 14px; }
        .table tr:hover { background: #F9FAFB; }
        
        /* --- Admin Image Table Fix --- */
        .product-table-thumbs { display: flex; align-items: center; gap: 8px; }
        .product-table-thumb { 
          width: 56px; 
          height: 56px; 
          object-fit: cover; 
          border-radius: 6px; 
          border: 1px solid #eee;
          display: inline-block;
        }
        /* main single thumbnail used in listing */
        .product-table-image { 
          width: 56px;
          height: 56px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #eee;
        }
        .image-col { 
          width: 120px; /* enough for a few thumbs */
        }
        /* ----------------------------- */

        .actions-col { width: 140px; text-align: center; }
        .actions-col button { margin: 0 2px; }
        .stock-badge { padding: 4px 8px; border-radius: 9999px; font-weight: 600; font-size: 0.75rem; display: inline-block; }
        .bg-blue { background-color: #DBEAFE; color: #1D4ED8; }
        .bg-red { background-color: #FEE2E2; color: #B91C1C; }
        .show-on-mobile { display: none; }
        @media (max-width: 640px) {
          .hide-on-mobile { display: none; }
          .table { min-width: 500px; }
          .show-on-mobile { display: block; }
          .product-image-preview, .product-table-image, .product-table-thumb, .image-preview-item { width: 48px; height: 48px; }
        }
      `}</style>
    </div>
  );
};

export default Products;