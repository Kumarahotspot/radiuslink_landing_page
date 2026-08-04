import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" }
});

export const BRAND = {
  logo: "/logos/radiuslink.png",
  logo_dark: "/logos/radiuslink.png",
  logo_light: "/logos/radiuslink.png",
  whatsapp: "628888200888",
  phone_display: "0888-8200-888",
  email: "cs@radiuslink.id",
  phone: "0888-8200-888",
  address_id: "Telaga Golf Cluster Belanda Blok E10 No.61, Sawangan, Depok, Jawa Barat 16511",
  address_en: "Telaga Golf Cluster Belanda Block E10 No.61, Sawangan, Depok, West Java 16511"
};

export const whatsappUrl = (msg = "Halo Radiuslink, saya tertarik dengan produk RADIUS Billing Anda.") =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
