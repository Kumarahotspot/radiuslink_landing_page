// Static data fallback so the public site works without backend API calls.
// Source: backend/server.py DEFAULT_PACKAGES + default PromoSettings.

export const STATIC_PACKAGES = [
  {
    id: "bronze",
    category: "home",
    name: "Bronze",
    speed_mbps: 15,
    broadband_mbps: 30,
    price_idr: 150000,
    popular: false,
    features_id: ["15 Mbps Dedicated", "30 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Support 24/7"],
    features_en: ["15 Mbps Dedicated", "30 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "24/7 support"]
  },
  {
    id: "silver",
    category: "home",
    name: "Silver",
    speed_mbps: 18,
    broadband_mbps: 36,
    price_idr: 180000,
    popular: false,
    features_id: ["18 Mbps Dedicated", "36 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Support 24/7"],
    features_en: ["18 Mbps Dedicated", "36 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "24/7 support"]
  },
  {
    id: "gold",
    category: "home",
    name: "Gold",
    speed_mbps: 20,
    broadband_mbps: 40,
    price_idr: 200000,
    popular: true,
    features_id: ["20 Mbps Dedicated", "40 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Free WiFi router"],
    features_en: ["20 Mbps Dedicated", "40 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi router"]
  },
  {
    id: "new-gold-1",
    category: "premium",
    name: "New Gold 1",
    speed_mbps: 25,
    broadband_mbps: 50,
    price_idr: 250000,
    popular: false,
    features_id: ["25 Mbps Dedicated", "50 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Priority support"],
    features_en: ["25 Mbps Dedicated", "50 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Priority support"]
  },
  {
    id: "new-gold-2",
    category: "premium",
    name: "New Gold 2",
    speed_mbps: 27,
    broadband_mbps: 54,
    price_idr: 270000,
    popular: false,
    features_id: ["27 Mbps Dedicated", "54 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "Priority support"],
    features_en: ["27 Mbps Dedicated", "54 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Priority support"]
  },
  {
    id: "platinum-1",
    category: "premium",
    name: "Platinum 1",
    speed_mbps: 30,
    broadband_mbps: 60,
    price_idr: 300000,
    popular: true,
    features_id: ["30 Mbps Dedicated", "60 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
    features_en: ["30 Mbps Dedicated", "60 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]
  },
  {
    id: "platinum-2",
    category: "premium",
    name: "Platinum 2",
    speed_mbps: 35,
    broadband_mbps: 70,
    price_idr: 350000,
    popular: false,
    features_id: ["35 Mbps Dedicated", "70 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
    features_en: ["35 Mbps Dedicated", "70 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]
  },
  {
    id: "platinum-3",
    category: "premium",
    name: "Platinum 3",
    speed_mbps: 40,
    broadband_mbps: 80,
    price_idr: 400000,
    popular: false,
    features_id: ["40 Mbps Dedicated", "80 Mbps Broadband", "Internet Resmi & Berijin", "Unlimited tanpa batas", "WiFi 6 router gratis"],
    features_en: ["40 Mbps Dedicated", "80 Mbps Broadband", "Licensed & Legal ISP", "Truly unlimited", "Free WiFi 6 router"]
  },
  {
    id: "edukasi-100",
    category: "premium",
    name: "EDUKASI 100",
    speed_mbps: 100,
    broadband_mbps: 200,
    price_idr: 100000,
    popular: true,
    features_id: ["100 Mbps Dedicated", "200 Mbps Broadband", "Khusus institusi pendidikan", "Unlimited tanpa batas", "Free WiFi router"],
    features_en: ["100 Mbps Dedicated", "200 Mbps Broadband", "For education institutions", "Truly unlimited", "Free WiFi router"]
  },
  {
    id: "business",
    category: "business",
    name: "Business",
    speed_mbps: 50,
    broadband_mbps: 100,
    price_idr: 500000,
    popular: false,
    features_id: ["50 Mbps Dedicated", "100 Mbps Broadband", "Internet Resmi & Berijin", "Dedicated IP publik", "SLA 99,95% & onsite engineer"],
    features_en: ["50 Mbps Dedicated", "100 Mbps Broadband", "Licensed & Legal ISP", "Public dedicated IP", "99.95% SLA & onsite engineer"]
  }
];

export const STATIC_PROMO = {
  active: true,
  tag_id: "Promo Spesial",
  tag_en: "Special Offer",
  text_id: "Pasang baru hari ini — Gratis biaya instalasi + 1 bulan gratis. Berlaku terbatas!",
  text_en: "Sign up today — Free installation + 1 month free. Limited time!",
  cta_id: "Klaim Sekarang",
  cta_en: "Claim Now",
  cta_message_id: "Halo Kumara, saya tertarik dengan promo pasang baru gratis 1 bulan.",
  cta_message_en: "Hello Kumara, I'm interested in the free 1-month installation promo."
};

// Slugs of covered cities for client-side coverage check.
export const STATIC_COVERED_SLUGS = [
  "jakarta", "bandung", "surabaya", "bekasi", "tangerang", "bogor", "depok",
  "semarang", "yogyakarta", "denpasar", "medan", "makassar",
  "cianjur", "demak", "bondowoso"
];
