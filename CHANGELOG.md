# Changelog

Tất cả các thay đổi quan trọng của project này sẽ được ghi lại trong file này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
và project này tuân theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Kế hoạch
- [ ] Thêm tính năng xuất báo cáo PDF
- [ ] Tích hợp thêm nguồn dữ liệu
- [ ] Cải thiện hiệu suất visualization

---

## [1.0.0] - 2025-11-08

### Phát hành chính thức đầu tiên

#### Added (Tính năng mới)
- ✨ Hệ thống Backend Django với REST API
- ✨ Frontend Next.js với TypeScript
- ✨ Tích hợp PostgreSQL database
- ✨ Visualization DTI (Digital Transformation Index) trên bản đồ
- ✨ Thu thập dữ liệu từ World Bank API
- ✨ Dự báo dữ liệu kinh tế với Prophet
- ✨ FastAPI endpoint cho forecast
- ✨ Dashboard phân tích dữ liệu
- ✨ Trang About, Contact, API Docs
- ✨ Interactive map với D3.js
- ✨ Chart visualization với Recharts

#### Backend Features
- Django REST Framework cho API endpoints
- Management command để fetch data từ World Bank
- Model cho lưu trữ dữ liệu kinh tế
- Data processing pipeline
- Prophet forecasting integration
- PostgreSQL database integration

#### Frontend Features
- Next.js 16 với App Router
- TypeScript cho type safety
- Tailwind CSS cho styling
- Interactive DTI map visualization
- Responsive design
- Multiple pages (Home, About, Analysis, Datasets, Visualization, Contact, API Docs)
- D3.js cho map rendering
- Recharts cho data charts

#### Documentation
- README.md với hướng dẫn cơ bản
- INSTALL.md chi tiết
- DEPLOYMENT.md cho production
- CONTRIBUTING.md guidelines
- API documentation page

#### Infrastructure
- Docker support (planned)
- Environment configuration với .env
- Git version control
- Development và production configurations

---

## [0.2.0] - 2025-10-XX (Beta)

### Added
- Beta testing features
- Initial data collection
- Map visualization prototype

### Fixed
- Database connection issues
- Frontend routing problems

---

## [0.1.0] - 2025-09-XX (Alpha)

### Added
- Initial project setup
- Basic Django backend structure
- Next.js frontend initialization
- PostgreSQL database setup
- Basic API endpoints

---

## Ghi chú về Versioning

Chúng tôi sử dụng [SemVer](http://semver.org/) cho việc đánh phiên bản:
- **MAJOR version** (X.0.0): Thay đổi không tương thích ngược
- **MINOR version** (0.X.0): Thêm tính năng mới tương thích ngược
- **PATCH version** (0.0.X): Bug fixes tương thích ngược

## Categories

- `Added` cho tính năng mới
- `Changed` cho thay đổi trong tính năng hiện có
- `Deprecated` cho tính năng sắp bị loại bỏ
- `Removed` cho tính năng đã bị loại bỏ
- `Fixed` cho bug fixes
- `Security` cho các vấn đề bảo mật
