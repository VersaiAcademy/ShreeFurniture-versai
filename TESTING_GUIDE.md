# 🧪 Testing Guide - Authentication & Profile System

## Pre-Testing Setup

1. Ensure backend is running: `npm start` in `backend/` folder
2. Ensure frontend is running: `npm run dev` in `frontend/` folder
3. Database connection should be active (check backend console for "✅ MongoDB Connected")
4. Admin panel running: `npm run dev` in `admin/` folder (optional, for admin orders testing)

---

## 🔐 Test Case 1: User Login Flow

### Steps:
1. **Navigate to `/login` page**
   - Should see login form with username and password fields
   - Profile icon in header should show "Login"

2. **Enter test credentials:**
   ```
   Username: testuser
   Password: password123
   ```

3. **Click "Login" button**
   - Should see success toast: "Login successful"
   - Should be redirected to `/profile` page
   - Header should now show "Profile" instead of "Login"
   - Logout button should appear in header

### Expected Results:
- ✅ Redirects to profile page
- ✅ Header updates to show "Profile" + "Logout"
- ✅ localStorage contains: token, id, username, first_name, email
- ✅ No console errors

---

## 👤 Test Case 2: User Profile Page

### Steps:
1. **From previous test (logged in state)**
   - You should be on `/profile` page
   - Should see sidebar with user name and email
   - Should see three tabs: Orders, Address, Account

2. **Verify "Orders" tab:**
   - Click "Orders" tab (should be selected by default)
   - Should show list of user's orders (if any exist)
   - Each order should show: Order ID, items count, status, date
   - Should see buttons: "View" (opens order detail), "Cancel" (if order is not delivered)

3. **Verify "Address" tab:**
   - Click "Address" tab
   - Should show saved address or message "No address saved yet"
   - Should have "Edit" button

4. **Verify "Account" tab:**
   - Click "Account" tab
   - Should show user's name and email

### Expected Results:
- ✅ All tabs are accessible and functional
- ✅ Data is populated correctly
- ✅ Tab navigation works smoothly
- ✅ No console errors

---

## 📍 Test Case 3: Edit Address

### Steps:
1. **From Profile page, click "Address" tab**
   - You should be on Address tab

2. **Click "Edit" button**
   - Should see form with fields:
     - Address Line 1 (required)
     - Address Line 2 (optional)
     - City (required)
     - State (required)
     - Zip Code (required)
     - Phone (required)
   - If address exists, fields should be pre-filled

3. **Update some fields:**
   ```
   Address Line 1: 123 Main Street
   City: Mumbai
   State: Maharashtra
   Zip: 400001
   Phone: 9876543210
   ```

4. **Click "Save Address" button**
   - Should see success toast: "Address updated successfully!"
   - Form should close
   - Address should be displayed in read-only mode

5. **Refresh page** (F5 or Cmd+R)
   - Revisit profile page
   - Address should still be there (persisted to database)

### Expected Results:
- ✅ Form opens with pre-filled data
- ✅ Form validates required fields (try submitting empty)
- ✅ Success toast appears
- ✅ Address persists after refresh
- ✅ No console errors
- ✅ Loading state shows "Saving..." while request is pending

---

## 🚪 Test Case 4: Logout

### Steps:
1. **From header, click "Logout" button**
   - Logout button should be visible next to Profile

2. **Click "Logout"**
   - Should see redirect to home page
   - Header should reset to showing "Login" instead of "Profile"
   - localStorage should be cleared (check DevTools → Application → Local Storage)

3. **Try accessing `/profile` directly**
   - Should redirect to `/login` page
   - See message: (page redirects, no content)

### Expected Results:
- ✅ Redirects to home page
- ✅ Header shows "Login" button
- ✅ localStorage cleared (token, id, username, email removed)
- ✅ `/profile` is not accessible (redirects to login)
- ✅ No console errors

---

## 📱 Test Case 5: Mobile Responsiveness

### Steps:
1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Select Mobile device** (e.g., iPhone 12)

4. **Test from login:**
   - Login form should stack vertically
   - Text and buttons should be readable
   - No horizontal scrolling

5. **Test profile page:**
   - Sidebar should stack above main content
   - Tabs should be accessible
   - Forms should adapt to mobile screen size
   - Edit address form should be touch-friendly

6. **Test header:**
   - Menu button should work
   - Mobile menu should slide in from right
   - Login/Logout options should be in mobile menu
   - Welcome message should show when logged in

