/**
 * Meta Pixel Event Tracking Utility
 * Handles all Facebook Pixel events for Shree Furniture
 */

const PIXEL_ID = '4359575050945086';

/**
 * Initialize Meta Pixel (called from index.html)
 */
export const initMetaPixel = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('✅ Meta Pixel initialized with ID:', PIXEL_ID);
  }
};

/**
 * Track ViewContent event - Product detail page view
 * @param {Object} product - Product object with id, name, price
 */
export const trackViewContent = (product) => {
  if (!window.fbq || !product) return;
  
  const productId = String(product._id || product.id);
  const price = Number(product.price) || 0;
  
  console.log('📌 ViewContent Event:', {
    content_ids: [productId],
    value: price,
    currency: 'INR',
  });

  window.fbq('track', 'ViewContent', {
    content_ids: [productId],
    content_type: 'product',
    value: price,
    currency: 'INR',
  });
};

/**
 * Track AddToCart event - When user adds product to cart
 * @param {Object} product - Product object with id, name, price
 * @param {Number} quantity - Quantity added
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!window.fbq || !product) return;

  const productId = String(product._id || product.id);
  const price = Number(product.price) || 0;
  const totalValue = price * quantity;

  console.log('📌 AddToCart Event:', {
    content_ids: [productId],
    value: totalValue,
    currency: 'INR',
    quantity: quantity,
  });

  window.fbq('track', 'AddToCart', {
    content_ids: [productId],
    content_type: 'product',
    value: totalValue,
    currency: 'INR',
  });
};

/**
 * Track InitiateCheckout event - When user goes to checkout
 * @param {Array} cartItems - Array of cart items
 * @param {Number} totalAmount - Total checkout amount
 */
export const trackInitiateCheckout = (cartItems, totalAmount) => {
  if (!window.fbq || !Array.isArray(cartItems) || cartItems.length === 0) return;

  const contentIds = cartItems.map(item => 
    String(item.product?._id || item.productId || item._id || '')
  ).filter(Boolean);

  const amount = Number(totalAmount) || 0;

  console.log('📌 InitiateCheckout Event:', {
    content_ids: contentIds,
    value: amount,
    currency: 'INR',
    num_items: cartItems.length,
  });

  window.fbq('track', 'InitiateCheckout', {
    content_ids: contentIds,
    content_type: 'product',
    value: amount,
    currency: 'INR',
    num_items: cartItems.length,
  });
};

/**
 * Track Purchase event - Order successful
 * @param {Array} cartItems - Array of ordered items
 * @param {Number} totalAmount - Total purchased amount
 * @param {String} orderId - Order ID
 */
export const trackPurchase = (cartItems, totalAmount, orderId = '') => {
  if (!window.fbq || !Array.isArray(cartItems) || cartItems.length === 0) return;

  const contentIds = cartItems.map(item => 
    String(item.product?._id || item.productId || item._id || '')
  ).filter(Boolean);

  const amount = Number(totalAmount) || 0;

  console.log('📌 Purchase Event:', {
    content_ids: contentIds,
    value: amount,
    currency: 'INR',
    num_items: cartItems.length,
    order_id: orderId,
  });

  window.fbq('track', 'Purchase', {
    content_ids: contentIds,
    content_type: 'product',
    value: amount,
    currency: 'INR',
    num_items: cartItems.length,
  });
};

/**
 * Track generic event
 * @param {String} eventName - Event name
 * @param {Object} data - Event data
 */
export const trackEvent = (eventName, data = {}) => {
  if (!window.fbq || !eventName) return;
  
  console.log(`📌 ${eventName} Event:`, data);
  window.fbq('track', eventName, data);
};

export default {
  initMetaPixel,
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
  trackEvent,
};
