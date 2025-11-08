# Hướng dẫn Deploy OpenDX

## Mục lục
- [Deploy lên Server Linux](#deploy-lên-server-linux)
- [Deploy với Docker](#deploy-với-docker)
- [Deploy lên Cloud Services](#deploy-lên-cloud-services)
- [Cấu hình Production](#cấu-hình-production)

---

## Deploy lên Server Linux (Ubuntu/Debian)

### 1. Chuẩn bị Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài đặt Python và các tools cần thiết
sudo apt install python3 python3-pip python3-venv -y

# Cài đặt PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Cài đặt Node.js (sử dụng NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Cài đặt Nginx
sudo apt install nginx -y
```

### 2. Setup Database

```bash
# Đăng nhập PostgreSQL
sudo -u postgres psql

# Tạo database và user
CREATE DATABASE opendx_db;
CREATE USER opendx_user WITH PASSWORD 'strong_password_here';
ALTER ROLE opendx_user SET client_encoding TO 'utf8';
ALTER ROLE opendx_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE opendx_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE opendx_db TO opendx_user;
\q
```

### 3. Setup Backend

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/Tuan04-D/opendx.git
cd opendx

# Tạo môi trường ảo
python3 -m venv venv
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt
pip install gunicorn

# Tạo file .env production
cd backend/backend
cat > .env << EOF
DB_NAME=opendx_db
DB_USER=opendx_user
DB_PASSWORD=strong_password_here
DB_HOST=localhost
DB_PORT=5432
DEBUG=False
SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
EOF

# Chạy migrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py fetch_data_world_bank
```

### 4. Setup Gunicorn Service

```bash
sudo nano /etc/systemd/system/opendx-backend.service
```

Nội dung file:
```ini
[Unit]
Description=OpenDX Backend (Gunicorn)
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/opendx/backend/backend
Environment="PATH=/var/www/opendx/venv/bin"
ExecStart=/var/www/opendx/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/var/www/opendx/backend/backend.sock \
    backend.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start opendx-backend
sudo systemctl enable opendx-backend
sudo systemctl status opendx-backend
```

### 5. Setup Frontend

```bash
cd /var/www/opendx/frontend

# Cài đặt dependencies
npm install

# Build production
npm run build
```

### 6. Setup PM2 cho Frontend

```bash
# Cài đặt PM2
sudo npm install -g pm2

# Start frontend với PM2
pm2 start npm --name "opendx-frontend" -- start

# Auto start on boot
pm2 startup
pm2 save
```

### 7. Setup Nginx

```bash
sudo nano /etc/nginx/sites-available/opendx
```

Nội dung file:
```nginx
# Backend API
upstream backend {
    server unix:/var/www/opendx/backend/backend.sock fail_timeout=0;
}

# Frontend
upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    # Django Static files
    location /static/ {
        alias /var/www/opendx/backend/backend/staticfiles/;
    }

    # Django Media files
    location /media/ {
        alias /var/www/opendx/backend/backend/media/;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/opendx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Setup SSL với Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Deploy với Docker

### 1. Tạo Dockerfile cho Backend

Tạo file `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY backend/ /app/

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### 2. Tạo Dockerfile cho Frontend

Tạo file `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy project files
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 3. Tạo docker-compose.yml

Tạo file `docker-compose.yml` ở thư mục gốc:
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: opendx_db
      POSTGRES_USER: opendx_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    command: gunicorn backend.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - static_volume:/app/staticfiles
    ports:
      - "8000:8000"
    env_file:
      - backend/backend/.env
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/var/www/static
    depends_on:
      - backend
      - frontend

volumes:
  postgres_data:
  static_volume:
```

### 4. Chạy Docker Compose

```bash
# Build và start
docker-compose up -d --build

# Chạy migrations
docker-compose exec backend python manage.py migrate

# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput

# Fetch data
docker-compose exec backend python manage.py fetch_data_world_bank

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Deploy lên Cloud Services

### Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create opendx-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=your-secret-key

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate
```

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Railway

1. Tạo tài khoản tại [Railway.app](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL service
4. Deploy tự động từ GitHub

---

## Cấu hình Production

### Backend Security Checklist

```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
SECRET_KEY = 'use-environment-variable'

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
```

### Database Backup

```bash
# Backup
pg_dump -U opendx_user opendx_db > backup_$(date +%Y%m%d).sql

# Restore
psql -U opendx_user opendx_db < backup_20240101.sql
```

### Monitoring

```bash
# Install monitoring tools
pip install sentry-sdk

# In settings.py
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

---

## Cập nhật Production

```bash
# Pull latest code
git pull origin main

# Backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart opendx-backend

# Frontend
cd frontend
npm install
npm run build
pm2 restart opendx-frontend
```
