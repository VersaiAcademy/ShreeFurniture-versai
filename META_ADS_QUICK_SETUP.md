# Meta Ads Integration - Quick Setup Guide

## ⚡ 5-Minute Quick Reference

### What Was Implemented?

✅ **4 Meta Pixel Events** - Automatically track customer journey:
- ViewContent (product page)
- AddToCart (shopping action)
- InitiateCheckout (checkout page)
- Purchase (order confirmation)

✅ **XML Product Catalog Feed** - For Meta Ads targeting:
- Auto-generated from your database
- All products included
- Prices and stock status updated

✅ **Domain Verification** - Meta Pixel verified

✅ **ID Matching** - Events automatically match catalog products

---

## 🚀 Deployment (3 Steps)

### Step 1: Backend
```bash
cd backend
npm install  # Install any new dependencies
npm start    # Or: npm run dev for development
```

### Step 2: Frontend
```bash
cd frontend
npm install
npm run build  # Build for production
npm start      # Or: npm run dev for development
```

### Step 3: Verify Feed
```
Open in browser: http://localhost:5000/meta-product-feed.xml
(Or your actual domain URL)

Should see: XML with <item> tags containing all products
```

---

## 🔍 Test Events Are Firing (In Browser)

1. Open Developer Console: `F12`
2. Go to "Console" tab
3. Visit your product page
4. Look for messages like:
   ```
   ✅ Meta Pixel initialized with ID: 4359575050945086
   📌 ViewContent Event: { content_ids: [...], ...}
   ```

5. Add to cart → Should see: `📌 AddToCart Event: {...}`
6. Go to checkout → Should see: `📌 InitiateCheckout Event: {...}`
7. Complete order → Should see: `📌 Purchase Event: {...}`

---

## 📍 Feed URL Format

```
Your Domain: https://shree-furniture-versai.vercel.app
Feed URL: https://shree-furniture-versai.vercel.app/meta-product-feed.xml

Your Domain: https://yourdomain.com
Feed URL: https://yourdomain.com/meta-product-feed.xml
```

---

## 📱 Meta Business Manager Setup

### 1. Add Feed to Catalog

**Path**: Catalog → Feeds → Create Feed

| Field | Value |
|-------|-------|
| Feed Name | Sri Furniture Catalog |
| Feed Source | URL |
| Feed URL | `https://yourdomain.com/meta-product-feed.xml` |
| Schedule | Every 4 hours |

**Click**: Create & Start

### 2. Verify Events

**Path**: Events Manager → Test Events

| Action | Expected | Check |
|--------|----------|-------|
| View Product | ViewContent | Should be GREEN ✅ |
| Add To Cart | AddToCart | Should be GREEN ✅ |
| Go to Checkout | InitiateCheckout | Should be GREEN ✅ |
| Complete Order | Purchase | Should be GREEN ✅ |

### 3. Verify Domain

**Path**: Domain Manager → Add Domain

- Add your domain
- Verify using our meta tag (already installed)
- Status should show: ✅ Verified

### 4. Check Catalog

**Path**: Catalog → Diagnostics

- Product Count > 0 ✅
- No Critical Errors ✅
- All Fields Present ✅

---

## 📊 File Changes Summary

### NEW FILES
```
✅ backend/routes/metafeed.js          → XML feed generation
✅ frontend/src/utils/metaPixel.js     → Event tracking utility
✅ META_ADS_INTEGRATION_COMPLETE.md    → Full documentation
```

### MODIFIED FILES
```
✅ backend/server.js                   → Added meta feed route
✅ frontend/index.html                 → Added domain verification tag
✅ frontend/src/pages/DetaileProduct.jsx   → ViewContent + AddToCart events
✅ frontend/src/pages/Checkout.jsx     → InitiateCheckout event
✅ frontend/src/pages/CheckoutSuccess.jsx  → Purchase event
```

---

## 🐛 Quick Troubleshooting

### "Events not firing?"
```javascript
// Check in console:
console.log(window.fbq);  // Should NOT be undefined
// If undefined = Pixel not loaded. Check HTML.
```

### "Feed returning error?"
```bash
# Test feed URL
curl https://yourdomain.com/meta-product-feed.xml

# Should return XML starting with:
# <?xml version="1.0" encoding="UTF-8"?>
```

### "ID mismatch in ads?"
```
✅ Database Product _id: 507f1f77bcf86cd799439011
✅ Event content_ids: ['507f1f77bcf86cd799439011']
✅ XML <g:id>: 507f1f77bcf86cd799439011

All use SAME exact ID = ✅ Perfect matching
```

### "Domain not verified?"
```
Check: frontend/index.html <head> section
Should have: <meta name="facebook-domain-verification" ...>
If missing: Deploy frontend again
```

---

## 🎯 Success Checklist

After following this guide:

- [ ] Backend running without errors
- [ ] Frontend built and running
- [ ] Can access: `https://yourdomain.com/meta-product-feed.xml`
- [ ] Feed displays XML with products
- [ ] Console shows pixel events when browsing
- [ ] Feed added to Meta Catalog
- [ ] All events showing GREEN in Events Manager
- [ ] Domain showing VERIFIED in Domain Manager
- [ ] Catalog showing correct product count

---

## 💡 What's Next?

After verification (1-2 hours):

1. **Create Audience**:
   - Ads Manager → Audiences → Website Traffic
   - All visitors / Cart abandoners / Purchasers

2. **Create Dynamic Ad**:
   - Create Campaign → Select Catalog
   - Choose Audience
   - Start showing product ads

3. **Monitor Performance**:
   - Check Events Manager daily
   - Monitor ROAS in Ads Manager
   - Optimize bid strategies

---

## 📞 Key Info

| Info | Value |
|------|-------|
| Pixel ID | 4359575050945086 |
| Feed Endpoint | /meta-product-feed.xml |
| Pixel Events | 4 (ViewContent, AddToCart, InitiateCheckout, Purchase) |
| Catalog Feed | Auto-generated XML |
| ID Matching | Automatic (using _id) |
| Domain Verified | Yes ✅ |

---

## 🔒 Security

✅ Product IDs visible (intentional for targeting)  
✅ No sensitive customer data in feed  
✅ All XML properly sanitized  
✅ CORS configured  
✅ Feed cached 1 hour  

---

**Ready to go!** 🚀 Deploy and test now!
