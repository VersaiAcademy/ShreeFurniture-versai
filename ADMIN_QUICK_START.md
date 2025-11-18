# Quick Admin Guide - New Features

## 🔍 Search Products
**Where**: Admin Panel → Products → Search Bar (top right)
**What**: Find products by name, brand, category, or SKU
**Example**: Type "King" to find all King size beds

---

## 📝 Edit Any Product
**Where**: Admin Panel → Products → [Search if needed] → Click ✏️
**What**: Now loads ALL products (not just first 50)
**Benefit**: No more pagination - search & find instantly

---

## 🔗 Set Custom Size URLs (for Beds/Sofas/Dining)
**Where**: Admin Panel → Products → Edit Product → Scroll to "Size-Specific Custom URLs"

### Steps:
1. Click "Add Size URL" button
2. Enter Size: `King Size`
3. Enter URL: `/beds?bed_size=King Size`
4. Click Add
5. Repeat for other sizes (Queen, Single, etc.)
6. Click "✅ Update Product"

### Result:
When customer clicks "King Size" button on product detail → redirects to filtered bed list showing King size products

---

## 📸 Natural Finish Images
**Where**: Product listing cards, cart, orders
**What**: Now shows natural_finish_image first (if available)
**Benefit**: Customers see the variant image they want instead of generic main image

---

## ✅ Checklist: Ready to Deploy

- [x] Admin search working
- [x] All products load in admin
- [x] Size URL feature ready
- [x] Natural image variant showing everywhere
- [x] Wishlist button visible (feature coming soon message is OK)
- [x] No errors in code

---

## 🚀 Quick Test

1. **Test Search**: 
   - Admin → Products → Type "sofa" → See only sofas

2. **Test Size URLs**:
   - Create test bed product
   - Add size URLs (King, Queen, Single)
   - Save
   - Go to product detail
   - Click a size button
   - Should redirect to /beds?bed_size=King (etc.)

3. **Test Natural Images**:
   - Upload natural_finish_image for a product
   - Go to product listing
   - Confirm it shows natural image (not main image)

---

## 💡 Tips

- Natural variant images are preferred in order: natural → stone → img1 → image → images[0]
- Size URLs must start with `/` and include query parameters
- Search is case-insensitive and real-time
- Wishlist button doesn't work yet (feature coming soon) - this is expected

