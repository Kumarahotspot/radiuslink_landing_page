// Static fallback data. Frontend tries API first, falls back to this on failure.

export const STATIC_PACKAGES = [
  {
    id: "starter",
    category: "home",
    name: "Starter",
    speed_mbps: 100,
    broadband_mbps: 200,
    price_idr: 99000,
    popular: false,
    features_id: [
      "Hingga 100 user aktif",
      "1 router Mikrotik",
      "RADIUS Server + Hotspot",
      "Voucher generator dasar",
      "Dashboard real-time",
      "Support via WhatsApp"
    ],
    features_en: [
      "Up to 100 active users",
      "1 Mikrotik router",
      "RADIUS Server + Hotspot",
      "Basic voucher generator",
      "Real-time dashboard",
      "WhatsApp support"
    ]
  },
  {
    id: "pro",
    category: "premium",
    name: "Pro",
    speed_mbps: 500,
    broadband_mbps: 1000,
    price_idr: 299000,
    popular: true,
    features_id: [
      "Hingga 500 user aktif",
      "5 router Mikrotik",
      "PPPoE + Hotspot",
      "Billing otomatis + reminder WA",
      "Multi payment gateway (QRIS/VA)",
      "Voucher massal + branding",
      "Support 24/7"
    ],
    features_en: [
      "Up to 500 active users",
      "5 Mikrotik routers",
      "PPPoE + Hotspot",
      "Auto billing + WA reminders",
      "Multi payment gateway (QRIS/VA)",
      "Bulk voucher + branding",
      "24/7 support"
    ]
  },
  {
    id: "enterprise",
    category: "business",
    name: "Enterprise",
    speed_mbps: 5000,
    broadband_mbps: 10000,
    price_idr: 999000,
    popular: false,
    features_id: [
      "User & router unlimited",
      "TR-069 / ACS auto-provisioning",
      "WhatsApp Business Official API",
      "Dedicated engineer",
      "Custom integrasi & API",
      "SLA 99,9% + response <1 jam",
      "Migrasi data gratis"
    ],
    features_en: [
      "Unlimited users & routers",
      "TR-069 / ACS auto-provisioning",
      "Official WhatsApp Business API",
      "Dedicated engineer",
      "Custom integrations & API",
      "99.9% SLA + <1h response",
      "Free data migration"
    ]
  }
];

export const STATIC_PROMO = {
  active: true,
  tag_id: "Promo Peluncuran",
  tag_en: "Launch Promo",
  text_id: "Coba GRATIS 14 hari — semua fitur unlocked. Tanpa kartu kredit.",
  text_en: "Try FREE for 14 days — all features unlocked. No credit card required.",
  cta_id: "Coba Gratis",
  cta_en: "Try Free",
  cta_message_id: "Halo Radiuslink, saya mau coba trial gratis 14 hari untuk platform RADIUS Billing.",
  cta_message_en: "Hello Radiuslink, I'd like to start the 14-day free trial of the RADIUS Billing platform."
};

// Cities where our on-site engineers/partners operate
export const STATIC_COVERED_SLUGS = [
  "jakarta", "bandung", "surabaya", "bekasi", "tangerang", "bogor", "depok",
  "semarang", "yogyakarta", "denpasar", "medan", "makassar",
  "palembang", "pekanbaru", "banjarmasin", "balikpapan", "manado",
  "cianjur", "demak", "bondowoso", "malang", "solo"
];


// Featured ISP clients (public landing showcase)
export const STATIC_CLIENTS = [
  {
    id: "jkb-telematika",
    name: "JKB Telematika Indonesia",
    logo: "/logos/client-jkb.png",
    accent: "#EA580C",
    online: true,
    pppoe: 2000,
    hotspot: 2500
  },
  {
    id: "kumara-hotspot",
    name: "Kumara Hotspot",
    logo: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/jxj1q6vc_LOGO_KUMARA_TEXT_HITAM__1_-removebg-preview%20%282%29.png",
    accent: "#FF5E00",
    online: true,
    pppoe: 5200,
    hotspot: 6000
  },
  {
    id: "lintas-data-kita",
    name: "PT. Lintas Data Kita",
    logo: "/logos/client-lintasdata.webp",
    accent: "#2563EB",
    online: true,
    pppoe: 3500,
    hotspot: 2100
  },
  {
    id: "csgarnet",
    name: "CSGARNET",
    logo: "/logos/client-csgarnet.jpeg",
    accent: "#7C3AED",
    online: true,
    pppoe: 1800,
    hotspot: 1500
  }
];

// Logos shown in the "Integrated with the best" strip
export const STATIC_INTEGRATIONS = [
  {
    id: "jkb-telematika",
    name: "JKB Telematika Indonesia",
    logo: "/logos/client-jkb.png",
    accent: "#EA580C"
  },
  {
    id: "kumara-hotspot",
    name: "Kumara Hotspot",
    logo: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/jxj1q6vc_LOGO_KUMARA_TEXT_HITAM__1_-removebg-preview%20%282%29.png",
    accent: "#FF5E00"
  },
  {
    id: "lintas-data-kita",
    name: "PT. Lintas Data Kita",
    logo: "/logos/client-lintasdata.webp",
    accent: "#2563EB"
  },
  {
    id: "csgarnet",
    name: "CSGARNET",
    logo: "/logos/client-csgarnet.jpeg",
    accent: "#7C3AED"
  }
];
