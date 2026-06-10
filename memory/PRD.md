# Kumara Hotspot — ISP Website PRD

## Problem Statement
"saya mau buat website utk isp dengan tampilam yg modern dan profesional"

User specs:
- Brand: Kumara Hotspot (under PT. Pusaka Kreasi Mandiri)
- Tagline: "High Speed Internet Unlimited"
- Bilingual ID + EN with switcher
- Logo provided

## Architecture
- Frontend: React (CRA) + TailwindCSS + Shadcn UI + sonner toasts. Dark theme with orange (#FF5E00) brand. Outfit (headings) + IBM Plex Sans (body).
- Backend: FastAPI + Motor (MongoDB). Routes under `/api`.
- DB: MongoDB collections — `subscriptions`, `contact_messages`, `coverage_checks`.

## Core Requirements (Static)
- Single-page company-profile landing site
- Sections: Header, Hero, Marquee, Packages, Coverage checker, Features, About, Testimonials, FAQ, Subscribe form, Contact, Footer, Floating WhatsApp
- Bilingual content (ID/EN) with persisted preference (localStorage `kumara_lang`)

## What's Been Implemented (2025-12)
- Backend endpoints:
  - GET /api/packages (4 plans: home-basic, home-pro, business-pro, dedicated-1g)
  - POST /api/coverage/check (mock against 12 supported Indonesian cities)
  - POST/GET /api/subscriptions
  - POST/GET /api/contact
- Frontend:
  - Bilingual i18n provider (`/app/frontend/src/i18n.js`)
  - All sections built and tested (100% backend + frontend per testing_agent_v3 iteration_1)
  - WhatsApp deep-link CTAs (number is MOCKED placeholder 6281234567890)
  - Newsletter form is LOCAL ONLY (MOCKED, no backend wiring)
- Verified flows: language switch persists, packages filter+select, coverage check both branches, subscription POST, FAQ accordion, mobile menu.

## Mocked / Placeholder Items
- WhatsApp number `6281234567890` — update with real number when ready
- Newsletter form has no backend (intentional, frontend-only)
- Testimonials are static client-side content
- Coverage check is keyword-based against `SUPPORTED_AREAS` list

## Backlog / Next Action Items
- P1: Real WhatsApp number, contact info, office address
- P1: Newsletter backend (e.g., Resend) + admin to view subscriptions
- P2: Admin dashboard to manage leads (subscriptions / contact messages)
- P2: Customer portal (billing, paket aktif, invoice)
- P2: Real speed test integration
- P2: News/Blog CMS
- P2: Google Maps integration for coverage area visualization

## 2026-02 — Static Fallback Build (verifikasi aplikasi)
- All public landing-page sections now consume STATIC data from `/app/frontend/src/lib/staticData.js` (no API calls):
  - Packages, Recommender, Subscribe -> `STATIC_PACKAGES` (10 paket: Bronze, Silver, Gold, New Gold 1/2, Platinum 1/2/3, EDUKASI 100, Business)
  - PromoBanner -> `STATIC_PROMO` (defaults)
  - Coverage check -> client-side match against `STATIC_COVERED_SLUGS`
  - Subscribe form: submit sekarang membuka WhatsApp deep-link (tidak hit backend)
- Build output: `/app/frontend/build/` dan zip: `/app/kumara-hotspot-build.zip` (+ mirror di `/app/frontend/public/downloads/kumara-hotspot-build.zip`)
- ⚠️ Catatan EDUKASI 100: spec di-hardcode dengan asumsi 100 Mbps / Rp 100.000 / kategori premium / khusus institusi pendidikan. Jika berbeda, beri tahu untuk update.
- Admin Panel (`/admin`) tetap dinamis lewat backend — perubahan dari admin tidak akan terlihat di landing page sampai data statis dibuka kembali.

## Next Action Items (Post-Verifikasi)
- P1: Re-enable dynamic fetching di Packages / Recommender / Subscribe / PromoBanner / Coverage setelah backend VPS stabil. Tahapnya: kembalikan `api.get/post` calls + tetap pakai `STATIC_*` sebagai fallback `.catch(() => setX(STATIC_X))`.
- P1: Pastikan EDUKASI 100 di DB sinkron dengan hardcode (atau update hardcode setelah dapat angka final).

