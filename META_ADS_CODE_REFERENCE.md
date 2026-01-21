# Meta Ads Integration - Code Reference

## 📋 Quick Code Review

All event tracking code has been added to track customer journey automatically. Here's what was implemented:

---

## 1️⃣ Meta Pixel Utility Module

**File**: `frontend/src/utils/metaPixel.js`

This utility provides all event tracking functions with proper formatting and validation.

### Available Functions

```javascript
// Initialize pixel
initMetaPixel()

// Track product view
trackViewContent(product)

// Track item added to cart
trackAddToCart(product, quantity)

// Track checkout initiated
trackInitiateCheckout(cartItems, totalAmount)

// Track purchase completed
trackPurchase(cartItems, totalAmount, orderId)

// Track any custom event
trackEvent(eventName, data)
```

### Example Usage

```javascript
import { trackViewContent, trackAddToCart } from '../utils/metaPixel';

// Track product view
trackViewContent({
  _id: '507f1f77bcf86cd799439011',
  pname: 'Wooden Sofa',
  price: 25000,
  offer: 10
});

// Track add to cart
trackAddToCart(productObject, 2);
```

---

## 2️⃣ Product Detail Page - ViewContent & AddToCart

**File**: `frontend/src/pages/DetaileProduct.jsx`

### Import Added
```javascript
import { trackViewContent, trackAddToCart } from '../utils/metaPixel';
```

### ViewContent Event - Auto-fires on product load

```javascript
// --- Track ViewContent Event (Meta Pixel) ---
useEffect(() => {
  if (product && !loading) {
    trackViewContent(product);
  }
}, [product, loading]);
```

**When it fires**: 
- User opens product detail page
- Product data loaded from API
- Meta Pixel automatically tracks the view

**What it sends**:
```javascript
fbq('track', 'ViewContent', {
  content_ids: ['PRODUCT_ID'],
  content_type: 'product',
  value: PRODUCT_PRICE,
  currency: 'INR'
});
```

### AddToCart Event - Fires on add to cart button

```javascript
const handleAddToCart = async () => {
  try {
    // ... existing code ...
    
    const response = await API.post('/api/cart', {
      product: product._id,
      product_name: product.pname,
      price: discountedPrice,
      qty: quantity
    });
    
    // Track AddToCart event (Meta Pixel)
    trackAddToCart(product, quantity);
    
    toast.success(response.data.message || 'Added to cart successfully!');
    setQuantity(1);
  } catch (error) {
    // ... error handling ...
  }
};
```

**When it fires**:
- User clicks "Add to Cart" button
- Item successfully added to backend
- Meta Pixel tracks the action

**What it sends**:
```javascript
fbq('track', 'AddToCart', {
  content_ids: ['PRODUCT_ID'],
  content_type: 'product',
  value: PRICE * QUANTITY,
  currency: 'INR'
});
```

---

## 3️⃣ Checkout Page - InitiateCheckout

**File**: `frontend/src/pages/Checkout.jsx`

### Import Added
```javascript
import { trackInitiateCheckout } from '../utils/metaPixel';
```

### InitiateCheckout Event - Auto-fires on checkout page load

```javascript
// Track InitiateCheckout event when cart items are loaded
useEffect(() => {
  if (cartItems.length > 0 && totalAmount > 0) {
    trackInitiateCheckout(cartItems, totalAmount);
  }
}, [cartItems, totalAmount]);
```

**When it fires**:
- User navigates to checkout page
- Cart items are loaded from API
- Total amount is calculated
- Meta Pixel tracks initiation of checkout

**What it sends**:
```javascript
fbq('track', 'InitiateCheckout', {
  content_ids: ['PRODUCT_ID_1', 'PRODUCT_ID_2', ...],
  content_type: 'product',
  value: TOTAL_CHECKOUT_AMOUNT,
  currency: 'INR',
  num_items: CART_ITEM_COUNT
});
```

**Exact code in Checkout.jsx**:
```jsx
const Checkout = () => {
  // ... existing state ...
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Auto-trigger payment after login
  useEffect(() => {
    // ... existing logic ...
  }, [cartItems.length, address, loading, addressLoading]);

  // ✨ NEW: Track InitiateCheckout event when cart items are loaded
  useEffect(() => {
    if (cartItems.length > 0 && totalAmount > 0) {
      trackInitiateCheckout(cartItems, totalAmount);
    }
  }, [cartItems, totalAmount]);

  // ... rest of component ...
};
```

---

## 4️⃣ Order Success Page - Purchase

**File**: `frontend/src/pages/CheckoutSuccess.jsx`

### Import Added
```javascript
import { trackPurchase } from '../utils/metaPixel';
```

### Purchase Event - Fires on successful order

Implemented in two places - for both COD and Online payments:

