# Size URLs Field Integration

## Backend Model Update Needed
Add this field to the Product schema in `backend/models/index.js` after the `caring` field (around line 188):

```javascript
  // ✅ Size-specific URLs for custom product links (e.g., King Size, Queen Size for beds)
  size_urls: {
    type: Map,
    of: String,
    default: new Map(),
    // Example: { "King Size": "/beds?bed_size=King+Size", "Queen Size": "/beds?bed_size=Queen+Size" }
  },
```

## Admin Route Update
The admin route needs to accept and store size_urls when creating/updating products.

## Frontend Admin Form Update
Add fields in admin Products.jsx to allow entering size-specific URLs.

## How It Works
1. Admin adds a bed product with 3 sizes: King Size, Queen Size, Single
2. Admin enters custom URLs for each size (or defaults to auto-generated ones)
3. Frontend DetaileProduct.jsx reads `product.size_urls` and uses those URLs when clicking size buttons
4. Fallback to query params if size_urls is empty

## Example Usage
```javascript
// In DetaileProduct.jsx handleSizeClick
const handleSizeClick = (size) => {
  // Check if custom URL exists for this size
  if (product.size_urls && product.size_urls[size]) {
    navigate(product.size_urls[size]);
    return;
  }
  
  // Fallback to auto-generated URL
  const slug = (product.category || 'products').toString().toLowerCase().replace(/\s+/g, '-');
  let paramName = 'size';
  if (category.includes('bed')) paramName = 'bed_size';
  else if (category.includes('sofa')) paramName = 'sofa_size';
  else if (category.includes('dining')) paramName = 'dining_size';
  
  navigate(`/${slug}?${paramName}=${encodeURIComponent(size)}`);
};
```
