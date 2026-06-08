import React, { createContext, useContext, useEffect, useState } from "react";

export const translations = {
  id: {
    brand: "Kumara Hotspot",
    parent: "PT. Pusaka Kreasi Mandiri",
    tagline: "Internet Cepat Tanpa Batas",
    nav: {
      home: "Beranda",
      packages: "Paket",
      coverage: "Cakupan",
      payment: "Pembayaran",
      about: "Tentang",
      contact: "Kontak",
      subscribe: "Berlangganan"
    },
    hero: {
      eyebrow: "Kumara Hotspot · ISP Generasi Baru",
      title_1: "Internet Fiber",
      title_2: "Tanpa Batas",
      title_3: "untuk Indonesia.",
      desc: "Jaringan fiber optik berperforma tinggi dengan latensi rendah, unlimited tanpa FUP, didukung NOC 24/7 oleh PT. Pusaka Kreasi Mandiri.",
      cta_primary: "Cek Paket",
      cta_secondary: "Cek Coverage",
      stat_speed: "Hingga 1 Gbps",
      stat_uptime: "99,99% Uptime",
      stat_support: "Support 24/7",
      stat_cities: "15+ Kota"
    },
    marquee: ["Fiber to the Home", "Unlimited Tanpa FUP", "Dedicated IP", "Symmetric Bandwidth", "Low Latency Gaming", "Enterprise SLA"],
    promo: {
      tag: "Promo Spesial",
      text: "Pasang baru hari ini — Gratis biaya instalasi + 1 bulan gratis. Berlaku terbatas!",
      cta: "Klaim Sekarang"
    },
    trust: {
      eyebrow: "Terdaftar & Resmi",
      title: "Operator internet legal dan tersertifikasi.",
      badges: [
        { name: "APJII", desc: "Anggota Asosiasi Penyelenggara Jasa Internet Indonesia" },
        { name: "Komdigi", desc: "Berijin dari Kementerian Komunikasi & Digital RI" },
        { name: "ID-NIC", desc: "Anggota Indonesia Network Information Centre" },
        { name: "Internet Positif", desc: "Dukungan penyaringan konten sesuai regulasi" }
      ]
    },
    recommender: {
      eyebrow: "Cari Paket Tepat",
      title: "Rekomendasi paket dalam 5 detik.",
      desc: "Geser slider sesuai kebutuhan Anda — kami sarankan paket yang paling cocok.",
      devices_label: "Jumlah perangkat",
      usage_label: "Aktivitas utama",
      usage_options: ["Browsing & Sosmed", "Streaming HD", "Streaming 4K & Gaming", "WFH & Bisnis"],
      result_label: "Rekomendasi untuk Anda",
      cta: "Pilih Paket Ini"
    },
    compare: {
      eyebrow: "Bandingkan",
      title: "Kenapa Kumara, bukan yang lain?",
      headers: ["Fitur", "Kumara Hotspot", "ISP Umum"],
      rows: [
        ["Backbone fiber optik 100%", "✓ Ya", "✗ Sebagian wireless"],
        ["Unlimited tanpa FUP", "✓ Ya (paket Pro+)", "✗ FUP ketat"],
        ["Symmetric upload & download", "✓ Ya", "✗ Hanya download"],
        ["Latency ke IIX", "<5 ms", "10–30 ms"],
        ["Support 24/7 onsite", "✓ Ya", "△ Call center saja"],
        ["Dedicated IP publik", "✓ Tersedia", "✗ Tidak tersedia"],
        ["SLA enterprise", "✓ Hingga 99,99%", "✗ Tanpa SLA"]
      ]
    },
    blog: {
      eyebrow: "Berita & Edukasi",
      title: "Tips, promo, dan kabar dari Kumara.",
      read_more: "Baca selengkapnya",
      posts: [
        {
          tag: "Tips",
          title: "5 Cara Mempercepat WiFi Rumah Anda",
          excerpt: "Posisi router, channel WiFi, dan beberapa trik sederhana yang bisa meningkatkan koneksi hingga 40%."
        },
        {
          tag: "Promo",
          title: "Spesial Akhir Tahun: Gratis 1 Bulan Berlangganan",
          excerpt: "Pasang baru sebelum akhir bulan dan dapatkan gratis langganan satu bulan penuh untuk semua paket."
        },
        {
          tag: "Ekspansi",
          title: "Kumara Hotspot Hadir di Cianjur & Demak",
          excerpt: "Kami terus memperluas jaringan fiber ke daerah baru. Cek apakah area Anda sudah tercover."
        }
      ]
    },
    status: {
      label: "Status Jaringan",
      operational: "Semua sistem normal",
      degraded: "Performa menurun",
      outage: "Gangguan"
    },
    packages: {
      eyebrow: "Paket Berlangganan",
      title: "Pilih paket yang sesuai dengan kebutuhan Anda",
      desc: "Dari kebutuhan rumah hingga skala perusahaan — semua paket sudah termasuk perangkat dan instalasi.",
      filter_all: "Semua",
      filter_home: "Home",
      filter_premium: "Premium",
      filter_business: "Business",
      popular: "Paling Populer",
      per_month: "/ bulan",
      cta_subscribe: "Berlangganan",
      mbps: "Mbps"
    },
    coverage: {
      eyebrow: "Cek Ketersediaan",
      title: "Apakah Kumara Hotspot sudah ada di area Anda?",
      desc: "Masukkan nama kota atau kecamatan untuk melihat apakah area Anda sudah tercover.",
      placeholder: "Contoh: Jakarta Selatan, Bandung, Surabaya",
      cta: "Cek Sekarang",
      checking: "Mengecek...",
      install_label: "Estimasi instalasi"
    },
    features: {
      eyebrow: "Mengapa Kumara",
      title: "Dibangun untuk performa, bukan kompromi.",
      list: [
        {
          title: "Fiber Murni 100%",
          desc: "Backbone fiber optik symmetric, bukan kabel tembaga atau wireless last-mile."
        },
        {
          title: "Unlimited Tanpa FUP",
          desc: "Streaming, gaming, dan WFH tanpa pembatasan kuota di paket Pro & Business."
        },
        {
          title: "Latency <5ms",
          desc: "Routing langsung ke IIX, IX, dan peering global untuk gaming dan trading."
        },
        {
          title: "Support 24/7",
          desc: "NOC dan engineer onsite siap merespons gangguan kurang dari 15 menit."
        },
        {
          title: "SLA Enterprise",
          desc: "Garansi uptime hingga 99,99% dengan kompensasi otomatis."
        },
        {
          title: "Dedicated IP",
          desc: "Public dedicated IP tersedia untuk paket Business & Dedicated."
        }
      ]
    },
    testimonials: {
      eyebrow: "Cerita Pelanggan",
      title: "Dipercaya oleh ribuan rumah dan bisnis."
    },
    payment: {
      eyebrow: "Metode Pembayaran",
      title: "Bayar tagihan dengan cara paling nyaman.",
      desc: "Pembayaran dapat dilakukan melalui berbagai kanal — virtual account bank, QRIS, gerai retail, hingga e-wallet favorit Anda.",
      categories: [
        {
          name: "Virtual Account Bank",
          items: ["Mandiri", "BRI", "BSI", "BNI", "BCA", "Permata Bank", "CIMB Niaga", "& bank lainnya"]
        },
        {
          name: "QRIS",
          items: ["Semua aplikasi pembayaran berlogo QRIS", "Scan & bayar instan"]
        },
        {
          name: "Gerai Retail",
          items: ["Alfamart", "Indomaret", "& jaringan minimarket lainnya"]
        },
        {
          name: "E-Wallet",
          items: ["OVO", "LinkAja", "GoPay", "DANA", "ShopeePay", "& e-wallet lainnya"]
        }
      ],
      note: "Tagihan otomatis dikirim setiap awal bulan via email dan WhatsApp."
    },
    about: {
      eyebrow: "Tentang Kami",
      title: "Dibangun oleh insinyur jaringan Indonesia.",
      p1: "Kumara Hotspot adalah brand layanan ISP dari PT. Pusaka Kreasi Mandiri. Kami fokus menghadirkan koneksi fiber optik yang stabil, cepat, dan terjangkau untuk rumah tangga, UMKM, hingga enterprise.",
      p2: "Dengan tim NOC 24/7, perangkat kelas operator, dan rute peering langsung ke IIX dan global, kami percaya internet seharusnya cepat — selalu.",
      stats: [
        { label: "Pelanggan aktif", value: "8.500+" },
        { label: "Kota beroperasi", value: "12+" },
        { label: "Backbone fiber", value: "2.400 km" },
        { label: "Tahun pengalaman", value: "9 thn" }
      ]
    },
    faq: {
      eyebrow: "Pertanyaan Umum",
      title: "Pertanyaan yang sering diajukan",
      items: [
        {
          q: "Berapa lama proses instalasi?",
          a: "Untuk area yang sudah tercover, instalasi umumnya selesai dalam 1–3 hari kerja setelah survey lokasi disetujui."
        },
        {
          q: "Apakah ada biaya pasang baru?",
          a: "Biaya pasang baru gratis untuk kontrak minimal 6 bulan. Tanpa kontrak akan dikenakan biaya instalasi Rp350.000."
        },
        {
          q: "Bagaimana jika paket tidak sesuai?",
          a: "Anda bebas upgrade atau downgrade paket setiap bulan tanpa biaya tambahan."
        },
        {
          q: "Apakah benar-benar unlimited?",
          a: "Paket Home Pro, Business, dan Dedicated bersifat unlimited tanpa FUP. Paket Home Basic memiliki FUP wajar di 1 TB/bulan."
        },
        {
          q: "Apakah ada SLA untuk bisnis?",
          a: "Ya, paket Business memberikan SLA 99,95% dan paket Dedicated SLA 99,99% dengan kompensasi otomatis."
        }
      ]
    },
    subscribe: {
      eyebrow: "Formulir Berlangganan",
      title: "Mulai berlangganan dalam 60 detik.",
      desc: "Isi formulir di bawah, tim kami akan menghubungi Anda dalam 1×24 jam kerja.",
      name: "Nama Lengkap",
      phone: "Nomor WhatsApp",
      email: "Email",
      address: "Alamat Lengkap",
      city: "Kota / Kecamatan",
      package: "Pilih Paket",
      notes: "Catatan (opsional)",
      submit: "Kirim Pendaftaran",
      submitting: "Mengirim...",
      success_title: "Pendaftaran terkirim!",
      success_desc: "Tim Kumara Hotspot akan menghubungi Anda segera.",
      error: "Gagal mengirim. Coba lagi.",
      select_placeholder: "— Pilih paket —"
    },
    contact: {
      eyebrow: "Hubungi Kami",
      title: "Tim kami siap membantu, 24 jam sehari.",
      whatsapp: "Chat WhatsApp",
      email: "Email",
      phone: "Telepon",
      address: "Kantor Pusat",
      hours: "Jam Operasional",
      hours_value: "24/7 — Layanan teknis · 08.00–22.00 — Layanan pelanggan"
    },
    footer: {
      desc: "Kumara Hotspot — brand layanan internet dari PT. Pusaka Kreasi Mandiri. Internet fiber cepat, stabil, dan terjangkau.",
      product: "Produk",
      company: "Perusahaan",
      legal: "Legal",
      newsletter: "Newsletter",
      newsletter_desc: "Dapatkan promo dan info area baru langsung ke email Anda.",
      newsletter_placeholder: "Email Anda",
      newsletter_cta: "Daftar",
      copyright: "© 2025 PT. Pusaka Kreasi Mandiri. Seluruh hak cipta dilindungi.",
      links_product: ["Paket Home", "Paket Business", "Dedicated", "Coverage"],
      links_company: ["Tentang", "Karier", "Berita", "Kontak"],
      links_legal: ["Syarat Layanan", "Kebijakan Privasi", "SLA", "Acceptable Use"]
    }
  },
  en: {
    brand: "Kumara Hotspot",
    parent: "PT. Pusaka Kreasi Mandiri",
    tagline: "High Speed Internet Unlimited",
    nav: {
      home: "Home",
      packages: "Packages",
      coverage: "Coverage",
      payment: "Payment",
      about: "About",
      contact: "Contact",
      subscribe: "Subscribe"
    },
    hero: {
      eyebrow: "Kumara Hotspot · Next-gen ISP",
      title_1: "Unlimited Fiber",
      title_2: "Internet,",
      title_3: "built for Indonesia.",
      desc: "High-performance fiber optic network with ultra-low latency, true unlimited with no FUP, backed by 24/7 NOC engineers at PT. Pusaka Kreasi Mandiri.",
      cta_primary: "See Plans",
      cta_secondary: "Check Coverage",
      stat_speed: "Up to 1 Gbps",
      stat_uptime: "99.99% Uptime",
      stat_support: "24/7 Support",
      stat_cities: "15+ Cities"
    },
    marquee: ["Fiber to the Home", "Unlimited, no FUP", "Dedicated IP", "Symmetric Bandwidth", "Low Latency Gaming", "Enterprise SLA"],
    promo: {
      tag: "Special Offer",
      text: "Sign up today — Free installation + 1 month free. Limited time!",
      cta: "Claim Now"
    },
    trust: {
      eyebrow: "Registered & Licensed",
      title: "A legal and certified internet operator.",
      badges: [
        { name: "APJII", desc: "Member of the Indonesian Internet Service Providers Association" },
        { name: "Komdigi", desc: "Licensed by the Ministry of Communications & Digital Affairs" },
        { name: "ID-NIC", desc: "Member of Indonesia Network Information Centre" },
        { name: "Internet Positif", desc: "Compliant with regulated content filtering" }
      ]
    },
    recommender: {
      eyebrow: "Find Your Plan",
      title: "Get a recommendation in 5 seconds.",
      desc: "Slide to match your needs — we suggest the perfect plan.",
      devices_label: "Number of devices",
      usage_label: "Primary activity",
      usage_options: ["Browsing & social", "HD streaming", "4K streaming & gaming", "Work-from-home & business"],
      result_label: "Recommended for you",
      cta: "Pick This Plan"
    },
    compare: {
      eyebrow: "Compare",
      title: "Why Kumara, not the rest?",
      headers: ["Feature", "Kumara Hotspot", "Typical ISP"],
      rows: [
        ["100% fiber optic backbone", "✓ Yes", "✗ Partly wireless"],
        ["True unlimited, no FUP", "✓ Yes (Pro+)", "✗ Strict FUP"],
        ["Symmetric upload & download", "✓ Yes", "✗ Download only"],
        ["Latency to IIX", "<5 ms", "10–30 ms"],
        ["24/7 onsite support", "✓ Yes", "△ Call center only"],
        ["Public dedicated IP", "✓ Available", "✗ Not available"],
        ["Enterprise SLA", "✓ Up to 99.99%", "✗ No SLA"]
      ]
    },
    blog: {
      eyebrow: "News & Tips",
      title: "Tips, promos, and updates from Kumara.",
      read_more: "Read more",
      posts: [
        {
          tag: "Tips",
          title: "5 Ways to Speed Up Your Home WiFi",
          excerpt: "Router placement, WiFi channel, and simple tricks that can boost your connection by up to 40%."
        },
        {
          tag: "Promo",
          title: "Year-End Special: 1 Month Free Subscription",
          excerpt: "Sign up before end of month and get a full month of free service on any plan."
        },
        {
          tag: "Expansion",
          title: "Kumara Hotspot Arrives in Cianjur & Demak",
          excerpt: "We continue to expand our fiber network. Check if your area is now covered."
        }
      ]
    },
    status: {
      label: "Network Status",
      operational: "All systems operational",
      degraded: "Degraded performance",
      outage: "Outage"
    },
    packages: {
      eyebrow: "Subscription Plans",
      title: "Pick a plan that matches your needs",
      desc: "From home to enterprise — every plan includes equipment and installation.",
      filter_all: "All",
      filter_home: "Home",
      filter_premium: "Premium",
      filter_business: "Business",
      popular: "Most Popular",
      per_month: "/ month",
      cta_subscribe: "Subscribe",
      mbps: "Mbps"
    },
    coverage: {
      eyebrow: "Coverage Checker",
      title: "Is Kumara Hotspot available in your area?",
      desc: "Type your city or district to see whether your area is already covered.",
      placeholder: "e.g. South Jakarta, Bandung, Surabaya",
      cta: "Check Now",
      checking: "Checking...",
      install_label: "Estimated install"
    },
    features: {
      eyebrow: "Why Kumara",
      title: "Engineered for performance, no compromises.",
      list: [
        { title: "100% Pure Fiber", desc: "Symmetric fiber backbone — no copper, no wireless last-mile." },
        { title: "True Unlimited, No FUP", desc: "Stream, game and WFH without quota caps on Pro & Business plans." },
        { title: "Latency <5ms", desc: "Direct routing to IIX, IX and global peering for gamers and traders." },
        { title: "24/7 Support", desc: "NOC and onsite engineers respond to incidents in under 15 minutes." },
        { title: "Enterprise SLA", desc: "Up to 99.99% uptime guarantee with automatic credit compensation." },
        { title: "Dedicated IP", desc: "Public dedicated IP available on Business and Dedicated plans." }
      ]
    },
    testimonials: {
      eyebrow: "Customer Stories",
      title: "Trusted by thousands of homes and businesses."
    },
    payment: {
      eyebrow: "Payment Methods",
      title: "Pay your bill the way you prefer.",
      desc: "Settle your monthly invoice via multiple channels — bank virtual account, QRIS, retail outlets, and popular e-wallets.",
      categories: [
        {
          name: "Bank Virtual Account",
          items: ["Mandiri", "BRI", "BSI", "BNI", "BCA", "Permata Bank", "CIMB Niaga", "& other banks"]
        },
        {
          name: "QRIS",
          items: ["Any QRIS-enabled payment app", "Scan & pay instantly"]
        },
        {
          name: "Retail Outlets",
          items: ["Alfamart", "Indomaret", "& other minimarket chains"]
        },
        {
          name: "E-Wallet",
          items: ["OVO", "LinkAja", "GoPay", "DANA", "ShopeePay", "& other e-wallets"]
        }
      ],
      note: "Invoices are sent automatically every beginning of month via email and WhatsApp."
    },
    about: {
      eyebrow: "About Us",
      title: "Built by Indonesian network engineers.",
      p1: "Kumara Hotspot is the consumer ISP brand of PT. Pusaka Kreasi Mandiri. We are obsessed with delivering stable, fast and affordable fiber for homes, SMBs and enterprises.",
      p2: "With a 24/7 NOC, carrier-grade equipment and direct peering to IIX and global networks, we believe the internet should be fast — always.",
      stats: [
        { label: "Active subscribers", value: "8,500+" },
        { label: "Cities served", value: "12+" },
        { label: "Fiber backbone", value: "2,400 km" },
        { label: "Years of expertise", value: "9 yrs" }
      ]
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "How long does installation take?", a: "For covered areas, installation typically completes within 1–3 business days after site survey approval." },
        { q: "Is there a new-install fee?", a: "Free installation for a 6-month minimum contract. Otherwise an IDR 350,000 setup fee applies." },
        { q: "Can I switch plans later?", a: "You can upgrade or downgrade your plan every month at no extra cost." },
        { q: "Is it really unlimited?", a: "Home Pro, Business and Dedicated plans are truly unlimited with no FUP. Home Basic has a fair-use cap at 1 TB/month." },
        { q: "Do you offer SLA for business?", a: "Yes — Business plans carry a 99.95% SLA, Dedicated plans 99.99%, with automatic credit compensation." }
      ]
    },
    subscribe: {
      eyebrow: "Subscription Form",
      title: "Get connected in 60 seconds.",
      desc: "Fill out the form below, our team will get back to you within 1 business day.",
      name: "Full Name",
      phone: "WhatsApp Number",
      email: "Email",
      address: "Full Address",
      city: "City / District",
      package: "Choose Plan",
      notes: "Notes (optional)",
      submit: "Submit Request",
      submitting: "Submitting...",
      success_title: "Request submitted!",
      success_desc: "The Kumara Hotspot team will reach out shortly.",
      error: "Submission failed. Please try again.",
      select_placeholder: "— Choose a plan —"
    },
    contact: {
      eyebrow: "Contact",
      title: "Our team is here for you, 24 hours a day.",
      whatsapp: "Chat on WhatsApp",
      email: "Email",
      phone: "Phone",
      address: "Headquarters",
      hours: "Business Hours",
      hours_value: "24/7 — Technical support · 08:00–22:00 — Customer service"
    },
    footer: {
      desc: "Kumara Hotspot — the consumer internet brand of PT. Pusaka Kreasi Mandiri. Fast, stable and affordable fiber internet.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      newsletter: "Newsletter",
      newsletter_desc: "Get promos and new-area news straight to your inbox.",
      newsletter_placeholder: "Your email",
      newsletter_cta: "Join",
      copyright: "© 2025 PT. Pusaka Kreasi Mandiri. All rights reserved.",
      links_product: ["Home Plans", "Business Plans", "Dedicated", "Coverage"],
      links_company: ["About", "Careers", "News", "Contact"],
      links_legal: ["Terms of Service", "Privacy Policy", "SLA", "Acceptable Use"]
    }
  }
};

const LanguageContext = createContext({ lang: "id", setLang: () => {}, t: translations.id });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("kumara_lang") || "id";
    } catch {
      return "id";
    }
  });

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("kumara_lang", l); } catch {}
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
