@echo off
REM Backend Connection Setup & Verification Script

echo.
echo ================================================================================
echo   SHREE FURNITURE - BACKEND CONNECTION SETUP & TEST
echo ================================================================================
echo.

REM Check if backend .env exists
if not exist "backend\.env" (
    echo ❌ backend\.env file not found!
    echo Creating from env.example...
    copy "backend\env.example" "backend\.env"
    echo ✅ backend\.env created
) else (
    echo ✅ backend\.env exists
)

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
    echo.
    echo ⚠️ Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend node_modules exists
)

REM Check if frontend .env exists
if not exist "frontend\.env" (
    echo.
    echo ⚠️ Creating frontend\.env...
    echo VITE_API_BASE_URL=https://shreefurniture-backend-production.up.railway.app > "frontend\.env"
    echo VITE_RAZORPPAY_KEY_ID=rzp_live_your_key_here >> "frontend\.env"
    echo ✅ frontend\.env created
) else (
    echo ✅ frontend\.env exists
)

REM Check if frontend node_modules exists
if not exist "frontend\node_modules" (
    echo.
    echo ⚠️ Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend node_modules exists
)

echo.
echo ================================================================================
echo   CONFIGURATION SUMMARY
echo ================================================================================
echo.
echo Backend Configuration:
echo   - Environment: development
echo   - Port: 5000
echo   - API Base: http://localhost:5000
echo   - Health Check: http://localhost:5000/api/health
echo.
echo Frontend Configuration:
echo   - Port: 5173 (Vite default)
echo   - Dev URL: http://localhost:5173
echo   - API Base: https://shreefurniture-backend-production.up.railway.app
echo.
echo Admin Panel Configuration:
echo   - Port: 3000 (React default)
echo   - Admin URL: http://localhost:3000
echo.
echo ================================================================================
echo   QUICK START COMMANDS
echo ================================================================================
echo.
echo 1. To start Backend (Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 2. To start Frontend (Terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo 3. To start Admin Panel (Terminal 3):
echo    cd admin
echo    npm run dev
echo.
echo 4. Once running, test the health endpoint:
echo    Frontend: http://localhost:5173
echo    Admin: http://localhost:3000
echo    Backend Health: http://localhost:5000/api/health
echo.
echo ================================================================================
echo   TROUBLESHOOTING
echo ================================================================================
echo.
echo If "Add to Cart" doesn't work:
echo   1. Check Backend API Health: curl http://localhost:5000/api/health
echo   2. Open Browser DevTools (F12) - Console tab
echo   3. Look for request logs (should show 📤 POST /api/cart)
echo   4. Check response status (200 = success, 400/500 = error)
echo.
echo If "Cannot connect to server" error:
echo   1. Ensure backend is running (npm run dev in backend folder)
echo   2. Check if MongoDB is connected in console (✅ MongoDB Connected)
echo   3. Verify CORS is allowing localhost:5173
echo   4. Check API_BASE_URL in frontend/src/utils/api.js
echo.
echo If Login/Register doesn't work:
echo   1. Check if auth routes are loaded (console shows: ✅ Auth routes loaded)
echo   2. Verify JWT_SECRET is set in backend\.env
echo   3. Check token is being saved to localStorage
echo.
echo ================================================================================
echo.
pause