#### For COD (Cash on Delivery)
```javascript
if (mode === 'cod') {
  const summary = sessionStorage.getItem('paymentSuccessSummary');
  const messageFromStorage = sessionStorage.getItem('paymentSuccessMessage');
  const cartItems = summary ? JSON.parse(summary).items : [];
  const totalAmount = summary ? JSON.parse(summary).totalAmount : 0;
  const orderId = searchParams.get('order_id');
  
  // ... other logic ...
  
  // Track Purchase event (Meta Pixel) for COD
  if (cartItems.length > 0 && totalAmount > 0) {
    trackPurchase(cartItems, totalAmount, orderId);
  }
}
```

#### For Online Payment (Cashfree)
```javascript
if (res.status === 200 && res.data.message) {
  setSuccess(true);
  
  if (res.data.orderSummary) {
    setOrderSummary(res.data.orderSummary);
    
    // Track Purchase event (Meta Pixel) for online payment
    const cartItems = res.data.orderSummary.items || [];
    const totalAmount = res.data.orderSummary.totalAmount || Number(total) || 0;
    if (cartItems.length > 0 && totalAmount > 0) {
      trackPurchase(cartItems, totalAmount, finalOrderId);
    }
  }
}
```

**When it fires**:
- Order payment verified successfully
- Order summary available
- Purchase is confirmed on system
- Meta Pixel tracks the purchase

**What it sends**:
```javascript
fbq('track', 'Purchase', {
  content_ids: ['PRODUCT_ID_1', 'PRODUCT_ID_2', ...],
  content_type: 'product',
  value: TOTAL_PURCHASE_AMOUNT,
  currency: 'INR',
  num_items: TOTAL_ITEMS_PURCHASED
});
```

---

## 5️⃣ Backend - Meta Product Catalog Feed

**File**: `backend/routes/metafeed.js`

### Endpoint
```javascript
GET /meta-product-feed.xml
```

### Route Registration in server.js
```javascript
// Meta Pixel Product Catalog Feed (XML)
app.use('/', require('./routes/metafeed'));
```

### Feed Generation Logic

```javascript
router.get('/meta-product-feed.xml', async (req, res) => {
  try {
    // Fetch all products from database
    const products = await Product.find()
      .select('_id pname pdesc price offer stock_count img1 brand')
      .lean()
      .exec();

    // Build XML RSS feed
    let xmlFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/feeds/gs">
  <channel>
    <title>Sri Furniture Village - Product Catalog</title>
    <!-- items will be added here -->
  </channel>
</rss>`;

    // Add each product as an item
    products.forEach(product => {
      // Generate XML for each product
      // Include: id, title, description, link, image_link, price, availability, brand, condition
    });

    // Return XML response
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xmlFeed);
    
  } catch (error) {
    // Handle errors
  }
});
```

### XML Structure Generated

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/feeds/gs">
  <channel>
    <title>Sri Furniture Village - Product Catalog</title>
    <link>https://yourdomain.com</link>
    <description>Premium Wooden Furniture Products</description>
    <item>
      <g:id>507f1f77bcf86cd799439011</g:id>
      <title>Wooden Sofa</title>
      <description>Premium quality wooden sofa with comfort features</description>
      <link>https://yourdomain.com/product/507f1f77bcf86cd799439011</link>
      <g:image_link>https://cdn.example.com/sofa.jpg</g:image_link>
      <g:price>22500 INR</g:price>
      <g:availability>in stock</g:availability>
      <g:brand>Sri Furniture Village</g:brand>
      <g:condition>new</g:condition>
    </item>
    <!-- More items... -->
  </channel>
</rss>
```

---

## 6️⃣ HTML Head - Domain Verification

**File**: `frontend/index.html`

### Meta Tag Added
```html
<head>
  <!-- ... existing meta tags ... -->
  <meta name="facebook-domain-verification" content="14aslz5j1d7y9etfff4gcplr7di2w3" />
  <!-- ... rest of head ... -->
</head>
```

---

## 7️⃣ ID Matching Logic

### How IDs are Extracted and Sent

#### In metaPixel.js
```javascript
export const trackViewContent = (product) => {
  if (!window.fbq || !product) return;
  
  // Extract ID from product object
  const productId = String(product._id || product.id);
  const price = Number(product.price) || 0;
  
  // Send ID to Meta Pixel
  window.fbq('track', 'ViewContent', {
    content_ids: [productId],  // ID sent here
    content_type: 'product',
    value: price,
    currency: 'INR',
  });
};
```

