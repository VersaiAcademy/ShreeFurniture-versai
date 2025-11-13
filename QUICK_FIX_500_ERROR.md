# Quick Fix Reference - 500 Error Resolution

## The Problem ❌
```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
```

## The Solution ✅

### 1. Fix Backend Environment Loading
**File:** `backend/server.js` - Line 7

Change from:
```javascript
dotenv.config();
```

To:
```javascript
dotenv.config({ path: path.join(__dirname, '.env') });
```

### 2. Update Frontend API URL
**File:** `frontend/.env` - Line 8

Change from:
```properties
VITE_API_BASE_URL=https://shreefurniture-backend-production.up.railway.app
```

To:
```properties
VITE_API_BASE_URL=http://localhost:5000
```

---

## How to Run

### Terminal 1 - Backend
```bash
cd backend
node server.js
```
✅ Should show: `🚀 Server running on port 5000`

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```
✅ Should show: `➜  Local:   http://localhost:5174/`

---

## Test It Works

Visit: http://localhost:5174/help

You should see:
- ✅ Help page loads without errors
- ✅ No red console errors
- ✅ All content displays properly

---

## If It Still Doesn't Work

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status": "ok", "timestamp": "...", "environment": "development"}
```

### Check Frontend Console
Press `F12` → Console tab
- Look for any errors
- Check Network tab - see if requests go to `http://localhost:5000`

### Check Environment Variables Loaded
Backend logs should show:
```
🔧 Environment check:
   NODE_ENV: development
   MONGO_URI exists: true
```

---

## File Locations

```
ShreeFurniture-versai/
├── backend/
│   ├── .env                    ← Backend config
│   └── server.js              ← Make change here
├── frontend/
│   ├── .env                    ← Make change here
│   └── src/main.jsx
```

---

## Error Causes (What Was Wrong)

1. **Backend couldn't read .env** 
   - `dotenv.config()` looked in wrong directory
   - Environment variables didn't load
   - MongoDB connection failed → 500 error

2. **Frontend called wrong API**
   - Was pointing to production server
   - Production server was not accessible from local machine
   - Or production server was down
   - → Frontend got 500 error response

---

## Now Works! 🎉

Your application is now:
- ✅ Backend connected to MongoDB
- ✅ Frontend calling local backend
- ✅ No 500 errors
- ✅ Ready for development

