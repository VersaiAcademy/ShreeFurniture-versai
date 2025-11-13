#!/bin/bash or cmd equivalent
# Backend Connection Test Script
# Run this to verify all connections are working

echo "=========================================="
echo "SHREE FURNITURE - CONNECTION TEST"
echo "=========================================="
echo ""

# Test 1: Backend Health Check
echo "📍 Test 1: Backend Health Check"
echo "   Testing: http://localhost:5000/api/health"

for /f %%A in ('powershell -Command "try { (Invoke-WebRequest -Uri 'http://localhost:5000/api/health' -UseBasicParsing).StatusCode } catch { Write-Host 'ERROR' }"') do (
    if %%A equ 200 (
        echo "   ✅ Backend is running and responding (Status: 200)"
    ) else if %%A equ ERROR (
        echo "   ❌ Backend is NOT running. Start it with: cd backend && npm run dev"
    ) else (
        echo "   ⚠️  Unexpected status: %%A"
    )
)
echo ""

# Test 2: MongoDB Connection (check backend logs)
echo "📍 Test 2: MongoDB Connection"
echo "   Check backend console for: ✅ MongoDB Connected"
echo "   If not shown, verify MONGO_URI in backend/.env"
echo ""

# Test 3: Frontend .env Configuration
echo "📍 Test 3: Frontend Configuration"
if exist frontend\.env (
    echo "   ✅ frontend\.env exists"
    findstr /M "VITE_API_BASE_URL" frontend\.env >nul
    if !errorlevel! equ 0 (
        echo "   ✅ VITE_API_BASE_URL configured"
    ) else (
        echo "   ❌ VITE_API_BASE_URL not found in frontend\.env"
    )
) else (
    echo "   ❌ frontend\.env not found"
)
echo ""

# Test 4: Backend .env Configuration
echo "📍 Test 4: Backend Configuration"
if exist backend\.env (
    echo "   ✅ backend\.env exists"
    findstr /M "MONGO_URI" backend\.env >nul
    if !errorlevel! equ 0 (
        echo "   ✅ MONGO_URI configured"
    ) else (
        echo "   ❌ MONGO_URI not found in backend\.env"
    )
) else (
    echo "   ❌ backend\.env not found"
)
echo ""

# Test 5: Dependencies Check
echo "📍 Test 5: Dependencies"
if exist backend\node_modules (
    echo "   ✅ Backend node_modules installed"
) else (
    echo "   ❌ Backend node_modules missing - run: cd backend && npm install"
)

if exist frontend\node_modules (
    echo "   ✅ Frontend node_modules installed"
) else (
    echo "   ❌ Frontend node_modules missing - run: cd frontend && npm install"
)
echo ""

echo "=========================================="
echo "TEST COMPLETE"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Start Backend:  cd backend && npm run dev"
echo "2. Start Frontend: cd frontend && npm run dev"
echo "3. Open: http://localhost:5173"
echo "4. Test Add to Cart (requires login first)"
echo ""