#### In metafeed.js
```javascript
// Extract ID from database document
const itemXml = `    <item>
  <g:id>${String(product._id).replace(/[<>&"']/g, c => 
    ({'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'}[c]))}</g:id>
  <!-- Other fields... -->
</item>`;
```

### ID Sources
```
Product Database: _id = "507f1f77bcf86cd799439011"
                    ↓
Pixel Events:     content_ids: ["507f1f77bcf86cd799439011"]
                    ↓
XML Feed:         <g:id>507f1f77bcf86cd799439011</g:id>

✅ All three use EXACT same ID
✅ Dynamic ads will work correctly
```

---

## 🔍 Data Flow Diagram

```
Product Added to DB
        ↓
    _id = "ABC123"
        ↓
    ┌───────────────┬─────────────────┬──────────────┐
    ↓               ↓                 ↓              ↓
ViewContent     AddToCart      InitiateCheckout   Purchase
    ↓               ↓                 ↓              ↓
content_ids     content_ids      content_ids    content_ids
['ABC123']      ['ABC123']       ['ABC123']     ['ABC123']
    ↓               ↓                 ↓              ↓
  Event           Event             Event        Event
 Fired to        Fired to           Fired to    Fired to
Meta Pixel      Meta Pixel        Meta Pixel   Meta Pixel
    ↓               ↓                 ↓              ↓
    └───────────────┴─────────────────┴──────────────┘
                    ↓
            XML Feed
            <g:id>ABC123</g:id>
                    ↓
            Meta Ads System
            Uses ID: ABC123
                    ↓
            ✅ Match Found
            ✅ Dynamic Ads Work
```

---

## 📊 Event Data Examples

### ViewContent Event Payload
```json
{
  "event": "ViewContent",
  "data": {
    "content_ids": ["507f1f77bcf86cd799439011"],
    "content_type": "product",
    "value": 25000,
    "currency": "INR"
  }
}
```

### AddToCart Event Payload
```json
{
  "event": "AddToCart",
  "data": {
    "content_ids": ["507f1f77bcf86cd799439011"],
    "content_type": "product",
    "value": 50000,
    "currency": "INR"
  }
}
```

### InitiateCheckout Event Payload
```json
{
  "event": "InitiateCheckout",
  "data": {
    "content_ids": ["507f1f77bcf86cd799439011", "6070d1f77bcf86cd799439022"],
    "content_type": "product",
    "value": 75000,
    "currency": "INR",
    "num_items": 2
  }
}
```

### Purchase Event Payload
```json
{
  "event": "Purchase",
  "data": {
    "content_ids": ["507f1f77bcf86cd799439011", "6070d1f77bcf86cd799439022"],
    "content_type": "product",
    "value": 75000,
    "currency": "INR",
    "num_items": 2
  }
}
```

---

## 🐛 Console Debug Output

When testing locally, you should see:

```javascript
// Pixel initialization
✅ Meta Pixel initialized with ID: 4359575050945086

// Product page view
📌 ViewContent Event: {
  content_ids: ['507f1f77bcf86cd799439011'],
  value: 25000,
  currency: 'INR'
}

// Add to cart
📌 AddToCart Event: {
  content_ids: ['507f1f77bcf86cd799439011'],
  value: 25000,
  currency: 'INR',
  quantity: 1
}

// Checkout page
📌 InitiateCheckout Event: {
  content_ids: ['507f1f77bcf86cd799439011'],
  value: 25000,
  currency: 'INR',
  num_items: 1
}

// Order complete
📌 Purchase Event: {
  content_ids: ['507f1f77bcf86cd799439011'],
  value: 25000,
  currency: 'INR',
  num_items: 1
}
```

---

## 🔧 Common Edits Summary

| File | Change | Type | Lines |
|------|--------|------|-------|
| frontend/index.html | Add domain verification tag | New line | <head> |
| frontend/src/utils/metaPixel.js | Create pixel utility | New file | ~150 |
| frontend/src/pages/DetaileProduct.jsx | Import + ViewContent + AddToCart | Modifications | 3+10+8 |
| frontend/src/pages/Checkout.jsx | Import + InitiateCheckout | Modifications | 1+8 |
| frontend/src/pages/CheckoutSuccess.jsx | Import + Purchase | Modifications | 1+12+12 |
| backend/routes/metafeed.js | Create XML feed endpoint | New file | ~140 |
| backend/server.js | Register metafeed route | New line | routes section |

---

## ✅ Verification Checklist

- [ ] All 4 events implemented
- [ ] Pixel utility created
- [ ] HTML has domain verification tag
- [ ] Product page has ViewContent tracking
- [ ] Add to cart button has AddToCart tracking
- [ ] Checkout page has InitiateCheckout tracking
- [ ] Success page has Purchase tracking
- [ ] Backend feed endpoint created
- [ ] Feed route registered in server.js
- [ ] All IDs match between events and feed
- [ ] No syntax errors in code

---

*This code reference can be used for:*
- Code review
- Implementation verification
- Troubleshooting
- Future maintenance
- Training new developers

