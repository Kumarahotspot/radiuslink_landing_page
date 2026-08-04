import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, LogIn, Ticket } from "lucide-react";
import { useT } from "../../i18n";

const SLIDES = [
  {
    id: "login",
    src: "/screenshots/slide-login.png",
    icon: LogIn,
    title_id: "Portal Login White-label",
    title_en: "White-label Login Portal",
    desc_id: "Halaman login branded — sesuaikan logo & warna dengan brand ISP Anda.",
    desc_en: "Branded login page — customise logo & colors to match your ISP brand."
  },
  {
    id: "dashboard",
    src: "/screenshots/slide-dashboard.png",
    icon: LayoutDashboard,
    title_id: "Dashboard Real-time",
    title_en: "Real-time Dashboard",
    desc_id: "Pantau pendapatan harian, pelanggan online, status router, dan tren tahunan dalam satu layar.",
    desc_en: "Track daily revenue, online users, router status, and yearly trends on a single screen."
  },
  {
    id: "voucher",
    src: "/screenshots/slide-voucher.png",
    icon: Ticket,
    title_id: "Voucher Hotspot Manager",
    title_en: "Hotspot Voucher Manager",
    desc_id: "Generate & pantau stok voucher per paket. Notifikasi otomatis saat stok menipis.",
    desc_en: "Generate & monitor voucher stock per plan. Auto-alerts on low stock."
  }
];

const AUTO_INTERVAL_MS = 6000;

export default function Slideshow() {
  const { lang, t } = useT();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  const active = SLIDES[idx];
  const ActiveIcon = active.icon;

  return (
    <section id="preview" data-testid="slideshow-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
            {lang === "id" ? "Product Tour" : "Product Tour"}
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {lang === "id" ? (
              <>Lihat <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span> beraksi</>
            ) : (
              <><span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span> in action</>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            {lang === "id"
              ? "Antarmuka modern yang dirancang untuk operasional harian ISP — dari login pelanggan hingga generate voucher massal."
              : "A modern interface built for daily ISP operations — from customer login to bulk voucher generation."}
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
          {/* Caption panel */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center flex-shrink-0">
                <ActiveIcon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground pt-3">
                {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </div>
            </div>
            <h3 data-testid="slide-title" className="text-xl md:text-2xl font-bold tracking-tight">
              {lang === "id" ? active.title_id : active.title_en}
            </h3>
            <p data-testid="slide-desc" className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              {lang === "id" ? active.desc_id : active.desc_en}
            </p>

            {/* Slide list nav */}
            <div className="mt-6 space-y-2">
              {SLIDES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    data-testid={`slide-nav-${s.id}`}
                    onClick={() => setIdx(i)}
                    className={`w-full text-left px-4 py-3 rounded-2xl border transition-all flex items-center gap-3 ${
                      i === idx
                        ? "border-primary/40 bg-primary/[0.08]"
                        : "border-overlay/10 bg-overlay/[0.02] hover:bg-overlay/[0.05]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${i === idx ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.8} />
                    <span className={`text-sm font-semibold ${i === idx ? "text-foreground" : "text-foreground/70"}`}>
                      {lang === "id" ? s.title_id : s.title_en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image frame */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div
              data-testid="slideshow-frame"
              className="relative rounded-3xl border border-overlay/10 bg-card/40 backdrop-blur-xl p-2 md:p-3 shadow-[0_0_80px_-20px] shadow-primary/25 overflow-hidden group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-overlay/10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <div className="ml-3 hidden md:block text-[10px] font-mono text-muted-foreground truncate">
                  https://app.radiuslink.id/{active.id}
                </div>
              </div>

              {/* Slides */}
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-950 rounded-b-2xl">
                {SLIDES.map((s, i) => (
                  <img
                    key={s.id}
                    src={s.src}
                    alt={lang === "id" ? s.title_id : s.title_en}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out ${
                      i === idx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* Nav arrows */}
              <button
                data-testid="slide-prev"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                data-testid="slide-next"
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  data-testid={`slide-dot-${i}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-8 bg-primary" : "w-1.5 bg-overlay/20 hover:bg-overlay/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
