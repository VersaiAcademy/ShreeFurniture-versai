# Custom Size URLs Implementation - Complete Guide

## What Changed

You can now set custom URLs for each size of a product (Beds, Sofas, Dining) in the admin panel.

## How to Use (Admin)

1. **Go to Admin Panel → Products**
2. **Create or Edit a Bed/Sofa/Dining Product**
3. **Scroll down to "Size-Specific URLs" section** (NEW)
4. **Add Size URLs:**
   - Click **"+ Add Size URL"** button
   - Enter Size Name: `King Size` (or `Queen Size`, `Single`, etc.)
   - Enter Custom URL: `/beds?bed_size=King Size` or any custom URL
   - Click ✕ to remove a size

## Example Setup for Beds

```
Size 1:
  Size Name: King Size
  URL: /beds?bed_size=King Size

Size 2:
  Size Name: Queen Size
  URL: /beds?bed_size=Queen Size

Size 3:
  Size Name: Single
  URL: /beds?bed_size=Single
```

## How It Works (Frontend)

1. User clicks on a **size button** (King Size, Queen Size, etc.) on the product detail page
2. Frontend checks if a **custom URL exists** for that size
3. If yes → Navigate to the **custom URL** you set
4. If no → Use **auto-generated URL** (fallback)

## Auto-Generated URLs (Fallback)

If you don't set custom URLs, the app automatically generates them:

- **Beds:** `/beds?bed_size=King Size`
- **Sofas:** `/sofas?sofa_size=3 Seater`
- **Dining:** `/dining?dining_size=4 Seater`
- **Other:** `/category?size=Value`

## Backend Changes

### 1. Product Schema (`backend/models/index.js`)
✅ **TODO: Add this field manually after line 188**

```javascript
// ✅ Size-specific URLs for custom product links
size_urls: {
  type: Map,
  of: String,
  default: new Map(),
  // Example: { "King Size": "/beds?bed_size=King Size" }
},
```

### 2. Admin Routes (`backend/routes/admin.js`)
✅ **DONE** - Backend now accepts and stores `size_urls`

### 3. Frontend Files
✅ **DONE** - Admin form and DetaileProduct page updated

## Step-by-Step Setup

### Step 1: Update Backend Model
Open `backend/models/index.js` and find the `caring` field (around line 183).

After this section:
```javascript
  caring: { // Added based on Admin update
    type: String,
    default: '',
    trim: true
  },
```

**Add this code immediately after the closing brace:**

```javascript
  // ✅ Size-specific URLs for custom product links
  size_urls: {
    type: Map,
    of: String,
    default: new Map(),
  },
```

The file should look like:
```javascript
  caring: { // Added based on Admin update
    type: String,
    default: '',
    trim: true
  },

  // ✅ Size-specific URLs for custom product links
  size_urls: {
    type: Map,
    of: String,
    default: new Map(),
  },

  features: { 
    type: String, 
```

**Save the file.**

### Step 2: Restart Your Servers

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Admin (in new terminal)
cd admin
npm run dev

# Terminal 3: Frontend (in new terminal)
cd frontend
npm run dev
```

### Step 3: Create/Edit a Product in Admin

1. Go to http://localhost:5173 (or your admin URL)
2. Click **Products** in sidebar
3. Click **+ Add Product** or edit an existing product
4. Fill in product details (Name, Price, etc.)
5. **Scroll down** to **"Size-Specific URLs"** section
6. Click **"+ Add Size URL"**
7. For a Bed, enter:
   - Size: `King Size`
   - URL: `/beds?bed_size=King Size`
8. Repeat for other sizes (Queen Size, Single, etc.)
9. Click **Submit** to save

### Step 4: Test on Frontend

1. Go to http://localhost:5173 (frontend)
2. Navigate to a product detail page
3. Click on a **Size button**
4. You should be redirected to your custom URL with filters applied

## Advanced: Custom URLs for Custom Pages

You can use ANY URL format:

```
Size: King Size
URL: /king-size-beds        # Custom route
URL: /products/beds/king    # Product category route
URL: https://external-page  # External link
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Size buttons don't work | Clear browser cache, restart frontend server |
| Custom URLs not saving | Check backend console for errors, restart backend |
| Admin form not showing size URLs section | Rebuild admin: `npm run dev` |
| URLs work but filtering doesn't work | Check `/products` page handles query params correctly |

## Files Modified

- ✅ `backend/models/index.js` - Add schema field (TODO: manually)
- ✅ `backend/routes/admin.js` - Handle size_urls in create/update
- ✅ `admin/src/components/Products.jsx` - Admin UI for size URLs
- ✅ `frontend/src/pages/DetaileProduct.jsx` - Use custom URLs when clicking size
- ✅ `frontend/src/pages/Productpage.jsx` - Already handles query filtering

---

**Need help?** Check browser console (F12) for error messages when testing.
