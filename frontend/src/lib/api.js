import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" }
});

export const BRAND = {
  logo: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/jxj1q6vc_LOGO_KUMARA_TEXT_HITAM__1_-removebg-preview%20%282%29.png",
  whatsapp: "6281234567890",
  email: "halo@kumarahotspot.id",
  phone: "+62 21 5000 9090",
  address_id: "Jl. Cikini Raya No. 88, Menteng, Jakarta Pusat 10330",
  address_en: "Jl. Cikini Raya No. 88, Menteng, Central Jakarta 10330"
};

export const whatsappUrl = (msg = "Halo Kumara Hotspot, saya ingin berlangganan.") =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
