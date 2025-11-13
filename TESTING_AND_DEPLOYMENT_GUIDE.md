# Quick Testing & Deployment Guide

## 🚀 Quick Start - 5 Minute Setup

### Step 1: Local Testing (Backend)

```bash
# 1. Navigate to backend
cd backend

# 2. Start backend server
npm start
# or: npm run dev (if available)

# Expected output:
# ✅ Server running on port 5000
# ✅ MongoDB connected
```

### Step 2: Test Related Products API

```bash
# Open terminal or Postman and test:

# Get related products for 'sofas' category
GET http://localhost:5000/api/products/related/sofas?limit=6

# Get related products excluding specific product
GET http://localhost:5000/api/products/related/sofas?excludeId=507f1f77bcf86cd799439011&limit=6

# Expected Response (200 OK):
{
  "relatedProducts": [
    {
      "_id": "...",
      "pname": "Product Name",
      "category": "sofas",
      "price": 25000,
      "offer": 15,
      "img1": "https://...",
      "rating": 4.5,
      "rating_count": 28,
      "brand": "SRI Furniture Village"
    }
  ],
  "category": "sofas",
  "count": 6
}
```

### Step 3: Local Frontend Testing

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Expected output:
# ✅ Local: http://localhost:5173
# ✅ Vite dev server running
```

### Step 4: Manual Testing in Browser

1. **Open browser:** `http://localhost:5173`
2. **Navigate to product details:** Click on any product or go to URL pattern `/dtproduct/{productId}`
3. **Verify:**
   - ✅ Product details load correctly
   - ✅ "Visually Similar {category}" section appears
   - ✅ Related products load in responsive grid
   - ✅ Grid shows: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop)
   - ✅ Clicking related product navigates correctly
   - ✅ Favicon shows in browser tab
   - ✅ Page title is "SRI Furniture Village – Premium Wooden Furniture"

---

## 🧪 Detailed Test Cases

### Test Case 1: Related Products Display

**Scenario:** User opens product detail page with category "sofas"

**Steps:**
1. Navigate to `/dtproduct/507f1f77bcf86cd799439011` (adjust ID as needed)
2. Wait for page to fully load
3. Scroll down to bottom

**Expected Results:**
- ✅ Section title shows "Visually Similar sofas" (dynamic category)
- ✅ 1-6 product cards displayed
- ✅ Each card shows: image, product name, brand, rating, price, discount
- ✅ Loading spinner showed during fetch
- ✅ No console errors

**Actual Result:** _______________

---

### Test Case 2: Related Products Grid Responsiveness

**Scenario:** Related products grid adapts to different screen sizes

**Desktop (1280px+):**
1. Open DevTools, set viewport to 1280px width
2. Observe related products grid

**Expected:** 4 columns visible

**Mobile (375px):**
1. Set viewport to 375px width
2. Observe related products grid

**Expected:** 1 column visible (responsive, no overflow)

**Tablet (768px):**
1. Set viewport to 768px width

**Expected:** 2 columns visible

---

### Test Case 3: Favicon Display

**Scenario:** Verify SRI Furniture Village logo appears in browser

**Steps:**
1. Open any page on local site
2. Check browser tab
3. Add page to bookmarks
4. Check browser history

**Expected Results:**
- ✅ Favicon visible in browser tab
- ✅ Favicon shows in bookmarks
- ✅ Favicon shows in history
- ✅ Logo is clear and recognizable

---

### Test Case 4: Page Title and Meta Tags

**Scenario:** Verify SEO tags are correct

**Steps:**
1. Right-click on page → "View Page Source"
2. Verify HTML head section

**Expected:**
```html
<title>SRI Furniture Village – Premium Wooden Furniture</title>
<link rel="icon" type="image/png" href="/SFV Log 637x154 Pxl.png" />
<meta name="description" content="SRI Furniture Village – Premium Wooden Furniture..." />
<meta name="keywords" content="wooden furniture, Indian furniture, ..." />
```

