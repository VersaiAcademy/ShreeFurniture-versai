import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Whislist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await API.get('/api/wishlist');
        const data = Array.isArray(res.data) ? res.data : (res.data.wishlist || res.data.items || []);

        // Normalize: each entry may have a populated `product` object or just an id
        const products = [];
        const missingIds = [];
        data.forEach((w) => {
          const prod = w.product;
          if (prod && typeof prod === 'object') {
            products.push({ wishlistId: w._id, product: prod });
          } else if (prod) {
            missingIds.push({ wishlistId: w._id, productId: prod });
          }
        });

        if (missingIds.length > 0) {
          // Fetch missing product details
          const promises = missingIds.map(m => API.get(`/api/products/${m.productId}`).then(r => ({ wishlistId: m.wishlistId, product: r.data })).catch(() => null));
          const results = await Promise.all(promises);
          results.forEach(r => { if (r && r.product) products.push({ wishlistId: r.wishlistId, product: r.product }); });
        }

        setItems(products);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
        toast.error('Could not load wishlist.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();

    // Refresh when wishlistUpdated event occurs
    const onUpdate = () => fetchWishlist();
    window.addEventListener('wishlistUpdated', onUpdate);
    return () => window.removeEventListener('wishlistUpdated', onUpdate);
  }, [navigate]);

  const handleRemove = async (wishlistId, productId) => {
    try {
      await API.delete(`/api/wishlist/${productId}`);
      setItems(prev => prev.filter(i => i.product._id !== productId));
      toast.success('Removed from wishlist');
      try { window.dispatchEvent(new Event('wishlistUpdated')); } catch (e) {}
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      toast.error('Could not remove item');
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      const discounted = Math.floor((product.price||0) - ((product.price||0) * (product.offer||0)) / 100);
      await API.post('/api/cart', {
        product: product._id,
        product_name: product.pname,
        price: discounted,
        qty: 1
      });
      toast.success('Added to cart');
    } catch (err) {
      console.error('Add to cart failed', err);
      toast.error('Could not add to cart');
    }
  };

  const handleBuyNow = async (product) => {
    await handleAddToCart(product);
    navigate('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading wishlist...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <img src="/empty-wishlist.png" alt="No items" className="mx-auto mb-4 w-48 h-48 object-contain" onError={(e)=>{e.target.src='https://via.placeholder.com/192?text=No+Items'}} />
            <p className="text-gray-600 text-lg font-medium">No items found in your wishlist.</p>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className="px-4 py-2 bg-orange-500 text-white rounded">Continue Shopping</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(({ wishlistId, product }) => (
              <div key={product._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <button onClick={() => navigate(`/dtproduct/${product._id}`)} className="w-full mb-4">
                  <img src={product.natural_finish_image || product.img1 || product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/300x240?text=No+Image'} alt={product.pname}
                    className="w-full h-44 object-cover rounded" onError={(e)=>e.target.src='https://via.placeholder.com/300x240?text=No+Image'} />
                </button>
                <h3 className="font-semibold text-lg mb-1 line-clamp-2"><button onClick={() => navigate(`/dtproduct/${product._id}`)} className="text-left w-full">{product.pname}</button></h3>
                <p className="text-sm text-gray-500 mb-3">By {product.brand}</p>
                <div className="mt-auto">
                  <div className="mb-3">
                    <div className="text-green-600 font-bold">₹ {Math.floor((product.price||0) - ((product.price||0) * (product.offer||0)) / 100).toLocaleString()}</div>
                    {product.offer > 0 && <div className="text-xs text-gray-400 line-through">₹ {Number(product.price).toLocaleString()}</div>}
                  </div>

                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2">
                      <button onClick={() => handleAddToCart(product)} className="px-3 py-2 bg-orange-500 text-white rounded text-sm">Add to Cart</button>
                      <button onClick={() => handleBuyNow(product)} className="px-3 py-2 border border-orange-500 text-orange-500 rounded text-sm">Buy Now</button>
                    </div>
                    <button onClick={() => handleRemove(wishlistId, product._id)} className="px-3 py-2 bg-red-500 text-white rounded text-sm">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Whislist;
