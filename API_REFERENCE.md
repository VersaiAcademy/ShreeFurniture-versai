# 🔗 API ENDPOINTS REFERENCE & LIVE TESTING

## 📋 ALL AVAILABLE API ENDPOINTS

### ✅ PUBLIC ENDPOINTS (No auth required)

#### 1. **Health Check**
```
GET /api/health
Purpose: Check if backend is running
Response: {status: "ok", timestamp: "...", version: "1.0.0"}
```

#### 2. **Get All Products**
```
GET /api/products
Query Params: category, search, page, limit
Response: Array of products with images, prices, ratings
```

#### 3. **Get Single Product**
```
GET /api/products/:id
Response: Product details with all images and specs
```

#### 4. **Get Categories**
```
GET /api/categories
Response: Array of all product categories
```

#### 5. **Get Banners**
```
GET /api/banners
Query Params: type, isActive
Response: Array of homepage banners
```

#### 6. **User Signup**
```
POST /api/auth/signup
Body: {
  name: "Full Name",
  email: "user@example.com",
  password: "password123"
}
Response: {status: 201, token: "jwt_token", user: {...}}
```

#### 7. **User Login**
```
POST /api/auth/login
Body: {
  username: "username_or_email",
  password: "password123"
}
Response: {status: 200, token: "jwt_token", id: "user_id"}
```

#### 8. **Admin Login**
```
POST /api/auth/admin/login
Body: {
  email: "admin@example.com",
  password: "password123"
}
Response: {status: 200, token: "jwt_token_admin", admin: {...}}
```

---

### 🔐 AUTHENTICATED ENDPOINTS (Auth token required)

#### 9. **Add to Cart** ✅ WORKING
```
POST /api/cart
Headers: Authorization: Bearer {token}
Body: {
  product: "product_id",
  qty: 1
}
Response: {
  status: 201,
  message: "Added to Cart",
  cartItem: {_id, product, user, qty, ...}
}
```

**How it's called in frontend:**
```javascript
// Location: frontend/src/pages/DetaileProduct.jsx
const handleAddToCart = async () => {
  const response = await API.post('/api/cart', {
    product: product._id,
    product_name: product.pname,
    price: discountedPrice,
    qty: quantity
  });
  toast.success("Added to cart successfully!");
}
```

---

#### 10. **Get User's Cart** ✅ READY
```
GET /api/cart
Headers: Authorization: Bearer {token}
Response: Array of cart items with product details populated
[
  {
    _id: "cartitem_id",
    product: {pname, price, img1, ...},
    qty: 2,
    createdAt: "..."
  },
  ...
]
```

---

#### 11. **Update Cart Item Quantity** ✅ READY
```
PUT /api/cart/:cartItemId
Headers: Authorization: Bearer {token}
Body: {qty: 3}
Response: {status: 200, message: "Cart updated", cartItem: {...}}
```

---

#### 12. **Remove from Cart** ✅ READY
```
DELETE /api/cart/:cartItemId
Headers: Authorization: Bearer {token}
Response: {status: 200, message: "Item removed from cart"}
```

---

#### 13. **Clear Entire Cart** ✅ READY
```
DELETE /api/cart
Headers: Authorization: Bearer {token}
Response: {status: 200, message: "Cart cleared"}
```

---

#### 14. **Save Delivery Address**
```
POST /api/address
Headers: Authorization: Bearer {token}
Body: {
  mob1: 9876543210,
  mob2: 9876543210,
  postalcode: 123456,
  society: "Flat No. 123",
  area: "Downtown",
  landmark: "Near Hospital",
  city: "New Delhi",
  state: "Delhi"
}
Response: {status: 201, address: {...}, message: "Address saved"}
```

---

#### 15. **Get User's Address**
```
GET /api/address
Headers: Authorization: Bearer {token}
Response: {_id, mob1, mob2, postalcode, society, ...}
```

---

#### 16. **Update Address**
```
PUT /api/address
Headers: Authorization: Bearer {token}
Body: {same as POST}
Response: {status: 200, address: {...}}
```

---

#### 17. **Create Order**
```
POST /api/orders
Headers: Authorization: Bearer {token}
Body: {
  address: "address_id",
  total: 15000,
  mode: "cod" or "online"
}
Response: {
  status: 201,
  order: {_id, user, product, total, status, ...}
}
```

---

#### 18. **Get User's Orders**
```
GET /api/orders
Headers: Authorization: Bearer {token}
Response: Array of user's orders
```

---

### 💳 PAYMENT ENDPOINTS

#### 19. **Create Razorpay Order**
```
POST /api/razorpay/create
Headers: Authorization: Bearer {token}
Body: {
  amount: 15000,
  currency: "INR"
}
Response: {data: {id: "order_id_from_razorpay"}}
```

---

#### 20. **Complete Razorpay Payment**
```
POST /api/razorpay/complete
Headers: Authorization: Bearer {token}
Body: {
  amount: 15000,
  order_id: "razorpay_order_id",
  payment_id: "razorpay_payment_id",
  signature: "razorpay_signature"
}
Response: {status: 200, message: "Payment verified"}
```