### Expected Results:
- ✅ All elements readable and functional
- ✅ No text overflow or horizontal scrolling
- ✅ Buttons/inputs are touch-friendly size (min 44px)
- ✅ Forms adapt to smaller screens
- ✅ Mobile menu works smoothly

---

## 🏢 Test Case 6: Admin Orders Dashboard

### Steps:
1. **Login to admin panel** (separate admin credentials)
   ```
   Email: admin@example.com
   Password: adminpass
   ```

2. **Navigate to Orders section**
   - Should see orders table

3. **Verify new columns:**
   - ✅ Customer Name column
   - ✅ Phone column (shows customer phone)
   - ✅ Address column (shows address with city and zip)
   - ✅ Product, Total, Status, Date columns

4. **Check data accuracy:**
   - Phone numbers should be 10 digits
   - Address should include street, city, and zip
   - Customer name should match the user who placed order

5. **Test responsive table:**
   - On mobile, table should be scrollable horizontally
   - All columns should remain visible

### Expected Results:
- ✅ New columns are visible and populated
- ✅ Data matches orders placed
- ✅ Table is responsive
- ✅ No console errors

---

## 🔍 Test Case 7: Cross-Tab Synchronization

### Steps:
1. **Open application in two browser tabs** (same URL)

2. **Tab 1 - Login**
   - Go to `/login`
   - Enter credentials and login
   - Verify redirected to `/profile`

3. **Tab 2 - Check header**
   - Without refreshing, header should update
   - Profile/Logout buttons should appear
   - Welcome message should show

4. **Tab 1 - Logout**
   - Click Logout button

5. **Tab 2 - Check header**
   - Header should update automatically
   - Should show "Login" button again
   - Profile should not be accessible

### Expected Results:
- ✅ Header updates across tabs without refresh
- ✅ Login/logout state synchronized
- ✅ Demonstrates proper storage event listener

---

## ⚠️ Error Scenario Tests

### Test Case 8A: Invalid Login
```
Username: wronguser
Password: wrongpass
```
- Should show error toast
- Should stay on login page
- Should NOT redirect to profile

### Test Case 8B: Empty Form Submission
- Click "Save Address" with empty fields
- Should show validation errors for required fields
- Form should NOT submit

### Test Case 8C: Invalid Phone Number
- Try entering non-numeric phone
- Should show validation error
- Form should NOT submit

### Test Case 8D: Invalid Zip Code
- Try entering zip with less than 5 digits
- Should show validation error
- Form should NOT submit

### Expected Results:
- ✅ All validations work
- ✅ Error messages are clear
- ✅ Forms don't submit with invalid data

---

## 📊 Verification Checklist

Use this checklist to verify all components:

### Frontend
- [ ] Header shows Profile/Logout when logged in
- [ ] Header shows Login when logged out
- [ ] Login redirects to profile
- [ ] Profile page loads user data
- [ ] Address edit form works
- [ ] Logout clears data and redirects home
- [ ] Mobile view is responsive
- [ ] Tabs switch correctly
- [ ] Orders display with proper status colors

### Backend
- [ ] `/api/auth/login` returns token and user data
- [ ] `/api/users/:id` updates address correctly
- [ ] `/api/users/profile` returns user and address
- [ ] `/api/admin/all` includes customer phone and address
- [ ] Validation errors return proper messages
- [ ] JWT authentication works

### Admin
- [ ] Orders table displays all columns
- [ ] Customer phone is visible
- [ ] Customer address is visible
- [ ] Table is responsive on mobile

---

## 🛠️ Debugging Tips

### If login doesn't work:
1. Check browser DevTools Network tab
2. Verify `/api/auth/login` returns status 200
3. Check localStorage for token
4. Check browser console for errors
5. Verify backend is running

### If profile page redirects to login:
1. Check localStorage has `token` and `id`
2. Check if JWT token is expired
3. Check `/api/auth/me` endpoint response
4. Try logging in again

### If address doesn't save:
1. Check Network tab for PUT request
2. Verify phone is 10 digits
3. Verify zip is 5-6 digits
4. Check console for validation errors
5. Check backend logs

### If admin orders don't show phone/address:
1. Verify backend `/api/admin/all` is called
2. Check if order has user and address populated
3. Verify admin table columns match response fields
4. Check browser console for errors

---

## 📞 Support

If tests fail, check:
1. Backend console for errors
2. Frontend console (F12)
3. Network tab for API responses
4. Verify all files are saved and no unsaved changes
5. Clear browser cache (Ctrl+Shift+Delete)
6. Restart dev servers

---

**Last Updated:** November 13, 2025
