import React from "react";
import { ShieldCheck, BadgeCheck, Network, Filter } from "lucide-react";
import { useT } from "../../i18n";

const ICONS = [ShieldCheck, BadgeCheck, Network, Filter];

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
              const Icon = ICONS[i];
              return (
                <div
                  key={i}
                  data-testid={`trust-badge-${i}`}
                  className="rounded-2xl border border-overlay/10 bg-card/40 p-4 hover:border-primary/30 transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div className="text-sm font-bold tracking-tight">{b.name}</div>
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
