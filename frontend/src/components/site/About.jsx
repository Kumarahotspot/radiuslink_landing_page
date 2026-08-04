import React from "react";
import { useT } from "../../i18n";

export default function About() {
  const { t } = useT();

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden border border-overlay/10">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&w=900&q=85"
                alt="Modern data center"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5">
                <div className="text-2xl font-black text-primary">{t.about.stats[0].value}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.about.stats[0].label}</div>
              </div>
              <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5">
                <div className="text-2xl font-black text-primary">{t.about.stats[3].value}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.about.stats[3].label}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.about.eyebrow}</div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.about.title}</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">{t.about.p1}</p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{t.about.p2}</p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {t.about.stats.map((s, i) => (
                <div
                  key={i}
                  data-testid={`about-stat-${i}`}
                  className="rounded-2xl border border-overlay/10 bg-gradient-to-b from-overlay/[0.03] to-transparent p-5"
                >
                  <div className="text-3xl md:text-4xl font-black tracking-tight text-primary">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
