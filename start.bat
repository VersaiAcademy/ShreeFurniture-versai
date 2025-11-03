@echo off
echo 🚀 Starting Shri Furniture Village Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Check if .env file exists in backend
if not exist "backend\.env" (
    echo ⚠️  .env file not found in backend directory
    echo 📝 Please create a .env file using the env.example template:
    echo    copy backend\env.example backend\.env
    echo    Then edit backend\.env with your actual values
    pause
    exit /b 1
)

echo ✅ Environment file found

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed

REM Install admin dependencies
echo 📦 Installing admin dependencies...
cd ..\admin
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install admin dependencies
    pause
    exit /b 1
)

echo ✅ Admin dependencies installed

REM Start the application
echo 🎯 Starting the application...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo Admin Panel will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start backend
cd ..\backend
start "Backend Server" cmd /k "npm run dev"

REM Start frontend
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

REM Start admin
cd ..\admin
start "Admin Panel" cmd /k "npm run dev"

echo ✅ All servers started successfully!
echo.
echo 🌐 Open your browser and go to:
echo    Frontend: http://localhost:5173
echo    Admin Panel: http://localhost:3000
echo.
pause
