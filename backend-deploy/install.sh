#!/bin/bash
# Kumara Hotspot — VPS Auto-Install Script
# Run as: bash install.sh
# Tested on Ubuntu 22.04 LTS

set -e

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
log() { echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }

# Config
DOMAIN="${API_DOMAIN:-api.kumarahotspot.com}"
APP_DIR="$HOME/kumara/backend"
SERVICE_NAME="kumara-backend"

log "=== KUMARA HOTSPOT — VPS DEPLOY ==="
log "Target domain: $DOMAIN"
log "Install path:  $APP_DIR"
echo

# 1. System update
log "1/8 Update system..."
sudo apt update -qq
sudo apt upgrade -y -qq

# 2. Install deps
log "2/8 Install Python, nginx, certbot..."
sudo apt install -y -qq python3 python3-pip python3-venv git nginx certbot python3-certbot-nginx unzip curl gnupg ufw

# 3. Install MongoDB 7
log "3/8 Install MongoDB 7.0..."
if ! command -v mongod &> /dev/null; then
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor --yes
    UBUNTU_CODENAME=$(lsb_release -cs)
    [ "$UBUNTU_CODENAME" = "noble" ] && UBUNTU_CODENAME="jammy"
    echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu $UBUNTU_CODENAME/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
    sudo apt update -qq
    sudo apt install -y -qq mongodb-org
fi
sudo systemctl enable --now mongod

# 4. Setup app folder
log "4/8 Setup app directory..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "server.py" ]; then
    warn "server.py belum ada di $APP_DIR. Upload server.py dan requirements.txt dulu, lalu jalankan ulang script ini."
    exit 1
fi

# 5. Python venv
log "5/8 Install Python dependencies..."
[ ! -d "venv" ] && python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip -q
pip install -q -r requirements.txt

# 6. .env file
if [ ! -f ".env" ]; then
    log "6/8 Generate .env file..."
    JWT_SECRET=$(python3 -c "import secrets; print(secrets.token_hex(48))")
    cat > .env <<EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=kumara_prod
CORS_ORIGINS=*
JWT_SECRET=$JWT_SECRET
ADMIN_EMAIL=admin@kumarahotspot.com
ADMIN_PASSWORD=kumara123!
EOF
    chmod 600 .env
    warn ".env dibuat dengan password default 'kumara123!'. GANTI segera via Admin Panel!"
else
    log "6/8 .env sudah ada, skip."
fi

# 7. systemd service
log "7/8 Setup systemd service..."
sudo tee /etc/systemd/system/${SERVICE_NAME}.service > /dev/null <<EOF
[Unit]
Description=Kumara Hotspot Backend (FastAPI)
After=network.target mongod.service

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$APP_DIR/.env
ExecStart=$APP_DIR/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable ${SERVICE_NAME}
sudo systemctl restart ${SERVICE_NAME}
sleep 3

if ! systemctl is-active --quiet ${SERVICE_NAME}; then
    warn "Backend service gagal start. Cek: sudo journalctl -u ${SERVICE_NAME} -n 50"
    exit 1
fi
log "Backend service running ✓"

# 8. nginx + SSL
log "8/8 Setup nginx + SSL..."
sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
sudo nginx -t
sudo systemctl reload nginx

# UFW
sudo ufw allow 22/tcp >/dev/null 2>&1 || true
sudo ufw allow 'Nginx Full' >/dev/null 2>&1 || true
sudo ufw --force enable >/dev/null 2>&1 || true

# SSL — only if DNS already points here
echo
log "=== Test internal API ==="
sleep 2
RESPONSE=$(curl -s http://127.0.0.1:8001/api/ || echo "FAIL")
echo "$RESPONSE"

echo
warn "==== LANGKAH TERAKHIR (MANUAL) ===="
warn "1. Buat DNS A record di Hostinger:"
warn "   ${DOMAIN}  →  $(curl -s ifconfig.me)"
warn ""
warn "2. Tunggu DNS propagate (cek dengan: dig +short ${DOMAIN})"
warn ""
warn "3. Jalankan SSL setup (HANYA setelah DNS jadi):"
warn "   sudo certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos -m admin@kumarahotspot.com"
warn ""
warn "4. Test dari luar:"
warn "   curl https://${DOMAIN}/api/"
echo

log "=== DEPLOY SELESAI ==="
log "Service status:  sudo systemctl status ${SERVICE_NAME}"
log "Logs realtime:   sudo journalctl -u ${SERVICE_NAME} -f"
log "Restart:         sudo systemctl restart ${SERVICE_NAME}"
log "Admin login:     admin@kumarahotspot.com / kumara123!"