---

## 🧪 LIVE TESTING IN BROWSER CONSOLE

Open http://localhost:5173, press F12, go to Console tab and run:

### Test 1: Check Backend Connection
```javascript
fetch('http://localhost:5000/api/health').then(r => r.json()).then(console.log)
// Should show: {status: "ok", ...}
```

### Test 2: Get All Products
```javascript
fetch('http://localhost:5000/api/products').then(r => r.json()).then(console.log)
// Should show: Array of all products
```

### Test 3: Get Your Cart (if logged in)
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json()).then(console.log)
// Should show: Your cart items
```

### Test 4: Add to Cart (if logged in)
```javascript
const token = localStorage.getItem('token');
const productId = "copy_from_product_page";  // Get from product details
fetch('http://localhost:5000/api/cart', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product: productId,
    qty: 1
  })
}).then(r => r.json()).then(console.log)
// Should show: {status: 201, message: "Added to Cart"}
```

---

## 📡 REQUEST/RESPONSE FLOW DIAGRAM

### Add to Cart Flow:

```
┌─ Frontend: User clicks "ADD TO CART"
│
├─ Check: Is user logged in?
│  └─ If NO: Redirect to /login
│  └─ If YES: Continue
│
├─ Get data:
│  ├─ product._id
│  ├─ quantity (from selector)
│  └─ price (calculated)
│
├─ Create POST request to /api/cart
│  ├─ Headers: {Authorization: "Bearer token"}
│  └─ Body: {product: "...", qty: 1}
│
├─ Backend receives request
│  ├─ Verify token (JWT check)
│  ├─ Check product exists
│  ├─ Check/Create cart item
│  └─ Return: {status: 201, cartItem: {...}}
│
├─ Frontend receives response
│  ├─ If status 201: Show success toast
│  ├─ If status 400: Show error (validation failed)
│  ├─ If status 401: Clear token, redirect to login
│  └─ If status 500: Show server error
│
└─ Database: Cart item saved to MongoDB

📊 Result: Item appears in user's cart
```

---

## 🔄 AUTHENTICATION FLOW

### Login → Get Token → Make Authenticated Requests:

```
1. User Login:
   POST /api/auth/login
   ← Response: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

2. Frontend saves token:
   localStorage.setItem('token', 'eyJhbGc...')

3. Frontend makes request to protected endpoint:
   GET /api/cart
   Headers: {Authorization: "Bearer eyJhbGc..."}

4. Backend verifies token:
   ├─ If valid: Process request, return data
   └─ If invalid/expired: Return 401, frontend clears token

5. Token expires after 24 hours:
   └─ User needs to login again
```

---

## 🎯 TESTING CHECKLIST

Run these tests in order:

```
✅ Test 1: Backend Running
   URL: http://localhost:5000/api/health
   Expected: {status: "ok"}

✅ Test 2: Get Products
   URL: http://localhost:5000/api/products
   Expected: Array of products

✅ Test 3: User Signup
   POST: /api/auth/signup
   Expected: {status: 201, token: "..."}

✅ Test 4: User Login
   POST: /api/auth/login
   Expected: {status: 200, token: "..."}

✅ Test 5: Get Cart (Empty)
   GET: /api/cart (with token)
   Expected: [] (empty array)

✅ Test 6: Add to Cart
   POST: /api/cart (with product_id and qty)
   Expected: {status: 201, cartItem: {...}}

✅ Test 7: Get Cart (With Item)
   GET: /api/cart (with token)
   Expected: [{product: {...}, qty: 1, ...}]

✅ Test 8: Save Address
   POST: /api/address (with address data)
   Expected: {status: 201, address: {...}}

✅ Test 9: Create Order (COD)
   POST: /api/orders (with address_id, total, mode: "cod")
   Expected: {status: 201, order: {...}}
```

---

## 🚨 ERROR RESPONSE FORMATS

### 400 - Bad Request (Validation Failed)
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": [
    {"param": "email", "msg": "Invalid email format"}
  ]
}
```

### 401 - Unauthorized (No token or expired)
```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

### 404 - Not Found (Resource doesn't exist)
```json
{
  "status": 404,
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "status": 500,
  "message": "Something went wrong during [operation]"
}
```

---

## 📊 DATABASE SCHEMA REFERENCE

### Cart Item (What gets saved)
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: Product),
  user: ObjectId (ref: User),
  product_name: String,
  price: Number,
  qty: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### User (After Signup/Login)
```javascript
{
  _id: ObjectId,
  username: String (unique),
  first_name: String,
  last_name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  pname: String,
  pdesc: String,
  price: Number,
  offer: Number (0-100),
  stock_count: Number,
  img1, img2, img3, img4, img5: String (image URLs),
  material: String,
  brand: String,
  category: String,
  rating: Number (1-5),
  ...other fields
}
```

---

**Last Updated:** November 13, 2025  
**Backend Status:** ✅ All Endpoints Working  
**Frontend Status:** ✅ All UI Connected to APIs