---

### Test Case 5: Branding in Payment Gateway

**Scenario:** Verify Razorpay checkout shows SRI Furniture Village branding

**Steps:**
1. Add product to cart
2. Proceed to checkout
3. Click "Pay Now" button
4. Observe Razorpay modal

**Expected:**
- ✅ Modal title shows "SRI Furniture Village"
- ✅ Description shows "Premium Wooden Furniture"
- ✅ Official logo displays in payment modal
- ✅ Professional appearance

---

### Test Case 6: Related Products Navigation

**Scenario:** User clicks on related product and navigates successfully

**Steps:**
1. On product detail page, locate related products section
2. Click on any related product card
3. Verify navigation

**Expected:**
- ✅ Page navigates to `/dtproduct/{newProductId}`
- ✅ New product details load correctly
- ✅ New related products load for new product's category
- ✅ No console errors

---

### Test Case 7: Empty Related Products State

**Scenario:** Product category has no other related products

**Steps:**
1. Find product with unique category (if available)
2. Or manually test with non-existent category
3. Observe empty state

**Expected:**
- ✅ Section shows "Expert Advice" banner
- ✅ Banner includes "Call Now" and "Visit Our Store" buttons
- ✅ "No similar products found" message displayed
- ✅ Layout doesn't break or shift

---

## 📱 Device Testing Checklist

### Desktop (1280px+)
- [ ] Related products show 4 columns
- [ ] All text readable
- [ ] Images load correctly
- [ ] Click events work
- [ ] Hover states visible

### Laptop (1024px)
- [ ] Related products show 3-4 columns
- [ ] Layout optimized
- [ ] No overflow issues

### Tablet (768px)
- [ ] Related products show 2 columns
- [ ] Touch events responsive
- [ ] Images scaled properly

### Mobile (375px)
- [ ] Related products show 1 column
- [ ] Scrollable without horizontal scroll
- [ ] Touch buttons are 44px+ for accessibility
- [ ] No layout shift

---

## 🔍 Browser Compatibility Testing

Test on these browsers:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

**Test Points:**
- [ ] Favicon displays
- [ ] Grid layout responsive
- [ ] Grid responsive on all browsers
- [ ] Navigation works
- [ ] No console errors

---

## 🚀 Production Deployment

### Pre-Deployment Checklist

**Backend:**
- [ ] All changes committed to git
- [ ] `backend/routes/products.js` updated with new endpoint
- [ ] No console errors or warnings
- [ ] Tested related products API locally
- [ ] Database indexes optimized

**Frontend:**
- [ ] `frontend/index.html` updated with favicon and meta tags
- [ ] `frontend/src/pages/DetaileProduct.jsx` updated
- [ ] `frontend/src/pages/Login.jsx` updated
- [ ] `frontend/src/pages/Address.jsx` updated
- [ ] `npm run build` executes without errors
- [ ] Build output is optimized

**Testing:**
- [ ] All test cases passed
- [ ] Responsive design verified on all devices
- [ ] No console errors in browser
- [ ] API endpoints tested and working
- [ ] Favicon displays correctly

### Deployment Steps

#### 1. Deploy Backend

```bash
# Assuming Railway deployment

# 1. Push changes to GitHub
git add backend/
git commit -m "feat: Add related products endpoint"
git push origin main

# 2. Railway auto-deploys on push
# 3. Verify deployment at:
# https://shreefurniture-backend-production.up.railway.app/api/products/related/sofas

# 4. Check backend logs:
# Railway Dashboard → Logs → Watch for deployment success
```

#### 2. Deploy Frontend

```bash
# Assuming Vercel deployment

# Option A: Auto-deploy (recommended)
# 1. Push to GitHub
git add frontend/
git commit -m "feat: Add related products UI, update branding"
git push origin main

# 2. Vercel auto-deploys on push
# 3. Verify: https://srifurniturevillage.vercel.app (or your domain)

# Option B: Manual deploy
vercel --prod
```

