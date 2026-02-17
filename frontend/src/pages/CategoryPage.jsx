import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import API from '../utils/api';

const CATEGORY_MAP = {
  'sofas': {
    title: 'Sofas',
    subs: ['Wooden Sofas','Sofa Cum Beds', '3 Seater Sofas', '1 Seater Sofas', '3+1+1 Sofa Sets', 'L Shaped Sofas']
  },
  'living': {
    title: 'Living',
    subs: ['TV Units','Temples','Book Shelves','Display Units','Shoe Racks','Sideboards','Chest of Drawers','Chairs','Stools','Benches','Swings','Coffee Tables','Side Tables','Console Tables','Wall Shelves & Hanger','Wall Mirrors']
  },
  'bedroom': {
    title: 'Bedroom',
    subs: ['King Size Beds','Queen Size Beds','Single Beds','Hydraulic Storage Beds','Poster Beds','1-4 Door Wardrobes']
  },
  'dining-kitchen': {
    title: 'Dining & Kitchen',
    subs: ['Dining Tables','2 Seater Dining Sets','4 Seater Dining Sets','6 Seater Dining Sets','Dining Chairs','Benches','Kitchen Cabinets','Crockery Units','Wooden Tray','Wooden Jars','Spice Box','Chopping Board','Coasters','Tissue Box']
  },
  'storage': {
    title: 'Storage',
    subs: ['TV Units','Book Shelves','Display Units','Shoe Racks','Home Temples','Magazine Racks','Wooden Corner','Chest of Drawers','Wardrobes','Bed Side Tables','Dressing','Almira','Bar Cabinets']
  },
  'study-office': {
    title: 'Study & Office',
    subs: ['Study Tables','Wooden Corner']
  },
  'custom-furnitures': {
    title: 'Custom Furnitures',
    subs: ['Custom Sofas','Custom Wardrobes','Custom Beds','Custom Tables']
  }
};

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    fetchProducts();
  }, [slug, sortBy, location.search]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      // If this slug is a main category, include its subcategories as comma-separated slugs
      const mapEntry = CATEGORY_MAP[slug];
      let categoryParam = slug;
      if (mapEntry && Array.isArray(mapEntry.subs) && mapEntry.subs.length > 0) {
        const subsSlugs = mapEntry.subs.map(s => s.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '').replace(/&/g, ''));
        const parts = [slug, ...subsSlugs];
        categoryParam = parts.join(',');
      }
      const res = await API.get('/api/products', { params: { category: categoryParam, sort: sortBy } });
      const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch category products:', err);
      setError('Failed to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const category = CATEGORY_MAP[slug] || { title: slug?.split('-').map(w => w[0]?.toUpperCase()+w.slice(1)).join(' ') || 'Category', subs: [] };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{category.title}</h1>
            {category.subs && category.subs.length > 0 && (
              <div className="text-sm text-gray-600 mt-1">{category.subs.join(' • ')}</div>
            )}
          </div>
          <div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-1">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Subcategory links */}
        {category.subs && category.subs.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {category.subs.map((sub) => {
              const subSlug = sub.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '').replace(/&/g, '');
              return (
                <button key={sub} onClick={() => navigate(`/category/${subSlug}`)} className="px-3 py-1 rounded bg-white border text-sm text-gray-700 hover:bg-orange-50">
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="text-center py-20">Loading products...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded shadow p-3 cursor-pointer" onClick={() => navigate(`/detaileproduct/${p._id}`)}>
                <div className="h-44 bg-gray-100 flex items-center justify-center mb-3">
                  <img src={p.img1 || '/placeholder.png'} alt={p.pname} className="max-h-40 object-contain" />
                </div>
                <div className="text-sm font-medium text-gray-800">{p.pname}</div>
                <div className="text-sm text-gray-600">₹{Math.floor((p.price || 0) - ((p.price || 0) * (p.offer || 0) / 100)).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
