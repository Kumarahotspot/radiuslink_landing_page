import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" }
});

export const BRAND = {
  logo: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/0ag0tbhr_LOGO%20KUMARA%20TEXT%20PUTIH.png",
  logo_dark: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/0ag0tbhr_LOGO%20KUMARA%20TEXT%20PUTIH.png",
  logo_light: "https://customer-assets.emergentagent.com/job_network-manager-19/artifacts/jxj1q6vc_LOGO_KUMARA_TEXT_HITAM__1_-removebg-preview%20%282%29.png",
  whatsapp: "628888200888",
  phone_display: "0888-8200-888",
  email: "cs@kumarahotspot.com",
  phone: "0888-8200-888",
  address_id: "Telaga Golf Cluster Belanda Blok E10 No.61, Sawangan, Depok, Jawa Barat 16511",
  address_en: "Telaga Golf Cluster Belanda Block E10 No.61, Sawangan, Depok, West Java 16511"
};

export const whatsappUrl = (msg = "Halo Kumara Hotspot, saya ingin berlangganan.") =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
