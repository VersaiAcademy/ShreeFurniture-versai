# Quick Fix: ERR_CONNECTION_REFUSED

## Problem
Forms showing `ERR_CONNECTION_REFUSED` - Frontend cannot connect to backend.

## Solution

### Option 1: Use Production Backend (Recommended - No Setup Needed)

The frontend is now configured to use the production backend by default:
- **Backend URL:** `https://shreefurniture-backend-production.up.railway.app`
- **No local server needed**

Just refresh your frontend and try submitting forms again.

### Option 2: Run Backend Locally

If you want to use local backend:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm install  # First time only
   npm run dev
   ```
   
   You should see:
   ```
   ✅ MongoDB Connected
   🚀 Server running on port 5000
   ```

2. **Create Frontend .env File:**
   Create `frontend/.env` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. **Restart Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Current Configuration

The frontend now uses:
- **Default:** Production backend (`https://shreefurniture-backend-production.up.railway.app`)
- **Override:** Set `VITE_API_BASE_URL` in `frontend/.env` for local development

## Verify It's Working

1. Open browser console (F12)
2. Look for: `🌐 API Base URL: https://shreefurniture-backend-production.up.railway.app`
3. Submit a form
4. Check Network tab - request should go to the Railway URL

## If Still Getting Errors

### Check 1: Backend Health
Visit in browser:
```
https://shreefurniture-backend-production.up.railway.app/api/health
```

Should return JSON with `{"status":"ok"}`

### Check 2: CORS
If getting CORS errors, the backend needs to allow your frontend domain. Check `backend/server.js` CORS settings.

### Check 3: Network Tab
- Open DevTools → Network tab
- Submit form
- Check the failed request
- See what URL it's trying to connect to
- Verify the URL is correct

## Status

✅ **Fixed:** API now uses production backend by default  
✅ **Fixed:** Better error messages for connection issues  
✅ **Fixed:** Environment variable support for local development

---

**Next Step:** Refresh your frontend and try submitting forms again. They should now work with the production backend.

