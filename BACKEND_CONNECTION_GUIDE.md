# 🔧 BACKEND CONNECTION TROUBLESHOOTING GUIDE

## ✅ QUICK VERIFICATION CHECKLIST

### 1. **Backend Setup** ✓ CONFIGURED
- ✅ MongoDB URI configured in `backend/.env`
- ✅ JWT Secret configured
- ✅ Cloudinary configured for image uploads
- ✅ CORS enabled for localhost:5173 (frontend) and localhost:3000 (admin)
- ✅ All API routes registered:
  - `/api/auth` - Login, Signup, Admin login
  - `/api/cart` - Add/Remove/Update cart items (requires auth)
  - `/api/orders` - Create orders (requires auth)
  - `/api/address` - Save/Update delivery address (requires auth)
  - `/api/products` - Get products (public)
  - `/api/categories` - Get categories (public)
  - `/api/banners` - Get banners (public)

### 2. **Frontend Setup** ✓ CONFIGURED
- ✅ API Base URL: `https://shreefurniture-backend-production.up.railway.app`
- ✅ Axios instance configured with auto-auth header injection
- ✅ Request/Response interceptors for logging and error handling
- ✅ Toast notifications for user feedback
- ✅ All pages updated to use backend APIs

---

## 🚀 HOW TO START THE STACK

### Option 1: Windows Batch Script (Recommended)
```batch
cd c:\Users\versai\Desktop\ShreeFurniture-versai
SETUP_AND_TEST.bat
```

### Option 2: Manual Start (Terminal 1 - Backend)
```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\backend
npm install  # First time only
npm run dev  # Starts on port 5000
```

Expected output:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Health: /api/health
```

### Option 3: Manual Start (Terminal 2 - Frontend)
```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\frontend
npm install  # First time only
npm run dev  # Starts on port 5173
```

Expected output:
```
  VITE v5.0.8  ready in 123 ms
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Option 4: Manual Start (Terminal 3 - Admin)
```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\admin
npm install  # First time only
npm run dev  # Starts on port 3000
```

---

## 🧪 HOW TO TEST BACKEND CONNECTION

### 1. **Health Check (Test Backend is Running)**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-13T...",
  "environment": "development",
  "version": "1.0.0"
}
```

### 2. **Test in Browser Console**
Open http://localhost:5173 → Press F12 → Go to Console tab

**Test 1: Check API Configuration**
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
// Should output: https://shreefurniture-backend-production.up.railway.app
```

**Test 2: Check if Request Logs Appear**
Look for 🌐, 📤, ✅, ❌ emoji logs in console when performing actions.

### 3. **Test Add to Cart Flow**
1. Go to product detail page
2. Press F12 → Console tab
3. Select quantity and click "ADD TO CART"
4. Look for console output:
```
📤 POST /api/cart {data...}
✅ POST /api/cart {status: 201, data...}
```

### 4. **Test Login Flow**
1. Go to http://localhost:5173/login
2. Press F12 → Network tab
3. Enter credentials and click Login
4. In Network tab, look for:
   - Request to `/api/auth/login`
   - Response status should be 200
   - Response should contain `token` and `user` data
5. In Console, should see:
```
📤 POST /api/auth/login {username, password}
✅ POST /api/auth/login {status: 200, token: "...", user: {...}}
```

---

## ❌ COMMON ISSUES & FIXES

### Issue 1: "Cannot connect to server" or "No response from server"

**Symptoms:**
- Toast: "Cannot connect to server. Please check your internet connection."
- Console: "📡 No response from server"

**Causes & Fixes:**
1. **Backend not running**
   - Fix: Start backend with `npm run dev` in backend folder
   - Verify: http://localhost:5000/api/health should return 200

2. **Wrong API Base URL**
   - Check: `frontend/src/utils/api.js` line 3
   - Should be: `https://shreefurniture-backend-production.up.railway.app` (for production)
   - Or: `http://localhost:5000` (for local development)
   - Fix: Update `VITE_API_BASE_URL` in `frontend/.env`

3. **CORS Blocked**
   - Symptoms: Network tab shows 200 but console shows error
   - Fix: Ensure `backend/.env` has correct CORS origins:
   ```
   CLIENT_ORIGIN=http://localhost:5173,http://localhost:3000
   ```

4. **Firewall/Network Issues**
   - Try: `curl http://localhost:5000/api/health`
   - If fails: Check Windows Firewall (add Node.js to exceptions)

---

### Issue 2: "Added to cart" shows but item doesn't appear

**Symptoms:**
- Toast shows "Added to cart!" but cart is empty
- Network tab shows 201 response but cart doesn't update

**Causes & Fixes:**
1. **User not authenticated**
   - Fix: Ensure you're logged in first
   - Check: `localStorage.getItem('token')` in console should not be null
   - If null: Go to Login page and login first

2. **Token expired**
   - Symptoms: Added to cart shows briefly, then 401 error
   - Fix: Login again (tokens expire after 24 hours)
   - Check: Backend logs should show "🔒 Unauthorized - Clearing tokens"

