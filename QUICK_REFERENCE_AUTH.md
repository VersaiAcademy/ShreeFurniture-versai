# ⚡ Quick Reference - Auth & Profile System

## 🔐 Login → Profile → Logout Flow

```
1. USER LOGS IN
   URL: /login
   Credentials: username + password
   Backend: POST /api/auth/login
   Response: { token, id, username, email, first_name }
   
2. FRONTEND STORES DATA
   localStorage.setItem('token', response.data.token)
   localStorage.setItem('id', response.data.id)
   localStorage.setItem('username', response.data.username)
   localStorage.setItem('first_name', response.data.first_name)
   localStorage.setItem('email', response.data.email)
   
3. AUTO-REDIRECT
   navigate('/profile')
   
4. HEADER UPDATES
   Profile icon → "Profile" (instead of "Login")
   Logout button appears
   Welcome message shows in mobile menu
   
5. USER ON PROFILE PAGE
   Can view: Orders, Address, Account info
   Can edit: Address (click Edit button)
   
6. USER LOGS OUT
   Click Logout button
   localStorage.clear() (removes token, id, etc.)
   Redirected to home page "/"
   Header reverts to Login button
```

---

## 📁 Key Files & Their Roles

| File | Role | Key Functions |
|------|------|----------------|
| Header.jsx | Navigation & Auth | handleProfileClick, handleLogout, checkAuthStatus |
| UserProfile.jsx | Dashboard | fetchAll, handleAddressSubmit, deleteItem |
| Login.jsx | Authentication | onSubmit (saves data + redirects) |
| users.js (Backend) | User Management | PUT /api/users/:id (update profile) |
| orders.js (Backend) | Order Management | GET /api/admin/all (populate user + address) |
| Orders.jsx (Admin) | Order Display | Shows phone + address columns |

---

## 🔧 Important State Variables

### Header.jsx
```javascript
isLoggedIn - boolean, determines if user is logged in
userName - string, displays user name
```

### UserProfile.jsx
```javascript
isAuthenticated - boolean, triggers auth check
userInfo - object, contains user details
address - object, delivery address
editingAddress - boolean, toggle edit mode
addressForm - object, form state for address fields
activeTab - string, current tab (orders/address/profile)
```

---

## 💾 localStorage Keys

| Key | Purpose | Example |
|-----|---------|---------|
| token | JWT authentication token | eyJhbGc... |
| id | User's MongoDB ID | 507f1f77bcf86cd799439011 |
| username | User's username | testuser |
| first_name | User's first name | John |
| email | User's email | john@example.com |

---

## 🔌 API Endpoints Used

### For Users
```
POST   /api/auth/login           - Login with credentials
GET    /api/auth/me              - Get current user info
PUT    /api/users/:id            - Update profile & address
GET    /api/address/             - Get user's address
GET    /api/orders/              - Get user's orders
POST   /api/orders/:id/cancel    - Cancel order
```

### For Admins
```
GET    /api/admin/all            - Get all orders with customer details
```

---

## ✅ Validation Rules

### Address Form
```
address_line1 (required)   - Non-empty string
address_line2 (optional)   - Non-empty string
city (required)            - Non-empty string
state (required)           - Non-empty string
zip (required)             - 5-6 digits only
phone (required)           - 10 digits only
```

### Backend Phone Validation
```javascript
phone.isNumeric().isLength({ min: 10, max: 10 })
// Must be exactly 10 digits
```

---

## 🎨 UI Components

### Header
- Profile button (routes based on auth)
- Logout button (visible when logged in)
- Mobile menu (shows welcome message + Profile/Logout)

### Profile Page
- Sidebar (user info + tabs)
- Orders Tab (list of orders with status)
- Address Tab (display + edit form)
- Account Tab (user details)

### Address Form
- 6 input fields with validation
- Save button (shows "Saving..." while loading)
- Cancel button (closes form)
- Success/error toasts

---

## 🔄 Request/Response Examples

### Login Request
```javascript
POST /api/auth/login
Body: { username: "testuser", password: "password123" }
```

### Login Response
```javascript
{
  status: 200,
  message: "Login successful",
  token: "eyJhbGc...",
  id: "507f1f77bcf86cd799439011",
  username: "testuser",
  email: "test@example.com",
  first_name: "Test"
}
```

### Update Address Request
```javascript
PUT /api/users/507f1f77bcf86cd799439011
Headers: { Authorization: "Bearer eyJhbGc..." }
Body: {
  address_line1: "123 Main St",
  address_line2: "Apt 4B",
  city: "Mumbai",
  state: "Maharashtra",
  zip: "400001",
  phone: "9876543210"
}
```

### Update Address Response
```javascript
{
  status: 200,
  message: "Profile updated successfully",
  user: { _id, first_name, last_name, email, phone },
  address: { address, area, city, state, postalcode, mob1 }
}
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Login redirects to /login | Check localStorage token/id exist |
| Profile shows blank | Check /api/auth/me response |
| Address form doesn't save | Verify phone is 10 digits, zip is 5-6 |
| Header doesn't update | Check localStorage is set correctly |
| Logout doesn't work | Verify handleLogout function runs |
| Mobile menu broken | Check responsive classes in Tailwind |
| Admin orders show no phone | Verify user.phone is populated in DB |

---

## 📱 Responsive Breakpoints

| Device | TailwindCSS Class | Profile Layout |
|--------|-------------------|----------------|
| Mobile | default | Single column (tab stack) |
| Tablet | md: | 2 columns (sidebar + content) |
| Desktop | lg: | Full layout with proper spacing |

---

## 🔐 Security Checklist

- [x] JWT token stored in localStorage
- [x] Token sent in Authorization header
- [x] User can only update own profile
- [x] Passwords not stored in localStorage
- [x] Logout clears sensitive data
- [x] Protected routes redirect to /login
- [x] Input validation on frontend
- [x] Input validation on backend
- [x] CORS configured for allowed origins

---

## 🧪 Quick Test Commands

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Test Update Address
```bash
curl -X PUT http://localhost:5000/api/users/[USER_ID] \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN]" \
  -d '{
    "address_line1":"123 Main St",
    "city":"Mumbai",
    "state":"Maharashtra",
    "zip":"400001",
    "phone":"9876543210"
  }'
```

### Test Admin Orders
```bash
curl -X GET http://localhost:5000/api/admin/all \
  -H "Authorization: Bearer [ADMIN_TOKEN]"
```

---

## 📞 Support Contacts

- **Frontend Issues**: Check browser console (F12)
- **Backend Issues**: Check backend logs
- **Database Issues**: Check MongoDB connection
- **Auth Issues**: Verify token in localStorage
- **CORS Issues**: Check allowed origins in server.js

---

**Quick Links:**
- 📖 Full Documentation: `AUTH_PROFILE_IMPLEMENTATION.md`
- 🧪 Testing Guide: `TESTING_GUIDE.md`
- 📝 Implementation Summary: `IMPLEMENTATION_SUMMARY.md`

---

**Last Updated:** November 13, 2025
**Status:** ✅ Complete & Ready for Testing
