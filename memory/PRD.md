# Radiuslink — RADIUS Billing SaaS PRD

## Problem Statement
"saya mau buat website utk isp dengan tampilan yg modern dan profesional" (originally for Kumara, extended to Radiuslink SaaS product).

User (PT. Pusaka Kreasi Mandiri) needs a marketing site for a NEW product:
- **Radiuslink** = RADIUS Billing SaaS for Hotspot ISPs (Mikrotik/ChilliSpot/pfSense).
- Same parent company as Kumara Hotspot but separate product & domain (radiuslink.id).

## Architecture
- Frontend: React (CRA) + TailwindCSS + Shadcn UI. Dark theme + BLUE accent (HSL 200 100% 50%). Outfit + IBM Plex Sans fonts.
- Backend: FastAPI + Motor (MongoDB). Routes under `/api`, admin under `/api/admin`.
- Deployment target: frontend on Hostinger (`radiuslink.id`), backend on VPS Proxmox (`api.radiuslink.id`).

## Site Structure (public landing)
Header · PromoBanner · Hero · Marquee · Trust (integrations) · Packages (3 SaaS tiers) · Recommender · Coverage (client cities) · Features (9 cards) · Compare · About · Testimonials · Blog · FAQ · Subscribe · Payment · Contact · Footer

## Default Packages (SaaS tiers, seeded via server.py DEFAULT_PACKAGES)
- **Starter** — Rp 99.000/mo · 100 users · 1 Mikrotik router · RADIUS+Hotspot · basic voucher · WA support
- **Pro** — Rp 299.000/mo (Popular) · 500 users · 5 routers · PPPoE+Hotspot · Auto billing · Multi payment gateway · 24/7 support
- **Enterprise** — Rp 999.000/mo · Unlimited · TR-069/ACS · WA Business Official API · Dedicated engineer · SLA 99.9%

## Key Features Section (9)
RADIUS Server · Billing Otomatis · Voucher Generator · Multi-Router Mikrotik · Dashboard Real-time · PPPoE+Hotspot · TR-069/ACS Support · Multi Payment Gateway · WA Bisnis Official

## Bilingual (ID/EN)
- Toggle in header, persisted in `localStorage.radiuslink_lang`
- All copy in `/app/frontend/src/i18n.js`

## Static Fallback
`/app/frontend/src/lib/staticData.js` mirrors seed packages + promo + coverage slugs. All public components try API first, fall back to static on failure/timeout (5s).

## 2026-02 — Radiuslink v1 built
- Full transformation from Kumara codebase → Radiuslink SaaS product
- Kumara source backed up at `/app/frontend/public/downloads/kumara-source-backup.zip` (for future Kumara maintenance)
- Frontend build: `radiuslink-frontend.zip` — upload to Hostinger `public_html` of radiuslink.id
- Backend patch: `radiuslink-backend.zip` — replace `server.py` on VPS + restart `radiuslink-backend` systemd service (or reuse existing kumara-backend service if same VPS is shared)

## Deployment Plan
### Frontend (Hostinger — radiuslink.id)
1. Upload `radiuslink-frontend.zip` to `public_html/`
2. Extract, delete zip
3. Test: https://radiuslink.id

### Backend (VPS Proxmox — api.radiuslink.id)
1. Provision NEW MongoDB database name for Radiuslink (do NOT reuse Kumara's DB)
2. Set env: `MONGO_URL`, `DB_NAME=radiuslink`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS=https://radiuslink.id`
3. Deploy `server.py` + requirements.txt + venv (mirror Kumara backend setup)
4. systemd service listening on 127.0.0.1:8001 (or different port if same VPS)
5. Nginx reverse proxy `api.radiuslink.id` → 127.0.0.1:8001 with SSL

## Backlog / Next
- P0 (waiting for user): actual pricing & feature list for the 3 tiers if different from placeholder
- P0 (waiting for user): client ISP logos → replace generic Coverage grid with real logo grid
- P1: Blog post real content
- P1: Add TR-069/ACS demo video or screenshots
- P2: Interactive product demo / sandbox account
- P2: Customer portal (billing / invoice viewer for Radiuslink users)
- P2: Google Analytics + Meta Pixel conversion tracking
- P2: Endpoint `/api/health` + uptime monitor
