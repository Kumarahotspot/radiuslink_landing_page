import React, { createContext, useContext, useEffect, useState } from "react";

export const translations = {
  id: {
    brand: "Radiuslink",
    parent: "PT. Pusaka Kreasi Mandiri",
    tagline: "RADIUS Billing untuk Hotspot ISP",
    nav: {
      home: "Beranda",
      packages: "Paket",
      coverage: "Klien",
      payment: "Pembayaran",
      about: "Tentang",
      contact: "Kontak",
      subscribe: "Daftar Sekarang"
    },
    hero: {
      eyebrow: "Radiuslink · Smart Billing untuk ISP",
      compliance_badge: "Auto Hitung BHP & USO · Sesuai regulasi Komdigi",
      title_1: "RADIUS Billing",
      title_2: "untuk Hotspot ISP",
      title_3: "seluruh Indonesia.",
      desc: "Platform manajemen PPPoE & Hotspot dengan RADIUS server, billing otomatis, voucher generator, dan integrasi Mikrotik multi-router, multi agent voucher, multi cabang. Cocok untuk ISP skala besar & kecil.",
      cta_primary: "Lihat Paket",
      cta_secondary: "Konsultasi Gratis",
      stat_speed: "10.000+ User",
      stat_uptime: "99,9% Uptime",
      stat_support: "Support 24/7",
      stat_cities: "50+ ISP Klien",
      visual_label: "User Terkelola",
      visual_number: "10K+",
      visual_caption: "Pelanggan Aktif",
      visual_live: "Live · 99,9% uptime",
      visual_badge_1: "Router",
      visual_badge_2: "ISP Klien"
    },
    marquee: ["RADIUS Server", "Billing Otomatis", "Voucher Generator", "Multi-Router Mikrotik", "PPPoE + Hotspot", "TR069/ACS", "Payment Gateway", "WA Bisnis Official"],
    promo: {
      tag: "Promo Peluncuran",
      text: "Coba GRATIS 14 hari — semua fitur unlocked. Tanpa kartu kredit.",
      cta: "Coba Gratis"
    },
    trust: {
      eyebrow: "Terintegrasi & Kompatibel",
      title: "Kompatibel dengan router & sistem hotspot populer.",
      badges: [
        { name: "Mikrotik", desc: "Full integrasi RouterOS via API + RADIUS" },
        { name: "ChilliSpot", desc: "Captive portal ChilliSpot & CoovaChilli" },
        { name: "pfSense", desc: "Kompatibel dengan pfSense & OPNsense" },
        { name: "TR-069/ACS", desc: "Auto-provisioning ONT/CPE via TR-069" }
      ]
    },
    recommender: {
      eyebrow: "Rekomendasi Paket",
      title: "Butuh paket yang mana? 5 detik saja.",
      desc: "Geser slider sesuai skala jaringan Anda — kami sarankan paket paling pas.",
      pppoe_label: "Jumlah Pelanggan PPPoE",
      router_label: "Jumlah Router Mikrotik",
      stat_pppoe: "Kapasitas PPPoE",
      stat_routers: "Kapasitas Router",
      result_label: "Rekomendasi untuk Anda",
      cta: "Pilih Paket Ini",
      or_whatsapp: "atau chat via WhatsApp →"
    },
    compare: {
      eyebrow: "Bandingkan",
      title: "Kenapa Radiuslink, bukan yang lain?",
      headers: ["Fitur", "Radiuslink", "Platform Lain"],
      rows: [
        ["RADIUS Server bawaan", "✓ Ya", "△ Perlu setup manual"],
        ["Voucher Generator massal", "✓ Ya, tanpa batas", "✗ Terbatas atau berbayar tambahan"],
        ["Integrasi Multi-Router Mikrotik", "✓ Unlimited router", "△ Dibatasi lisensi"],
        ["Payment Gateway (QRIS/VA/E-wallet)", "✓ Multi provider", "△ Hanya 1–2"],
        ["WhatsApp Bisnis Official", "✓ Terintegrasi", "✗ Manual / WA Web"],
        ["TR-069 / ACS Support", "✓ Bawaan", "✗ Tidak ada"],
        ["Support engineer 24/7", "✓ Ya", "△ Ticket only"]
      ]
    },
    blog: {
      eyebrow: "Blog & Tutorial",
      title: "Tutorial, tips, dan update Radiuslink.",
      read_more: "Baca selengkapnya",
      posts: [
        { tag: "Tutorial", title: "Setup RADIUS Server di Mikrotik dalam 10 Menit", excerpt: "Langkah-langkah konfigurasi RouterOS agar terhubung ke Radiuslink lewat RADIUS + API." },
        { tag: "Tips", title: "Optimasi Billing Otomatis untuk RTRWnet Besar", excerpt: "Cara set jadwal invoice, reminder WA, dan isolir otomatis yang tidak bikin pelanggan komplain." },
        { tag: "Update", title: "Dukungan TR-069/ACS Kini Bawaan di Radiuslink", excerpt: "Auto-provisioning ONT & CPE tanpa datang ke lokasi — hemat waktu teknisi Anda." }
      ]
    },
    status: {
      label: "Status Platform",
      operational: "Semua sistem normal",
      degraded: "Performa menurun",
      outage: "Gangguan"
    },
    packages: {
      eyebrow: "Paket Berlangganan",
      title: "Pilih paket sesuai skala jaringan Anda",
      desc: "Semua paket sudah termasuk RADIUS server, GenieACS, dashboard real-time, dan support 24/7. Upgrade & downgrade fleksibel bulanan.",
      filter_all: "Semua",
      filter_home: "Individu",
      filter_premium: "Bisnis",
      filter_business: "Enterprise",
      popular: "Paling Populer",
      per_month: "/ bulan",
      contact_us: "Hubungi Kami",
      cta_subscribe: "Pilih Paket",
      cta_contact: "Hubungi Kami",
      mbps: "User"
    },
    coverage: {
      eyebrow: "Pelanggan Berharga Kami",
      title: "Ribuan penyedia internet mempercayai Radiuslink.",
      desc: "Ribuan penyedia internet mempercayai kami untuk menggerakkan jaringan mereka. Bergabunglah dengan komunitas kami yang terus berkembang.",
      integrations_title: "Terintegrasi dengan yang terbaik",
      integrations_desc: "Terhubung dengan mulus dengan perangkat keras dan lunak favorit Anda.",
      status_online: "Online",
      status_offline: "Offline",
      pppoe_label: "Pelanggan PPPoE",
      hotspot_label: "Pengguna Hotspot",
      placeholder: "Contoh: Jakarta, Surabaya, Medan",
      cta: "Cek Sekarang",
      checking: "Mengecek...",
      install_label: "Estimasi onboarding"
    },
    features: {
      eyebrow: "Mengapa Radiuslink",
      title_prefix: "Mengapa Memilih",
      title_brand: "Radiuslink",
      desc: "Rasakan perbedaannya dengan fitur yang dirancang untuk meningkatkan layanan internet Anda.",
      list: [
        { title: "Platform Unggulan", desc: "Platform manajemen komprehensif yang dirancang khusus untuk ISP modern." },
        { title: "Pembatasan RADIUS", desc: "Kontrol pembatasan waktu sesi dan volume data tingkat lanjut." },
        { title: "Integrasi GenieACS", desc: "Integrasi mulus dengan GenieACS untuk manajemen perangkat jarak jauh." },
        { title: "Multi Koneksi / Hybrid", desc: "Koneksi dapat menggunakan API Mikrotik, RADIUS, atau kombinasi RADIUS & API." },
        { title: "Kecepatan Sesuai Permintaan", desc: "Izinkan pelanggan meningkatkan kecepatan koneksi mereka secara sementara (speed boost)." },
        { title: "Pemetaan Jaringan", desc: "Representasi visual cakupan jaringan dan lokasi klien Anda dalam satu peta." },
        { title: "Faktur Otomatis", desc: "Buat dan kirim faktur secara otomatis ke pelanggan via email & WhatsApp." },
        { title: "Gerbang Pembayaran", desc: "Dukungan terintegrasi untuk berbagai gerbang & metode pembayaran (QRIS, VA, e-wallet)." },
        { title: "Aplikasi White Label", desc: "Aplikasi seluler bermerek khusus untuk pelanggan ISP Anda — bukan brand kami." },
        { title: "Dukungan Multi-Wilayah", desc: "Kelola beberapa cabang atau wilayah operasional dari satu dasbor terpusat." },
        { title: "Transparansi", desc: "Transparansi penuh dalam log, data penggunaan, dan aktivitas sistem — audit-ready." },
        { title: "Migrasi Mudah", desc: "Alat migrasi untuk pindah dari platform billing lain dengan aman & minim downtime." }
      ]
    },
    testimonials: {
      eyebrow: "Suara Pengguna",
      title: "Dipercaya operator dari kota hingga pelosok desa."
    },
    payment: {
      eyebrow: "Cara Berlangganan",
      title: "Bayar Radiuslink dengan cara paling nyaman.",
      desc: "Berlangganan bulanan atau tahunan. Bayar via berbagai kanal — virtual account bank, QRIS, hingga e-wallet.",
      categories: [
        { name: "Virtual Account Bank", items: ["Mandiri", "BRI", "BSI", "BNI", "BCA", "Permata Bank", "CIMB Niaga", "& bank lainnya"] },
        { name: "QRIS", items: ["Semua aplikasi pembayaran berlogo QRIS", "Scan & bayar instan"] },
        { name: "Gerai Retail", items: ["Alfamart", "Indomaret", "& jaringan minimarket lainnya"] },
        { name: "E-Wallet", items: ["OVO", "LinkAja", "GoPay", "DANA", "ShopeePay", "& e-wallet lainnya"] }
      ],
      note: "Diskon 20% untuk pembayaran tahunan. Free onboarding & migrasi data dari sistem lama."
    },
    about: {
      eyebrow: "Tentang Kami",
      title: "Dibangun oleh operator ISP untuk operator ISP.",
      p1: "Radiuslink adalah produk RADIUS Billing dari PT. Pusaka Kreasi Mandiri — perusahaan yang juga mengoperasikan ISP Kumara Hotspot. Setiap fitur di Radiuslink lahir dari kebutuhan nyata operator jaringan di lapangan.",
      p2: "Kami tahu betapa capeknya nyari billing yang cocok, ngoprek script sendiri, atau bayar lisensi mahal untuk fitur dasar. Radiuslink hadir supaya operator jaringan bisa fokus ngasih layanan terbaik ke pelanggan — tanpa pusing infrastruktur software.",
      stats: [
        { label: "ISP klien aktif", value: "50+" },
        { label: "User terkelola", value: "10.000+" },
        { label: "Router terhubung", value: "200+" },
        { label: "Uptime platform", value: "99,9%" }
      ]
    },
    faq: {
      eyebrow: "Pertanyaan Umum",
      title: "Pertanyaan yang sering diajukan",
      items: [
        { q: "Apakah kompatibel dengan Mikrotik saya?", a: "Ya. Radiuslink kompatibel dengan semua Mikrotik RouterOS v6.x dan v7.x. Kami terhubung via API + RADIUS." },
        { q: "Berapa lama proses migrasi dari billing lama?", a: "Umumnya 1–3 hari kerja. Tim kami bantu import data pelanggan, paket, dan invoice yang berjalan." },
        { q: "Apakah ada trial gratis?", a: "Ya, trial 14 hari gratis dengan semua fitur unlocked. Tidak perlu kartu kredit." },
        { q: "Data pelanggan saya aman?", a: "Data disimpan di server Indonesia, terenkripsi, backup harian otomatis. Sesuai UU PDP." },
        { q: "Bagaimana kalau ada masalah teknis?", a: "Support 24/7 via WhatsApp dan tiket. Untuk Enterprise, ada dedicated engineer + response time <1 jam." }
      ]
    },
    subscribe: {
      eyebrow: "Formulir Pendaftaran",
      title: "Mulai kelola jaringan Anda dalam 60 detik.",
      desc: "Isi formulir di bawah, tim kami akan menghubungi Anda dalam 1×24 jam untuk demo & onboarding.",
      name: "Nama Lengkap",
      phone: "Nomor WhatsApp",
      email: "Email",
      address: "Nama ISP / Perusahaan",
      city: "Kota Operasional",
      package: "Pilih Paket",
      notes: "Jumlah user & router (opsional)",
      submit: "Kirim Pendaftaran",
      submitting: "Mengirim...",
      success_title: "Pendaftaran terkirim!",
      success_desc: "Tim Radiuslink akan menghubungi Anda segera untuk demo.",
      fallback_title: "Terkirim via WhatsApp",
      fallback_desc: "Server sedang sibuk — data pendaftaran Anda dikirim langsung via WhatsApp. Tim kami akan segera merespon.",
      error: "Gagal mengirim. Coba lagi.",
      select_placeholder: "— Pilih paket —"
    },
    contact: {
      eyebrow: "Hubungi Kami",
      title: "Tim engineer kami siap bantu, 24 jam sehari.",
      whatsapp: "Chat WhatsApp",
      email: "Email",
      phone: "Telepon",
      address: "Kantor Pusat",
      hours: "Jam Operasional",
      hours_value: "24/7 — Support teknis · 08.00–22.00 — Sales & billing"
    },
    footer: {
      desc: "Radiuslink — RADIUS Billing untuk Hotspot ISP dari PT. Pusaka Kreasi Mandiri. Kelola hotspot & PPPoE dengan satu platform.",
      product: "Produk",
      company: "Perusahaan",
      legal: "Legal",
      newsletter: "Newsletter",
      newsletter_desc: "Dapatkan tutorial, tips, dan update fitur langsung ke email Anda.",
      newsletter_placeholder: "Email Anda",
      newsletter_cta: "Daftar",
      copyright: "© 2026 PT. Pusaka Kreasi Mandiri. Seluruh hak cipta dilindungi.",
      links_product: ["Fitur", "Paket", "Integrasi", "Roadmap"],
      links_company: ["Tentang", "Blog", "Karier", "Kontak"],
      links_legal: ["Syarat Layanan", "Kebijakan Privasi", "SLA", "Acceptable Use"]
    }
  },
  en: {
    brand: "Radiuslink",
    parent: "PT. Pusaka Kreasi Mandiri",
    tagline: "RADIUS Billing for Hotspot ISPs",
    nav: {
      home: "Home",
      packages: "Pricing",
      coverage: "Clients",
      payment: "Payment",
      about: "About",
      contact: "Contact",
      subscribe: "Get Started"
    },
    hero: {
      eyebrow: "Radiuslink · Smart Billing for ISPs",
      compliance_badge: "Auto BHP & USO Reporting · Komdigi-compliant",
      title_1: "RADIUS Billing",
      title_2: "for Hotspot ISPs,",
      title_3: "made in Indonesia.",
      desc: "PPPoE & Hotspot management platform with a built-in RADIUS server, automated billing, voucher generator, multi-router Mikrotik integration, multi-agent voucher, and multi-branch support. Perfect for both large-scale and small ISPs.",
      cta_primary: "See Pricing",
      cta_secondary: "Free Consultation",
      stat_speed: "10,000+ Users",
      stat_uptime: "99.9% Uptime",
      stat_support: "24/7 Support",
      stat_cities: "50+ ISP Clients",
      visual_label: "Users Managed",
      visual_number: "10K+",
      visual_caption: "Active Users",
      visual_live: "Live · 99.9% uptime",
      visual_badge_1: "Routers",
      visual_badge_2: "ISP Clients"
    },
    marquee: ["RADIUS Server", "Auto Billing", "Voucher Generator", "Multi-Router Mikrotik", "PPPoE + Hotspot", "TR069/ACS", "Payment Gateway", "Official WA Business"],
    promo: {
      tag: "Launch Promo",
      text: "Try FREE for 14 days — all features unlocked. No credit card required.",
      cta: "Try Free"
    },
    trust: {
      eyebrow: "Integrated & Compatible",
      title: "Works with popular routers & hotspot systems.",
      badges: [
        { name: "Mikrotik", desc: "Full RouterOS integration via API + RADIUS" },
        { name: "ChilliSpot", desc: "ChilliSpot & CoovaChilli captive portal" },
        { name: "pfSense", desc: "Compatible with pfSense & OPNsense" },
        { name: "TR-069/ACS", desc: "ONT/CPE auto-provisioning via TR-069" }
      ]
    },
    recommender: {
      eyebrow: "Plan Recommender",
      title: "Which plan fits? 5 seconds.",
      desc: "Slide to match your network scale — we suggest the best fit.",
      pppoe_label: "PPPoE Customers",
      router_label: "Mikrotik Routers",
      stat_pppoe: "PPPoE Capacity",
      stat_routers: "Router Capacity",
      result_label: "Recommended for you",
      cta: "Pick This Plan",
      or_whatsapp: "or chat via WhatsApp →"
    },
    compare: {
      eyebrow: "Compare",
      title: "Why Radiuslink, not the rest?",
      headers: ["Feature", "Radiuslink", "Other Platforms"],
      rows: [
        ["Built-in RADIUS server", "✓ Yes", "△ Manual setup"],
        ["Bulk voucher generator", "✓ Unlimited", "✗ Limited or paid add-on"],
        ["Multi-router Mikrotik", "✓ Unlimited routers", "△ License-limited"],
        ["Payment Gateway (QRIS/VA/E-wallet)", "✓ Multiple providers", "△ 1–2 only"],
        ["Official WhatsApp Business", "✓ Integrated", "✗ Manual / WA Web"],
        ["TR-069 / ACS support", "✓ Built-in", "✗ None"],
        ["24/7 engineer support", "✓ Yes", "△ Ticket only"]
      ]
    },
    blog: {
      eyebrow: "Blog & Tutorials",
      title: "Tutorials, tips, and Radiuslink updates.",
      read_more: "Read more",
      posts: [
        { tag: "Tutorial", title: "Setup RADIUS Server on Mikrotik in 10 Minutes", excerpt: "Step-by-step RouterOS config so it connects to Radiuslink via RADIUS + API." },
        { tag: "Tips", title: "Automated Billing Optimization for Large Networks", excerpt: "How to schedule invoices, WA reminders, and auto-isolation without customer complaints." },
        { tag: "Update", title: "TR-069/ACS Support Now Built Into Radiuslink", excerpt: "Auto-provision ONTs & CPEs remotely — save your technicians' time." }
      ]
    },
    status: { label: "Platform Status", operational: "All systems operational", degraded: "Degraded performance", outage: "Outage" },
    packages: {
      eyebrow: "Subscription Plans",
      title: "Pick a plan that fits your network scale",
      desc: "All plans include the RADIUS server, GenieACS, real-time dashboard, and 24/7 support. Upgrade & downgrade any month.",
      filter_all: "All",
      filter_home: "Individual",
      filter_premium: "Business",
      filter_business: "Enterprise",
      popular: "Most Popular",
      per_month: "/ month",
      contact_us: "Contact Us",
      cta_subscribe: "Choose Plan",
      cta_contact: "Contact Us",
      mbps: "Users"
    },
    coverage: {
      eyebrow: "Our Valued Customers",
      title: "Thousands of ISPs trust Radiuslink.",
      desc: "Thousands of internet providers trust us to power their networks. Join our growing community.",
      integrations_title: "Integrated with the best",
      integrations_desc: "Seamlessly connect with your favorite hardware and software.",
      status_online: "Online",
      status_offline: "Offline",
      pppoe_label: "PPPoE Customers",
      hotspot_label: "Hotspot Users",
      placeholder: "e.g. Jakarta, Surabaya, Medan",
      cta: "Check Now",
      checking: "Checking...",
      install_label: "Onboarding estimate"
    },
    features: {
      eyebrow: "Why Radiuslink",
      title_prefix: "Why Choose",
      title_brand: "Radiuslink",
      desc: "Feel the difference with features designed to elevate your internet service.",
      list: [
        { title: "Premier Platform", desc: "A comprehensive management platform designed specifically for modern ISPs." },
        { title: "RADIUS Rate Limiting", desc: "Advanced session-time and data-volume rate limiting control." },
        { title: "GenieACS Integration", desc: "Seamless integration with GenieACS for remote device management." },
        { title: "Multi Connection / Hybrid", desc: "Connect via Mikrotik API, RADIUS, or a combination of RADIUS & API." },
        { title: "Speed on Demand", desc: "Let customers temporarily boost their connection speed on demand." },
        { title: "Network Mapping", desc: "Visual representation of your network coverage and client locations on one map." },
        { title: "Automatic Invoicing", desc: "Create and send invoices automatically to customers via email & WhatsApp." },
        { title: "Payment Gateway", desc: "Integrated support for various payment gateways & methods (QRIS, VA, e-wallet)." },
        { title: "White Label App", desc: "Branded mobile app just for your ISP customers — not our brand." },
        { title: "Multi-Region Support", desc: "Manage multiple branches or operational regions from a single dashboard." },
        { title: "Transparency", desc: "Full transparency in logs, usage data, and system activity — audit-ready." },
        { title: "Easy Migration", desc: "Migration tools to move from other billing platforms safely with minimum downtime." }
      ]
    },
    testimonials: { eyebrow: "User Stories", title: "Trusted by operators from cities to remote villages." },
    payment: {
      eyebrow: "How to Subscribe",
      title: "Pay for Radiuslink your favorite way.",
      desc: "Monthly or yearly subscription. Pay via multiple channels — bank virtual accounts, QRIS, or e-wallets.",
      categories: [
        { name: "Bank Virtual Account", items: ["Mandiri", "BRI", "BSI", "BNI", "BCA", "Permata Bank", "CIMB Niaga", "& other banks"] },
        { name: "QRIS", items: ["Any QRIS-enabled payment app", "Scan & pay instantly"] },
        { name: "Retail Outlets", items: ["Alfamart", "Indomaret", "& other minimarket chains"] },
        { name: "E-Wallet", items: ["OVO", "LinkAja", "GoPay", "DANA", "ShopeePay", "& other e-wallets"] }
      ],
      note: "20% discount on yearly plans. Free onboarding & migration from your old system."
    },
    about: {
      eyebrow: "About Us",
      title: "Built by ISP operators, for ISP operators.",
      p1: "Radiuslink is the RADIUS Billing product by PT. Pusaka Kreasi Mandiri — the same company that operates Kumara Hotspot ISP. Every feature in Radiuslink was born from real network operator pain points.",
      p2: "We know how frustrating it is to search for a billing that fits, hack together custom scripts, or pay huge license fees for basic features. Radiuslink is here so network operators can focus on serving customers — not fighting software.",
      stats: [
        { label: "Active ISP clients", value: "50+" },
        { label: "Users managed", value: "10,000+" },
        { label: "Connected routers", value: "200+" },
        { label: "Platform uptime", value: "99.9%" }
      ]
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "Compatible with my Mikrotik?", a: "Yes. Radiuslink works with all Mikrotik RouterOS v6.x and v7.x. We connect via API + RADIUS." },
        { q: "How long does migration take?", a: "Typically 1–3 business days. Our team helps import your customer data, plans, and active invoices." },
        { q: "Do you offer a free trial?", a: "Yes, a 14-day trial with all features unlocked. No credit card required." },
        { q: "Is my customer data secure?", a: "Data is stored on Indonesian servers, encrypted, with daily automatic backups. Complies with Indonesia PDP Law." },
        { q: "What if I have technical issues?", a: "24/7 support via WhatsApp and ticketing. Enterprise plans get a dedicated engineer + <1h response time." }
      ]
    },
    subscribe: {
      eyebrow: "Sign-up Form",
      title: "Start managing your network in 60 seconds.",
      desc: "Fill the form below, our team will reach out within 1 business day for a demo & onboarding.",
      name: "Full Name",
      phone: "WhatsApp Number",
      email: "Email",
      address: "ISP / Company Name",
      city: "Operating City",
      package: "Choose Plan",
      notes: "Number of users & routers (optional)",
      submit: "Submit Request",
      submitting: "Submitting...",
      success_title: "Request submitted!",
      success_desc: "The Radiuslink team will reach out shortly for a demo.",
      fallback_title: "Sent via WhatsApp",
      fallback_desc: "Server is busy — your request was routed via WhatsApp. Our team will respond shortly.",
      error: "Submission failed. Please try again.",
      select_placeholder: "— Choose a plan —"
    },
    contact: {
      eyebrow: "Contact",
      title: "Our engineers are here for you, 24 hours a day.",
      whatsapp: "Chat on WhatsApp",
      email: "Email",
      phone: "Phone",
      address: "Headquarters",
      hours: "Business Hours",
      hours_value: "24/7 — Technical support · 08:00–22:00 — Sales & billing"
    },
    footer: {
      desc: "Radiuslink — RADIUS Billing for Hotspot ISPs by PT. Pusaka Kreasi Mandiri. Manage hotspot & PPPoE from one platform.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      newsletter: "Newsletter",
      newsletter_desc: "Get tutorials, tips, and feature updates straight to your inbox.",
      newsletter_placeholder: "Your email",
      newsletter_cta: "Join",
      copyright: "© 2026 PT. Pusaka Kreasi Mandiri. All rights reserved.",
      links_product: ["Features", "Pricing", "Integrations", "Roadmap"],
      links_company: ["About", "Blog", "Careers", "Contact"],
      links_legal: ["Terms of Service", "Privacy Policy", "SLA", "Acceptable Use"]
    }
  }
};

const LanguageContext = createContext({ lang: "id", setLang: () => {}, t: translations.id });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("radiuslink_lang") || "id";
    } catch {
      return "id";
    }
  });

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("radiuslink_lang", l); } catch (_err) { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, setLang, t: translations[lang] };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  return useContext(LanguageContext);
}

export function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}
