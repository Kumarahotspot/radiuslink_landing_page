import React from "react";
import { Router, Wifi, Shield, Cpu } from "lucide-react";
import { useT } from "../../i18n";

const BADGE_ICONS = [Router, Wifi, Shield, Cpu];

export default function Trust() {
  const { t } = useT();
  return (
    <section data-testid="trust-section" className="py-16 md:py-20 border-y border-overlay/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.trust.eyebrow}</div>
            <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight">{t.trust.title}</h3>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.trust.badges.map((b, i) => {
              const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <div
                  key={i}
                  data-testid={`trust-badge-${i}`}
                  className="rounded-2xl border border-overlay/10 bg-card/60 p-5 hover:border-primary/30 hover:bg-card transition-all flex flex-col items-center text-center group"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <div className="mt-3 text-sm font-bold tracking-tight">{b.name}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground leading-snug">{b.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