3. **Cart context not synced**
   - Fix: Reload page (cart should restore from localStorage)
   - Or: Clear localStorage and login again:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

---

### Issue 3: Login/Register shows error "Validation failed"

**Symptoms:**
- 400 error during signup
- Console shows: "Validation failed, errors: [...] "

**Causes & Fixes:**
1. **Invalid email format**
   - Fix: Use valid email like `test@example.com`

2. **Password too short**
   - Backend requires: min 5 characters
   - Fix: Use password with 5+ characters

3. **Username/Email already exists**
   - Fix: Use different email/username

4. **Missing required fields**
   - Register requires: name, email, password (min 5 chars)
   - Fix: Fill all fields properly

---

### Issue 4: "Buy Now" doesn't redirect to checkout

**Symptoms:**
- Click "BUY NOW", toast shows "Proceeding to checkout..."
- But no redirect to Address page

**Causes & Fixes:**
1. **Not logged in**
   - Fix: Login first, then try Buy Now

2. **Cart add failed silently**
   - Check: Console for 📤 POST /api/cart errors
   - Look for red ❌ logs in console

3. **Address page route missing**
   - Fix: Verify `/address/:totaloffer/:totalprice/:offer` route exists in App.jsx

---

### Issue 5: Images not loading in products

**Symptoms:**
- Product images show broken image icon
- Network tab shows 404 for image URLs

**Causes & Fixes:**
1. **Cloudinary not configured**
   - Check: `backend/.env` has valid CLOUDINARY credentials:
   ```
   CLOUDINARY_CLOUD_NAME=deagq2pwi
   CLOUDINARY_API_KEY=123877637263241
   CLOUDINARY_API_SECRET=n7UGuO4WpHUnSCrqQoVeie7ALOA
   ```

2. **Product image URLs stored incorrectly**
   - Fix: Re-upload products from admin panel

---

## 📊 DEBUGGING TIPS

### 1. **Enable Maximum Logging**
All API calls log automatically. Check console for:
- 📤 = Request being sent
- ✅ = Successful response
- ❌ = Error response
- 🔒 = Auth error (token invalid/expired)
- 📡 = Network error (server unreachable)

### 2. **Check Browser DevTools Network Tab**
1. Press F12 → Network tab
2. Filter by "XHR" (XmlHttpRequest)
3. Perform action (e.g., Add to Cart)
4. Click the request to see:
   - **Headers**: Authorization token included?
   - **Request**: Payload sent correctly?
   - **Response**: Status 200/201 or 400/401/500?

### 3. **Check Backend Console Logs**
When backend is running (npm run dev):
- 📍 shows every request received
- ✅ shows successful operations
- ❌ shows errors

Example output:
```
📍 POST /api/cart
✅ MongoDB Connected
📤 Saving cart item...
[logs for data processing]
```

### 4. **Check MongoDB Connection**
Backend logs should show:
```
✅ MongoDB Connected
```

If missing, check:
- `backend/.env` has valid `MONGO_URI`
- MongoDB service is running (if local)
- Network connection to MongoDB Atlas (if cloud)

---

## 🔑 KEY ENVIRONMENT VARIABLES TO VERIFY

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb+srv://...  # Valid MongoDB connection string
JWT_SECRET=shri_furniture_jwt_secret_key_2024  # Any random string
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=deagq2pwi  # For image uploads
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=https://shreefurniture-backend-production.up.railway.app
# For local dev, use: http://localhost:5000
VITE_RAZORPPAY_KEY_ID=rzp_live_your_key_here  # For payments
```

---

## 📞 SUPPORT FLOWCHART

```
Issue Reported
   ↓
   ├─ "Cannot connect to server"?
   │  └─ Check: Backend running? → curl http://localhost:5000/api/health
   │
   ├─ "Added to cart" but empty?
   │  └─ Check: User logged in? → localStorage.getItem('token')
   │
   ├─ Login fails "Validation failed"?
   │  └─ Check: Valid email (email@domain.com)? min 5 char password?
   │
   ├─ Images not showing?
   │  └─ Check: Cloudinary credentials in backend/.env valid?
   │
   └─ Other?
      └─ Check: Browser Console for 🌐/📤/✅/❌ logs
         Check: Backend Console for 📍/✅/❌ logs
         Check: Network Tab for API response status/data
```

---

## ✅ VERIFICATION CHECKLIST (Run before going to production)

- [ ] Backend starts without errors (✅ MongoDB Connected)
- [ ] Frontend connects to backend (console shows 🌐 logs)
- [ ] Can Login/Register new users
- [ ] Can view products (images load)
- [ ] Can Add to Cart (requires login)
- [ ] Can proceed to checkout (Buy Now works)
- [ ] Can place order (COD and Online payment)
- [ ] Admin panel loads (http://localhost:3000)
- [ ] Admin can add/edit/delete products
- [ ] Admin can see orders

---

**Last Updated:** November 13, 2025
**Status:** ✅ All Systems Configured & Ready
