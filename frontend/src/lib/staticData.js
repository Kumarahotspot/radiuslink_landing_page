// Static fallback data. Frontend tries API first, falls back to this on failure.

export const STATIC_PACKAGES = [
  {
    id: "micro",
    category: "home",
    name: "Micro",
    speed_mbps: 200,
    broadband_mbps: 200,
    price_idr: 150000,
    popular: false,
    features_id: [
      "Untuk individu yang baru memulai",
      "Max 200 Pelanggan PPPoE",
      "Max 200 Aktif Hotspot",
      "Max 5.000 Vouchers",
      "5 Router Mikrotik",
      "5 NAS / VPN",
      "1 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "For individuals just starting out",
      "Max 200 PPPoE Customers",
      "Max 200 Active Hotspot",
      "Max 5,000 Vouchers",
      "5 Mikrotik Routers",
      "5 NAS / VPN",
      "1 WhatsApp Gateway Device",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "basic",
    category: "home",
    name: "Basic",
    speed_mbps: 500,
    broadband_mbps: 500,
    price_idr: 450000,
    popular: false,
    features_id: [
      "Fitur penting untuk tim kecil",
      "Max 500 Pelanggan PPPoE",
      "Max 500 Aktif Hotspot",
      "Max 12.500 Vouchers",
      "12 Router Mikrotik",
      "12 NAS / VPN",
      "2 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "Essential features for small teams",
      "Max 500 PPPoE Customers",
      "Max 500 Active Hotspot",
      "Max 12,500 Vouchers",
      "12 Mikrotik Routers",
      "12 NAS / VPN",
      "2 WhatsApp Gateway Devices",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "pro",
    category: "premium",
    name: "Pro",
    speed_mbps: 1000,
    broadband_mbps: 1000,
    price_idr: 900000,
    popular: true,
    features_id: [
      "Segala yang Anda butuhkan untuk bisnis yang berkembang",
      "Max 1.000 Pelanggan PPPoE",
      "Max 1.000 Aktif Hotspot",
      "Max 25.000 Vouchers",
      "24 Router Mikrotik",
      "24 NAS / VPN",
      "4 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Whitelabel Aplikasi Pelanggan",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "Everything you need for a growing business",
      "Max 1,000 PPPoE Customers",
      "Max 1,000 Active Hotspot",
      "Max 25,000 Vouchers",
      "24 Mikrotik Routers",
      "24 NAS / VPN",
      "4 WhatsApp Gateway Devices",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "White-label Customer App",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "advanced",
    category: "premium",
    name: "Advanced",
    speed_mbps: 2000,
    broadband_mbps: 2000,
    price_idr: 1500000,
    popular: false,
    features_id: [
      "Kapasitas maksimal untuk pertumbuhan tanpa batas",
      "Max 2.000 Pelanggan PPPoE",
      "Max 2.000 Aktif Hotspot",
      "Max 50.000 Vouchers",
      "50 Router Mikrotik",
      "50 NAS / VPN",
      "7 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Whitelabel Aplikasi Pelanggan",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "Maximum capacity for unlimited growth",
      "Max 2,000 PPPoE Customers",
      "Max 2,000 Active Hotspot",
      "Max 50,000 Vouchers",
      "50 Mikrotik Routers",
      "50 NAS / VPN",
      "7 WhatsApp Gateway Devices",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "White-label Customer App",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "ultimate",
    category: "business",
    name: "Ultimate",
    speed_mbps: 5000,
    broadband_mbps: 5000,
    price_idr: 0,
    popular: false,
    features_id: [
      "Solusi enterprise untuk skala besar tanpa kompromi",
      "Max 5.000 Pelanggan PPPoE",
      "Max 5.000 Aktif Hotspot",
      "Max 125.000 Vouchers",
      "125 Router Mikrotik",
      "125 NAS / VPN",
      "15 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Whitelabel Aplikasi Pelanggan",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "Enterprise-grade at scale without compromise",
      "Max 5,000 PPPoE Customers",
      "Max 5,000 Active Hotspot",
      "Max 125,000 Vouchers",
      "125 Mikrotik Routers",
      "125 NAS / VPN",
      "15 WhatsApp Gateway Devices",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "White-label Customer App",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "enterprise",
    category: "business",
    name: "Enterprise",
    speed_mbps: 10000,
    broadband_mbps: 10000,
    price_idr: 0,
    popular: false,
    features_id: [
      "Infrastruktur masif untuk penyedia layanan tingkat nasional",
      "Max 10.000 Pelanggan PPPoE",
      "Max 10.000 Aktif Hotspot",
      "Max 250.000 Vouchers",
      "250 Router Mikrotik",
      "250 NAS / VPN",
      "25 Device WhatsApp Gateway",
      "RADIUS Terintegrasi GenieACS",
      "Payment Gateway",
      "Multi-tenant / Wilayah / Cabang",
      "Dukungan 24/7",
      "4 Port Forwarding di setiap NAS",
      "Whitelabel Aplikasi Pelanggan",
      "Tidak ada biaya tambahan, sudah all-in"
    ],
    features_en: [
      "Massive infrastructure for nation-scale providers",
      "Max 10,000 PPPoE Customers",
      "Max 10,000 Active Hotspot",
      "Max 250,000 Vouchers",
      "250 Mikrotik Routers",
      "250 NAS / VPN",
      "25 WhatsApp Gateway Devices",
      "GenieACS-integrated RADIUS",
      "Payment Gateway",
      "Multi-tenant / Region / Branch",
      "24/7 Support",
      "4 Port Forwarding per NAS",
      "White-label Customer App",
      "No hidden fees — all-in"
    ]
  },
  {
    id: "custom",
    category: "business",
    name: "Custom",
    speed_mbps: 0,
    broadband_mbps: 0,
    price_idr: 0,
    popular: false,
    features_id: [
      "Solusi yang disesuaikan dengan kebutuhan Anda",
      "Hubungi kami untuk paket custom",
      "Fitur yang dapat disesuaikan",
      "Skalabilitas sesuai permintaan",
      "Dukungan prioritas",
      "Harga negosiasi"
    ],
    features_en: [
      "A solution tailored to your needs",
      "Contact us for a custom package",
      "Fully customizable features",
      "Scalability on demand",
      "Priority support",
      "Negotiable pricing"
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
