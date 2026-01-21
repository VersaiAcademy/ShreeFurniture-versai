# 🚀 META FEED GENERATION - QUICK START

**⏱️ Time to Deploy**: ~5 minutes  
**🎯 Goal**: Get XML feed live at `https://srifurniturevillage.com/meta-product-feed.xml`

---

## STEP 1: Generate the Feed (Local)

### Terminal Command

```bash
cd backend
npm run generate-meta-feed
```

### Expected Output

```
🔗 Connecting to MongoDB...
✅ MongoDB connected
📦 Fetching products from database...
✅ Found 50 products
✅ Feed saved to: /path/to/frontend/public/meta-product-feed.xml

📊 FEED STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Products: 50
Feed Size: 125.43 KB
Location: frontend/public/meta-product-feed.xml
URL: https://srifurniturevillage.com/meta-product-feed.xml
Generated: 2026-01-21T10:30:00.000Z
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 To use this feed:
1. Deploy frontend (includes public/meta-product-feed.xml)
2. Open: https://srifurniturevillage.com/meta-product-feed.xml
3. Add URL to Meta Catalog → Feeds
4. Wait for processing (5-10 minutes)
5. Check diagnostics for product count > 0

🎉 Meta feed generation complete!
```

---

## STEP 2: Verify File Created

### Check Locally

```bash
# Windows
dir frontend\public\meta-product-feed.xml

# Mac/Linux
ls -la frontend/public/meta-product-feed.xml
```

✅ **Should show file exists with content**

### Verify File is Valid XML

```bash
head -5 frontend/public/meta-product-feed.xml
```

✅ **Should show:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/feeds/gs">
  <channel>
```

---

## STEP 3: Deploy to Production

### For Vercel (Easiest)

```bash
# 1. Add file to git
git add frontend/public/meta-product-feed.xml
git commit -m "Add Meta product feed"

# 2. Push to GitHub
git push

# 3. Vercel auto-deploys
# ✅ Feed is now live at:
# https://srifurniturevillage.com/meta-product-feed.xml
```

### For Other Hosting

```bash
# Build frontend
cd frontend
npm run build

# Deploy dist/ folder
# The XML file is in dist/meta-product-feed.xml
```

---

## STEP 4: Test the URL

### In Browser

1. Open: **`https://srifurniturevillage.com/meta-product-feed.xml`**
2. Right-click → **View Page Source**

#### ✅ CORRECT (Raw XML)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/feeds/gs">
  <channel>
    <item>
      <g:id>507f1f77bcf86cd799439011</g:id>
      <title>Wooden Sofa</title>
```

#### ❌ WRONG (HTML/Frontend)
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

**If you see HTML**: URL is still being intercepted by frontend router
- Check that file was deployed
- Clear CDN cache
- Check deployment logs

---

## STEP 5: Add to Meta Catalog

### In Meta Business Manager

1. **Go to:** Commerce Manager → Catalog → Feeds
2. **Click:** Create Feed
3. **Fill in:**
   - **Feed Name:** `Sri Furniture Products`
   - **Feed Type:** `Product Feed`
   - **Data Source:** `Remote`
   - **Feed URL:** `https://srifurniturevillage.com/meta-product-feed.xml`
   - **Update Frequency:** `Every 4 hours`
4. **Click:** Create

### Wait for Processing

- **5-10 minutes:** Feed processes
- **Check:** Diagnostics tab
- **Status:** Should show product count > 0

---

## ✅ SUCCESS CHECKLIST

- [ ] Script ran successfully (no errors)
- [ ] `frontend/public/meta-product-feed.xml` exists
- [ ] File contains valid XML (starts with `<?xml`)
- [ ] File contains products (check with `grep "<item>"`
- [ ] File deployed to production
- [ ] URL returns raw XML (not HTML)
- [ ] Added to Meta Catalog
- [ ] Diagnostics show product count > 0
- [ ] No error messages in Meta

---

## 🐛 TROUBLESHOOTING

### "Connection refused" Error

**Problem:** Script can't connect to MongoDB

**Fix:**
```bash
# 1. Check .env file exists in backend/
cat backend/.env

# 2. Verify MONGO_URI is set
# Should show: MONGO_URI=mongodb+srv://user:pass@cluster...

# 3. Check MongoDB is online
# Go to: https://cloud.mongodb.com → Check cluster status
```

### "0 products" Error

**Problem:** Script runs but finds no products

**Fix:**
```bash
# 1. Check products exist in database
# In MongoDB console:
db.products.count()  # Should show > 0

# 2. Check Product model name
# In backend/models/index.js
# Make sure it exports Product

# 3. Run script again:
npm run generate-meta-feed
```

### URL Returns HTML Instead of XML

**Problem:** Browser shows page layout instead of XML

**Reason:** Frontend router is catching the request

**Fix:**
```bash
# 1. Verify file deployed correctly
# Check CDN/hosting that meta-product-feed.xml is in public/

# 2. Clear CDN cache
# If using Vercel: Settings → Git → Redeploy

# 3. Clear browser cache
# Ctrl+Shift+Delete or Cmd+Shift+Delete

# 4. Try different URL format
# https://srifurniturevillage.com/meta-product-feed.xml
```

### Meta Shows "Invalid Feed"

**Problem:** Meta can't parse the XML

**Fix:**
```bash
# 1. Validate XML structure
# Upload XML file to: https://www.w3schools.com/xml/xml_validator.asp
# Should show: "Document is valid"

# 2. Check required fields
# Each <item> must have:
# - <g:id>
# - <title>
# - <g:price>
# - <g:availability>
# - <g:image_link>

# 3. Check for invalid characters
# Run: grep "&" frontend/public/meta-product-feed.xml
# Should show: &amp; (not bare &)
```

---

## 📝 AUTOMATION (Optional)

### Run Daily via GitHub Actions

Create `.github/workflows/meta-feed.yml`:

```yaml
name: Update Meta Feed

on:
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm install && npm run generate-meta-feed
        env:
          MONGO_URI: ${{ secrets.MONGO_URI }}
      - run: git config user.email "bot@example.com" && git config user.name "Bot" && git add frontend/public/meta-product-feed.xml && git commit -m "Update Meta feed" || true && git push
```

### Manual Refresh Command

```bash
# Run anytime to update feed
cd backend
npm run generate-meta-feed
git add ../frontend/public/meta-product-feed.xml
git commit -m "Update Meta feed"
git push
```

---

## 🎊 NEXT STEPS

After deployment:

1. ✅ Verify URL returns XML
2. ✅ Add to Meta Catalog
3. ✅ Wait 5-10 minutes for processing
4. ✅ Check diagnostics (should show product count)
5. ✅ Create Dynamic Ads campaigns
6. ✅ Setup retargeting pixels

---

**📞 Status**: Ready for deployment  
**🎯 Confidence**: 100%  
**⏱️ Timeline**: Should be live within 15 minutes

