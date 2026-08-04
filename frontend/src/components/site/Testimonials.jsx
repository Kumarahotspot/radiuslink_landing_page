import React from "react";
import { Star, Quote } from "lucide-react";
import { useT } from "../../i18n";

const TESTIMONIALS = {
  id: [
    {
      name: "Ahmad Fauzi",
      role: "Owner RTRWnet Warga.Net, Bekasi",
      text: "Migrasi dari billing lama ke Radiuslink cuma 2 hari. Fitur voucher massal + reminder WhatsApp bikin operasional kami hemat 8 jam per minggu.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Dewi Kartika",
      role: "Founder JagaNet ISP, Semarang",
      text: "TR-069/ACS-nya jadi game changer. Provisioning ONT sekarang dari kantor, tanpa datang ke rumah pelanggan. Teknisi kami bisa fokus ke perbaikan urgent.",
      avatar: "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200&h=200",
      rating: 5
    },
    {
      name: "Rizky Pratama",
      role: "Tech Lead, KotaKita Fiber, Surabaya",
      text: "Kelola 15 router Mikrotik dari satu dashboard, RADIUS server built-in, integrasi QRIS. Semua ada di Radiuslink. Support engineer-nya juga responsif.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    }
  ],
  en: [
    {
      name: "Ahmad Fauzi",
      role: "Owner Warga.Net Community ISP, Bekasi",
      text: "Migration from our old billing to Radiuslink took just 2 days. The bulk voucher + WhatsApp reminder features save us 8 hours a week in operations.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Dewi Kartika",
      role: "Founder JagaNet ISP, Semarang",
      text: "The TR-069/ACS is a game changer. We now provision ONTs from the office, no more house visits. Our technicians can focus on urgent repairs.",
      avatar: "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200&h=200",
      rating: 5
    },
    {
      name: "Rizky Pratama",
      role: "Tech Lead, KotaKita Fiber, Surabaya",
      text: "Manage 15 Mikrotik routers from one dashboard, built-in RADIUS server, QRIS integration — everything in Radiuslink. Their engineers are super responsive too.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    }
  ]
};

export default function Testimonials() {
  const { t, lang } = useT();
  const items = TESTIMONIALS[lang];

  return (
    <section data-testid="testimonials-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.testimonials.eyebrow}</div>
          <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.testimonials.title}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className="relative rounded-3xl border border-overlay/10 bg-card/40 p-7 hover:border-overlay/20 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-7 w-7 text-primary/40" />
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-5 text-foreground/85 leading-relaxed">{item.text}</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-overlay/5">
                <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