#### 3. Admin Panel Deployment

```bash
# If deploying admin separately

git add admin/
git push origin main

# Verify at admin domain
```

### Post-Deployment Verification

1. **Test Related Products:**
   ```
   Visit: https://srifurniturevillage.com/dtproduct/6912d5db25f9c565e9d19bc9
   Expected: Visually Similar products section visible
   ```

2. **Verify Branding:**
   - [ ] Browser tab shows "SRI Furniture Village" title
   - [ ] Favicon visible in tab
   - [ ] Page source shows meta tags

3. **Test Payment Gateway:**
   - [ ] Add item to cart
   - [ ] Proceed to checkout
   - [ ] Razorpay shows "SRI Furniture Village"

4. **Check Responsive Design:**
   - [ ] Mobile: Open DevTools, set mobile viewport
   - [ ] Tablet: Set tablet viewport
   - [ ] Desktop: Test at full width

5. **Monitor Error Logs:**
   - Railway Dashboard → Backend Logs
   - Vercel Dashboard → Function Logs
   - Browser Console (DevTools)

---

## 🔧 Troubleshooting

### Problem: Related Products Not Showing

**Check 1: Backend API**
```bash
curl "http://localhost:5000/api/products/related/sofas?limit=6"
# Should return 200 with products array
```

**Check 2: Frontend Console**
- Open DevTools → Console
- Look for network errors
- Check API URL in network tab

**Check 3: Product Category**
- Verify product has `category` field
- Verify category value is exact match (case-sensitive)

### Problem: Favicon Not Showing

**Check 1: File Exists**
```bash
# On production server
ls -la frontend/public/SFV\ Log\ 637x154\ Pxl.png
```

**Check 2: Browser Cache**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try incognito window

**Check 3: File Path**
- Verify `index.html` references: `/SFV Log 637x154 Pxl.png`
- File should be at: `frontend/public/SFV Log 637x154 Pxl.png`

### Problem: Razorpay Branding Wrong

**Check 1: Environment Variables**
```bash
# Verify in deployment platform:
VITE_RAZORPPAY_KEY_ID=<your-key>
```

**Check 2: Build Updated**
```bash
# Redeploy frontend
npm run build && vercel --prod
```

**Check 3: Browser Cache**
- Hard refresh browser
- Clear service workers
- Test in incognito

---

## 📊 Performance Monitoring

### Metrics to Monitor

**Backend:**
- API response time for `/related/:category` (target: <200ms)
- Database query time (target: <100ms)
- Server CPU usage
- Memory usage

**Frontend:**
- Page load time (target: <2s)
- Time to interactive (target: <3s)
- Related products section load time (target: <500ms)
- Bundle size (target: <100KB main bundle)

### Tools for Monitoring

1. **Backend:** Railway Logs/Console
2. **Frontend:** Vercel Analytics
3. **Real User Monitoring:** Google Analytics
4. **Error Tracking:** Sentry (if configured)

---

## ✅ Sign-Off Checklist

Before marking deployment as complete:

- [ ] Backend API working in production
- [ ] Frontend deployed successfully
- [ ] Related products showing on product pages
- [ ] Favicon visible in all browsers
- [ ] Page title shows "SRI Furniture Village..."
- [ ] Razorpay shows correct branding
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All test cases passed
- [ ] No console errors
- [ ] API response time acceptable
- [ ] Database indexes optimized
- [ ] Performance metrics acceptable

---

## 📞 Support

**Issue:** Describe the problem

**Environment:** 
- Browser: 
- Device: 
- OS: 

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Console Errors (if any):**

**Screenshots/Videos:**

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Status:** ☐ Pending ☐ In Progress ☐ Complete ☐ Rolled Back

---

*Last Updated: January 2025*
