#!/bin/bash
# Build Release Script for OpenDX
# Usage: ./build-release.sh [version]

VERSION=${1:-$(cat VERSION)}
RELEASE_NAME="opendx-v${VERSION}"
BUILD_DIR="dist/${RELEASE_NAME}"

echo "🚀 Building OpenDX Release v${VERSION}"
echo "======================================"

# 1. Clean previous builds
echo "📦 Cleaning previous builds..."
rm -rf dist
mkdir -p "${BUILD_DIR}"

# 2. Copy source files
echo "📋 Copying source files..."
cp -r backend "${BUILD_DIR}/"
cp -r frontend "${BUILD_DIR}/"
cp requirements.txt "${BUILD_DIR}/"
cp README.md "${BUILD_DIR}/"
cp INSTALL.md "${BUILD_DIR}/"
cp DEPLOYMENT.md "${BUILD_DIR}/"
cp CHANGELOG.md "${BUILD_DIR}/"
cp CONTRIBUTING.md "${BUILD_DIR}/"
cp VERSION "${BUILD_DIR}/"
cp package.json "${BUILD_DIR}/"

# 3. Create .env.example
echo "🔧 Creating .env.example..."
cat > "${BUILD_DIR}/backend/backend/.env.example" << EOF
# Database Configuration
DB_NAME=opendx_db
DB_USER=opendx_user
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432

# Django Configuration
DEBUG=False
SECRET_KEY=change-this-to-a-random-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com

# CORS (Optional)
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
EOF

# 4. Clean unnecessary files
echo "🧹 Cleaning unnecessary files..."
find "${BUILD_DIR}" -type f -name "*.pyc" -delete
find "${BUILD_DIR}" -type d -name "__pycache__" -delete
find "${BUILD_DIR}" -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null
find "${BUILD_DIR}" -type d -name ".next" -exec rm -rf {} + 2>/dev/null
find "${BUILD_DIR}" -type f -name ".env" -delete
find "${BUILD_DIR}" -type f -name ".DS_Store" -delete

# 5. Create installation script
echo "📝 Creating installation script..."
cat > "${BUILD_DIR}/install.sh" << 'INSTALL_SCRIPT'
#!/bin/bash
echo "🎯 OpenDX Installation Script"
echo "=============================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL 15 or higher."
    exit 1
fi

echo "✅ All prerequisites are installed"

# Setup backend
echo "🔧 Setting up Backend..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Setup frontend
echo "🔧 Setting up Frontend..."
cd frontend
npm install
cd ..

echo "✅ Installation completed!"
echo ""
echo "Next steps:"
echo "1. Configure PostgreSQL database (see INSTALL.md)"
echo "2. Create .env file in backend/backend/ (use .env.example as template)"
echo "3. Run migrations: cd backend/backend && python manage.py migrate"
echo "4. Fetch initial data: python manage.py fetch_data_world_bank"
echo "5. Start backend: python manage.py runserver"
echo "6. Start frontend: cd frontend && npm run dev"
INSTALL_SCRIPT

chmod +x "${BUILD_DIR}/install.sh"

# 6. Create Windows installation script
echo "📝 Creating Windows installation script..."
cat > "${BUILD_DIR}/install.bat" << 'INSTALL_BAT'
@echo off
echo OpenDX Installation Script for Windows
echo =======================================

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo All prerequisites are installed

REM Setup backend
echo Setting up Backend...
python -m venv venv
call venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Setup frontend
echo Setting up Frontend...
cd frontend
call npm install
cd ..

echo Installation completed!
echo.
echo Next steps:
echo 1. Configure PostgreSQL database (see INSTALL.md)
echo 2. Create .env file in backend\backend\ (use .env.example as template)
echo 3. Run migrations: cd backend\backend && python manage.py migrate
echo 4. Fetch initial data: python manage.py fetch_data_world_bank
echo 5. Start backend: python manage.py runserver
echo 6. Start frontend: cd frontend && npm run dev

pause
INSTALL_BAT

# 7. Create README for release
echo "📝 Creating release README..."
cat > "${BUILD_DIR}/RELEASE_NOTES.md" << EOF
# OpenDX v${VERSION} - Release Notes

## 📦 Release Information

- **Version**: ${VERSION}
- **Release Date**: $(date +%Y-%m-%d)
- **Build Date**: $(date +%Y-%m-%d_%H:%M:%S)

## 📥 Installation

### Quick Start

**Linux/macOS:**
\`\`\`bash
./install.sh
\`\`\`

**Windows:**
\`\`\`batch
install.bat
\`\`\`

### Manual Installation

Please refer to \`INSTALL.md\` for detailed installation instructions.

## 📋 What's Included

- ✅ Backend (Django + PostgreSQL)
- ✅ Frontend (Next.js + TypeScript)
- ✅ Data collection scripts
- ✅ Visualization components
- ✅ Documentation
- ✅ Installation scripts

## 🔗 Links

- **Documentation**: See \`README.md\`
- **Installation Guide**: See \`INSTALL.md\`
- **Deployment Guide**: See \`DEPLOYMENT.md\`
- **Changelog**: See \`CHANGELOG.md\`
- **Contributing**: See \`CONTRIBUTING.md\`

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/Tuan04-D/opendx/issues
- Documentation: Check included docs

## ⚖️ License

See LICENSE file for details.
EOF

# 8. Create compressed archive
echo "🗜️  Creating compressed archives..."
cd dist
tar -czf "${RELEASE_NAME}.tar.gz" "${RELEASE_NAME}"
zip -r "${RELEASE_NAME}.zip" "${RELEASE_NAME}" > /dev/null

# 9. Generate checksums
echo "🔐 Generating checksums..."
sha256sum "${RELEASE_NAME}.tar.gz" > "${RELEASE_NAME}.tar.gz.sha256"
sha256sum "${RELEASE_NAME}.zip" > "${RELEASE_NAME}.zip.sha256"

cd ..

# 10. Summary
echo ""
echo "✅ Build completed successfully!"
echo "================================"
echo "📦 Release: ${RELEASE_NAME}"
echo "📁 Location: dist/"
echo ""
echo "Files created:"
echo "  - ${RELEASE_NAME}.tar.gz"
echo "  - ${RELEASE_NAME}.zip"
echo "  - ${RELEASE_NAME}.tar.gz.sha256"
echo "  - ${RELEASE_NAME}.zip.sha256"
echo ""
echo "📤 Ready to upload to GitHub Releases!"
