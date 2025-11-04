//Wooden-Street-Main-Project-\admin\src\components\Banners.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [position, setPosition] = useState('main');
  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const res = await axios.get(`/api/banners`);
      setBanners(res.data?.banners || res.data || []);
    } catch (e) {
      console.error('Error loading banners:', e);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  const onSelectFile = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      alert('You can upload maximum 4 banners at once');
      return;
    }
    setImageFiles(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleUpload = async () => {
    if (!imageFiles.length) return;
    try {
      const token = localStorage.getItem('adminToken');
      const fd = new FormData();
      imageFiles.forEach(f => fd.append('images', f));
      const up = await axios.post(`/api/upload/multiple`, fd, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}`
        }
      });
      const urls = up.data?.imageUrls || [];
      if (!urls.length) {
        alert('Failed to get image URLs from server');
        return;
      }

      // Enforce UI limits using backend 'type' field
      const mainCount = banners.filter(b => b.type === 'main').length;
      const saleCount = banners.filter(b => b.type === 'sale').length;

      const type = position === 'right' ? 'sale' : 'main';

      if (type === 'main' && mainCount + urls.length > 4) {
        alert('You can upload maximum 4 main banners for the carousel');
        return;
      }
      if (type === 'sale' && saleCount + urls.length > 2) {
        alert('You can upload maximum 2 sale/right side banners');
        return;
      }

      await Promise.all(urls.map((imageUrl) => axios.post(`/api/banners`, { imageUrl, type }, { headers: { Authorization: `Bearer ${token}` } })));

      setImageFiles([]);
      setPreviews([]);
      setPosition('main');
      await loadBanners();
    } catch (e) {
      alert('Failed to upload banner');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm('Delete this banner?')) return;
    try {
      const token = localStorage.getItem('adminToken');
  await axios.delete(`/api/banners/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      await loadBanners();
    } catch (e) {
      alert('Failed to delete banner');
    }
  };

  if (loading) return <div className="loading">Loading banners...</div>;

  return (
    <div>
      <div className="card">
        <h2>Hero Banners</h2>
        <p>Manage homepage slider images</p>
      </div>

      <div className="card">
        <h3>Add New Banner</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <input type="file" accept="image/*" multiple onChange={onSelectFile} />
          <select value={position} onChange={e => setPosition(e.target.value)}>
            <option value="main">Main Banner (Carousel)</option>
            <option value="right">Right Side Banner</option>
          </select>
          <button className="btn btn-success" onClick={handleUpload} disabled={!imageFiles.length}>Upload</button>
        </div>
        {previews.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.map((p, idx) => (
              <img key={idx} src={p} alt={`preview-${idx}`} style={{ width: 180, height: 100, objectFit: 'cover', borderRadius: 6 }} />
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Existing Banners</h3>
        {banners.length === 0 ? (
          <p>No banners yet</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {banners.map((b) => (
              <div key={b._id || b.imageUrl} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
                <img src={b.imageUrl} alt="banner" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <button className="btn btn-danger" onClick={() => handleDelete(b._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;


