
# Hướng dẫn cài đặt dự án OpenDX
Dự án này yêu cầu bạn đã cài nextjs trên máy 
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

Backend Django: http://127.0.0.1:8000/

Frontend Next.js: http://localhost:3000/