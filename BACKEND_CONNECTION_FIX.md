# Backend Connection Fix - ERR_CONNECTION_REFUSED

## Problem
Forms are showing `ERR_CONNECTION_REFUSED` when trying to submit. This means the frontend cannot connect to the backend server.

## Quick Fix

### Step 1: Check if Backend is Running

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Health: /api/health
```

If you see errors, fix them first.

### Step 2: Set Frontend Environment Variable

Create or update `frontend/.env` file:

**For Local Development:**
```env
VITE_API_BASE_URL=http://localhost:5000
```

**For Production (Railway):**
```env
VITE_API_BASE_URL=https://shreefurniture-backend-production.up.railway.app
```

### Step 3: Restart Frontend

After updating `.env`, restart the frontend:
```bash
cd frontend
npm run dev
```

### Step 4: Verify Connection

1. Open browser console (F12)
2. Look for: `🌐 API Base URL: http://localhost:5000` (or your configured URL)
3. Submit a form
4. Check if request goes to correct URL

## Testing Backend Connection

### Test 1: Health Check
Open browser and visit:
```
http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok","time":"...","env":"development"}
```

### Test 2: Check Backend Logs
When you submit a form, backend console should show:
```
POST /api/order/create
```

If you don't see this, the request isn't reaching the backend.

## Common Issues

### Issue 1: Backend Not Running
**Solution:** Start backend server
```bash
cd backend
npm run dev
```

### Issue 2: Wrong Port
**Solution:** Check backend is on port 5000
- Check `backend/.env`: `PORT=5000`
- Check backend console: `Server running on port 5000`

### Issue 3: CORS Error
**Solution:** Backend CORS is already configured for localhost:5173
- If still getting CORS error, check `backend/server.js` CORS settings

### Issue 4: Environment Variable Not Loading
**Solution:** 
1. Create `frontend/.env` file
2. Add: `VITE_API_BASE_URL=http://localhost:5000`
3. Restart frontend dev server
4. Check console for: `🌐 API Base URL: http://localhost:5000`

## Current Configuration

### Frontend API Config (`frontend/src/utils/api.js`):
- Uses `VITE_API_BASE_URL` from environment
- Falls back to production URL if not set
- Falls back to `localhost:5000` as last resort

### Backend Server (`backend/server.js`):
- Runs on port 5000 (or PORT from .env)
- CORS enabled for localhost:5173, localhost:5174, localhost:3000
- Health endpoint: `/api/health`

## Quick Start Commands

### Terminal 1 - Backend:
```bash
cd backend
npm install  # First time only
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install  # First time only
npm run dev
```

### Terminal 3 - Admin (Optional):
```bash
cd admin
npm install  # First time only
npm run dev
```

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend `.env` has `VITE_API_BASE_URL=http://localhost:5000`
- [ ] Frontend console shows correct API Base URL
- [ ] Backend health check works: `http://localhost:5000/api/health`
- [ ] Form submission shows request in backend console
- [ ] No CORS errors in browser console

## Still Not Working?

1. **Check Backend Logs:**
   - Look for any errors when starting backend
   - Check MongoDB connection
   - Check if port 5000 is already in use

2. **Check Frontend Console:**
   - Look for API Base URL log
   - Check Network tab - see actual request URL
   - Check for CORS errors

3. **Test Direct API Call:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return JSON response

4. **Check Firewall:**
   - Windows Firewall might be blocking port 5000
   - Temporarily disable to test

5. **Check Port Conflict:**
   ```bash
   netstat -ano | findstr :5000
   ```
   If something else is using port 5000, change PORT in backend/.env

---

**Status:** Fixed API configuration with better error handling and fallback URLs.

