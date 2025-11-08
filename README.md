# OpenDX - Digital Transformation Index Platform

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Tuan04-D/opendx/releases)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Django](https://img.shields.io/badge/django-4.2+-green.svg)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/next.js-16.0+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**OpenDX** là nền tảng phân tích và trực quan hóa chỉ số chuyển đổi số (Digital Transformation Index), cung cấp công cụ mạnh mẽ để thu thập, xử lý và hiển thị dữ liệu kinh tế từ nhiều nguồn khác nhau.

## ✨ Tính năng chính

- 🗺️ **Trực quan hóa DTI trên bản đồ**: Hiển thị chỉ số chuyển đổi số theo vùng địa lý
- 📊 **Dashboard phân tích**: Biểu đồ và insights chi tiết
- 🔮 **Dự báo kinh tế**: Sử dụng Prophet ML để dự đoán xu hướng
- 🌐 **Tích hợp World Bank API**: Thu thập dữ liệu tự động
- 📱 **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- 🚀 **RESTful API**: Dễ dàng tích hợp với các hệ thống khác

## 🚀 Quick Start

### Yêu cầu hệ thống

- Python 3.9+
- Node.js 18+
- PostgreSQL 15+

### Cài đặt nhanh 
## 1. Clone repo
```bash
git clone https://github.com/Tuan04-D/opendx.git
```
cd opendx

## 2. Tạo môi trường ảo Python

python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

## 3. Cài đặt dependencies
pip install --upgrade pip
pip install -r requirements.txt

## 4. Cài đặt PostgreSQL

Cài PostgreSQL (bản 15)
-- đăng nhập psql (cmd hoặc powershwell)
psql -U postgres

-- tạo user
CREATE USER ten_user WITH PASSWORD 'your_password';

-- tạo database
CREATE DATABASE ten_db OWNER ten_user;

-- cấp quyền đầy đủ cho user
GRANT ALL PRIVILEGES ON DATABASE ten_db TO ten_user;


## 5. Tạo file .env
DB_NAME=ten_db
DB_USER=ten_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432


## 6. Cài Next.js (frontend)
cài đặt các packages cho nextjs:
npm install react react-dom next typescript @types/react @types/node
npm install lucide-react recharts d3-geo d3-scale d3-scale-chromatic
npm install --save-dev @types/d3-geo @types/d3-scale @types/d3-scale-chromatic


## 7. Fetch dữ liệu ban đầu
# trở lại thư mục Django
cd ..
python manage.py fetch_data_world_bank

## 8. Chạy Django
python manage.py migrate
python manage.py runserver

## 9. Chạy Next.js
cd frontend
npm run dev


## 10. Truy cập

- **Backend Django**: http://127.0.0.1:8000/
- **Frontend Next.js**: http://localhost:3000/

## 📚 Tài liệu

- **[Installation Guide](INSTALL.md)**: Hướng dẫn cài đặt chi tiết
- **[Deployment Guide](DEPLOYMENT.md)**: Hướng dẫn deploy production
- **[Release Guide](RELEASE_GUIDE.md)**: Hướng dẫn tạo release
- **[Changelog](CHANGELOG.md)**: Lịch sử thay đổi
- **[Contributing](CONTRIBUTING.md)**: Hướng dẫn đóng góp

## 🏗️ Cấu trúc Project

```
opendx/
├── backend/              # Django backend
│   ├── app/             # Main application
│   │   ├── data_collector/  # Data collection scripts
│   │   ├── management/      # Django commands
│   │   └── public_api/      # FastAPI endpoints
│   └── backend/         # Django settings
├── frontend/            # Next.js frontend
│   ├── app/            # App router pages
│   ├── Components/     # React components
│   └── public/         # Static files
├── INSTALL.md          # Installation guide
├── DEPLOYMENT.md       # Deployment guide
├── CHANGELOG.md        # Version history
└── README.md           # This file
```

## 🤝 Contributing

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết chi tiết.

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Authors

- **Tuan04-D** - *Initial work* - [GitHub](https://github.com/Tuan04-D)

## 🙏 Acknowledgments

- World Bank API cho dữ liệu kinh tế
- D3.js cho visualization
- Next.js và Django communities

## 📞 Contact & Support

- **GitHub Issues**: [Create an issue](https://github.com/Tuan04-D/opendx/issues)
- **Email**: your-email@example.com
- **Website**: https://your-website.com

## 🔗 Links

- [GitHub Repository](https://github.com/Tuan04-D/opendx)
- [Releases](https://github.com/Tuan04-D/opendx/releases)
- [Documentation](https://github.com/Tuan04-D/opendx/wiki)

---

Made with ❤️ by Tuan04-D
