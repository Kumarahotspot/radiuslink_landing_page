import React from "react";
import { ArrowRight, Zap, ShieldCheck, Headphones, MapPin } from "lucide-react";
import { useT } from "../../i18n";
import { Button } from "../ui/button";

export default function Hero() {
  const { t } = useT();

  return (
    <section id="home" data-testid="hero-section" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden grain">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/10325707/pexels-photo-10325707.png?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7">
            <div data-testid="hero-eyebrow" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t.hero.eyebrow}
            </div>
            <h1 data-testid="hero-title" className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight">
              <span className="block">{t.hero.title_1}</span>
              <span className="block">
                <span className="bg-gradient-to-br from-[#FF8A3D] via-[#FF5E00] to-[#E63946] bg-clip-text text-transparent">
                  {t.hero.title_2}
                </span>
              </span>
              <span className="block text-foreground/80">{t.hero.title_3}</span>
            </h1>
            <p data-testid="hero-desc" className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                data-testid="hero-cta-primary"
                onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-6 text-sm font-semibold"
              >
                {t.hero.cta_primary}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                data-testid="hero-cta-secondary"
                variant="outline"
                onClick={() => document.getElementById("coverage")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full px-6 py-6 text-sm font-semibold border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-foreground"
              >
                {t.hero.cta_secondary}
              </Button>
            </div>

            {/* Stat strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Zap, label: t.hero.stat_speed },
                { icon: ShieldCheck, label: t.hero.stat_uptime },
                { icon: Headphones, label: t.hero.stat_support },
                { icon: MapPin, label: t.hero.stat_cities }
              ].map((s, i) => (
                <div
                  key={i}
                  data-testid={`hero-stat-${i}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/15 text-primary grid place-items-center">
                    <s.icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div className="text-sm font-semibold leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 glow-ring rounded-full" />
              <div className="absolute inset-6 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl gradient-border">
                <div className="absolute inset-0 grid place-items-center text-center px-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Peak Download</div>
                    <div className="mt-2 text-7xl md:text-8xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                      1<span className="text-primary">G</span>
                    </div>
                    <div className="text-sm font-semibold tracking-tight text-foreground/80">Gigabit per Second</div>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live network · 99.99% up
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-2 -left-2 md:top-0 md:-left-6 rounded-2xl border border-white/10 bg-card/80 backdrop-blur p-3 shadow-2xl animate-float-slow">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Latency</div>
                <div className="text-xl font-bold">3.2 ms</div>
              </div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 rounded-2xl border border-white/10 bg-card/80 backdrop-blur p-3 shadow-2xl animate-float-slow" style={{ animationDelay: "1.5s" }}>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Jitter</div>
                <div className="text-xl font-bold">0.4 ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
