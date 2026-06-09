KUMARA HOTSPOT - VPS DEPLOY PACKAGE
====================================

1. Upload semua file ini ke VPS:
   - server.py
   - requirements.txt
   - install.sh

   Cara upload (dari komputer lokal):
   scp server.py requirements.txt install.sh webkumara@103.179.252.243:~/kumara/backend/

   Atau download zip ini ke VPS langsung:
   ssh webkumara@103.179.252.243
   mkdir -p ~/kumara/backend && cd ~/kumara/backend
   wget https://network-manager-19.preview.emergentagent.com/downloads/kumara-backend-deploy.zip
   unzip kumara-backend-deploy.zip

2. Jalankan install:
   bash install.sh

3. Setup DNS A record di Hostinger:
   api.kumarahotspot.com -> 103.179.252.243

4. Setelah DNS propagate (5-30 menit), aktifkan SSL:
   sudo certbot --nginx -d api.kumarahotspot.com --non-interactive --agree-tos -m admin@kumarahotspot.com

5. Test:
   curl https://api.kumarahotspot.com/api/

6. Kabari saya kalau backend live, saya rebuild frontend yang point ke api.kumarahotspot.com
