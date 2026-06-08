import React from "react";
import { Star, Quote } from "lucide-react";
import { useT } from "../../i18n";

const TESTIMONIALS = {
  id: [
    {
      name: "Rini Andriana",
      role: "Pemilik Toko Online, Jakarta",
      text: "Sejak pakai Kumara Home Pro, live streaming jualan saya lancar jaya tanpa putus. Support-nya juga responsif banget.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Bayu Pratama",
      role: "Software Engineer, Bandung",
      text: "Latency rendah dan unlimited tanpa FUP — perfect untuk WFH dan video call sehari-hari. Sudah 2 tahun langganan, zero complain.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Maya Saraswati",
      role: "Co-founder Coworking Space, Surabaya",
      text: "Kami pakai paket Business untuk 60+ user. Stabil, symmetric, dan tim NOC-nya proaktif. Highly recommended.",
      avatar: "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200&h=200",
      rating: 5
    }
  ],
  en: [
    {
      name: "Rini Andriana",
      role: "Online Store Owner, Jakarta",
      text: "Since switching to Kumara Home Pro, my live shopping streams run smoothly with zero drops. Support is incredibly responsive.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Bayu Pratama",
      role: "Software Engineer, Bandung",
      text: "Low latency and true unlimited — perfect for WFH and daily video calls. Two years in, zero complaints.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&q=80",
      rating: 5
    },
    {
      name: "Maya Saraswati",
      role: "Coworking Co-founder, Surabaya",
      text: "We use the Business plan for 60+ users. Stable, symmetric, and a proactive NOC team. Highly recommended.",
      avatar: "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200&h=200",
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
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.testimonials.title}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className="relative rounded-3xl border border-white/10 bg-card/40 p-7 hover:border-white/20 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-7 w-7 text-primary/40" />
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-5 text-foreground/85 leading-relaxed">{item.text}</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/5">
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
