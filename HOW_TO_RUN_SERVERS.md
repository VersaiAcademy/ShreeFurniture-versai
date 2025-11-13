# How to Run Both Servers Properly

## Problem You Faced
The frontend showed: **"Cannot connect to server. Please check your internet connection."**

This happens when the backend server is not running.

---

## Solution: Keep Both Servers Running

### Terminal 1: Start Backend Server

```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\backend
node server.js
```

**Expected Output:**
```
✅ Admin routes loaded successfully
🔧 Environment check:
   NODE_ENV: development
   MONGO_URI exists: true
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Health: /api/health
```

**Important:** Keep this terminal open while developing!

---

### Terminal 2: Start Frontend Server

```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\frontend
npm run dev
```

**Expected Output:**
```
VITE v5.0.12 ready in 303 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Important:** Keep this terminal open while developing!

---

## How It Works

```
Frontend (port 5174)
        ↓
    Makes API calls to
        ↓
Backend (port 5000)
        ↓
    Connects to
        ↓
MongoDB Database
```

If any part is not running, you get the **"Cannot connect to server"** error.

---

## Before You Start Developing

✅ **Checklist:**
- [ ] Backend terminal shows: `🚀 Server running on port 5000`
- [ ] Frontend terminal shows: `Local: http://localhost:5174/`
- [ ] Open browser to http://localhost:5174
- [ ] No error dialogs should appear
- [ ] Content should load normally

---

## If You Get "Cannot Connect" Error Again

### Step 1: Check if Backend is Running
Open a new terminal and run:
```bash
Invoke-WebRequest http://localhost:5000/api/health -UseBasicParsing
```

**If it works:** You'll see JSON response with status "ok"
**If it fails:** Backend is not running - go to Step 2

### Step 2: Restart Backend
Kill all Node processes:
```bash
Get-Process node | Stop-Process -Force
```

Then start backend again:
```bash
cd c:\Users\versai\Desktop\ShreeFurniture-versai\backend
node server.js
```

Wait for the message: `🚀 Server running on port 5000`

### Step 3: Refresh Frontend
Press `F5` in browser or click refresh button

---

## Ports Being Used

| Service | Port | URL |
|---------|------|-----|
| Backend | 5000 | http://localhost:5000 |
| Frontend | 5173/5174 | http://localhost:5173 or 5174 |
| MongoDB | 27017 | Cloud-based (external) |

---

## Common Mistakes to Avoid

❌ **Mistake 1:** Only running frontend, backend not running
✅ **Fix:** Run backend in Terminal 1, keep it open

❌ **Mistake 2:** Changing port numbers
✅ **Fix:** Use default ports (5000 for backend, 5173 for frontend)

❌ **Mistake 3:** Closing the terminal with backend/frontend
✅ **Fix:** Keep both terminals open during development

❌ **Mistake 4:** Frontend using production API URL
✅ **Fix:** Make sure `frontend/.env` has `VITE_API_BASE_URL=http://localhost:5000`

---

## Testing the Connection

### Test 1: Backend Health Check
```bash
Invoke-WebRequest http://localhost:5000/api/health -UseBasicParsing | Select-Object -Expand Content
```

Expected response:
```json
{"status":"ok","timestamp":"2025-11-13T...","environment":"development","version":"1.0.0"}
```

### Test 2: Get Products (Basic API Call)
Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(d => console.log('✅ Connected!', d))
  .catch(e => console.error('❌ Error:', e))
```

If you see `✅ Connected!` - everything is working!

---

## Development Workflow

1. **Start Backend** (Terminal 1)
2. **Start Frontend** (Terminal 2)
3. **Open Browser** to http://localhost:5174
4. **Make Code Changes** - both will auto-reload
5. **Test Your Changes**
6. When done, close both terminals with `Ctrl + C`

---

## If Backend Keeps Crashing

Check for these issues:

### Issue 1: MongoDB Connection
Backend log should show: `✅ MongoDB Connected`
If not, check `.env` file has valid `MONGO_URI`

### Issue 2: Port Already in Use
If you see error about port 5000 being in use:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue 3: Missing Dependencies
Run in backend folder:
```bash
npm install
```

---

## Quick Start Script

Save this as `start-dev.bat`:
```batch
@echo off
cd c:\Users\versai\Desktop\ShreeFurniture-versai
start cmd /k "cd backend && node server.js"
start cmd /k "cd frontend && npm run dev"
start http://localhost:5174
```

Then just double-click the file to start everything!

