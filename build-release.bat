@echo off
REM Build Release Script for OpenDX (Windows)
REM Usage: build-release.bat [version]

setlocal enabledelayedexpansion

REM Get version
if "%1"=="" (
    set /p VERSION=<VERSION
) else (
    set VERSION=%1
)

set RELEASE_NAME=opendx-v%VERSION%
set BUILD_DIR=dist\%RELEASE_NAME%

echo ============================================
echo Building OpenDX Release v%VERSION%
echo ============================================
echo.

REM 1. Clean previous builds
echo [1/8] Cleaning previous builds...
if exist dist rmdir /s /q dist
mkdir "%BUILD_DIR%"

REM 2. Copy source files
echo [2/8] Copying source files...
xcopy /E /I /Q backend "%BUILD_DIR%\backend\" > nul
xcopy /E /I /Q frontend "%BUILD_DIR%\frontend\" > nul
copy requirements.txt "%BUILD_DIR%\" > nul
copy README.md "%BUILD_DIR%\" > nul
copy INSTALL.md "%BUILD_DIR%\" > nul
copy DEPLOYMENT.md "%BUILD_DIR%\" > nul
copy CHANGELOG.md "%BUILD_DIR%\" > nul
copy CONTRIBUTING.md "%BUILD_DIR%\" > nul
copy VERSION "%BUILD_DIR%\" > nul
copy package.json "%BUILD_DIR%\" > nul

REM 3. Create .env.example
echo [3/8] Creating .env.example...
(
echo # Database Configuration
echo DB_NAME=opendx_db
echo DB_USER=opendx_user
echo DB_PASSWORD=your_password_here
echo DB_HOST=localhost
echo DB_PORT=5432
echo.
echo # Django Configuration
echo DEBUG=False
echo SECRET_KEY=change-this-to-a-random-secret-key
echo ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com
echo.
echo # CORS ^(Optional^)
echo CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
) > "%BUILD_DIR%\backend\backend\.env.example"

REM 4. Clean unnecessary files
echo [4/8] Cleaning unnecessary files...
del /s /q "%BUILD_DIR%\*.pyc" > nul 2>&1
for /d /r "%BUILD_DIR%" %%d in (__pycache__) do @if exist "%%d" rmdir /s /q "%%d" > nul 2>&1
for /d /r "%BUILD_DIR%" %%d in (node_modules) do @if exist "%%d" rmdir /s /q "%%d" > nul 2>&1
for /d /r "%BUILD_DIR%" %%d in (.next) do @if exist "%%d" rmdir /s /q "%%d" > nul 2>&1
del /s /q "%BUILD_DIR%\*.env" > nul 2>&1
del /s /q "%BUILD_DIR%\.DS_Store" > nul 2>&1

REM 5. Create installation script for Linux/Mac
echo [5/8] Creating installation scripts...
(
echo #!/bin/bash
echo echo "OpenDX Installation Script"
echo echo "=========================="
echo.
echo # Check Python
echo if ! command -v python3 ^&^> /dev/null; then
echo     echo "Python 3 is not installed. Please install Python 3.9 or higher."
echo     exit 1
echo fi
echo.
echo # Check Node.js
echo if ! command -v node ^&^> /dev/null; then
echo     echo "Node.js is not installed. Please install Node.js 18 or higher."
echo     exit 1
echo fi
echo.
echo # Check PostgreSQL
echo if ! command -v psql ^&^> /dev/null; then
echo     echo "PostgreSQL is not installed. Please install PostgreSQL 15 or higher."
echo     exit 1
echo fi
echo.
echo echo "All prerequisites are installed"
echo.
echo # Setup backend
echo echo "Setting up Backend..."
echo python3 -m venv venv
echo source venv/bin/activate
echo pip install --upgrade pip
echo pip install -r requirements.txt
echo.
echo # Setup frontend
echo echo "Setting up Frontend..."
echo cd frontend
echo npm install
echo cd ..
echo.
echo echo "Installation completed!"
) > "%BUILD_DIR%\install.sh"

REM 6. Create Windows installation script
(
echo @echo off
echo echo OpenDX Installation Script for Windows
echo echo =======================================
echo.
echo REM Check Python
echo python --version ^>nul 2^>^&1
echo if errorlevel 1 ^(
echo     echo Python is not installed. Please install Python 3.9 or higher.
echo     exit /b 1
echo ^)
echo.
echo REM Check Node.js
echo node --version ^>nul 2^>^&1
echo if errorlevel 1 ^(
echo     echo Node.js is not installed. Please install Node.js 18 or higher.
echo     exit /b 1
echo ^)
echo.
echo echo All prerequisites are installed
echo.
echo REM Setup backend
echo echo Setting up Backend...
echo python -m venv venv
echo call venv\Scripts\activate
echo python -m pip install --upgrade pip
echo pip install -r requirements.txt
echo.
echo REM Setup frontend
echo echo Setting up Frontend...
echo cd frontend
echo call npm install
echo cd ..
echo.
echo echo Installation completed!
echo echo.
echo echo Next steps:
echo echo 1. Configure PostgreSQL database ^(see INSTALL.md^)
echo echo 2. Create .env file in backend\backend\ ^(use .env.example as template^)
echo echo 3. Run migrations: cd backend\backend ^&^& python manage.py migrate
echo echo 4. Fetch initial data: python manage.py fetch_data_world_bank
echo echo 5. Start backend: python manage.py runserver
echo echo 6. Start frontend: cd frontend ^&^& npm run dev
echo.
echo pause
) > "%BUILD_DIR%\install.bat"

REM 7. Create release notes
echo [6/8] Creating release notes...
(
echo # OpenDX v%VERSION% - Release Notes
echo.
echo ## Release Information
echo.
echo - **Version**: %VERSION%
echo - **Release Date**: %date%
echo - **Platform**: Windows/Linux/macOS
echo.
echo ## Installation
echo.
echo ### Quick Start
echo.
echo **Linux/macOS:**
echo ```bash
echo ./install.sh
echo ```
echo.
echo **Windows:**
echo ```batch
echo install.bat
echo ```
echo.
echo ### Manual Installation
echo.
echo Please refer to `INSTALL.md` for detailed installation instructions.
echo.
echo ## What's Included
echo.
echo - Backend ^(Django + PostgreSQL^)
echo - Frontend ^(Next.js + TypeScript^)
echo - Data collection scripts
echo - Visualization components
echo - Documentation
echo - Installation scripts
echo.
echo ## Links
echo.
echo - **Documentation**: See `README.md`
echo - **Installation Guide**: See `INSTALL.md`
echo - **Deployment Guide**: See `DEPLOYMENT.md`
echo - **Changelog**: See `CHANGELOG.md`
echo.
echo ## Support
echo.
echo For issues and questions:
echo - GitHub Issues: https://github.com/Tuan04-D/opendx/issues
) > "%BUILD_DIR%\RELEASE_NOTES.md"

REM 8. Create ZIP archive
echo [7/8] Creating ZIP archive...
powershell -Command "Compress-Archive -Path '%BUILD_DIR%' -DestinationPath 'dist\%RELEASE_NAME%.zip' -Force"

REM 9. Generate checksum
echo [8/8] Generating checksum...
powershell -Command "Get-FileHash 'dist\%RELEASE_NAME%.zip' -Algorithm SHA256 | Select-Object Hash | Format-Table -HideTableHeaders | Out-File 'dist\%RELEASE_NAME%.zip.sha256' -Encoding ASCII"

echo.
echo ============================================
echo Build completed successfully!
echo ============================================
echo.
echo Release: %RELEASE_NAME%
echo Location: dist\
echo.
echo Files created:
echo   - %RELEASE_NAME%.zip
echo   - %RELEASE_NAME%.zip.sha256
echo.
echo Ready to upload to GitHub Releases!
echo.
pause
