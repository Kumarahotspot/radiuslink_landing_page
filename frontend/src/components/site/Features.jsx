import React from "react";
import { Cable, Infinity as InfinityIcon, Zap, Headphones, ShieldCheck, Globe2 } from "lucide-react";
import { useT } from "../../i18n";

const ICONS = [Cable, InfinityIcon, Zap, Headphones, ShieldCheck, Globe2];

export default function Features() {
  const { t } = useT();

  return (
    <section data-testid="features-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.features.eyebrow}</div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight max-w-2xl">{t.features.title}</h2>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-overlay/10">
              <img
                src="https://images.pexels.com/photos/17194840/pexels-photo-17194840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=420&w=700"
                alt="Fiber optic lights"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.list.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                data-testid={`feature-card-${i}`}
                className="group relative rounded-3xl border border-overlay/10 bg-card/40 p-7 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="text-lg font-bold tracking-tight">{f.title}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                <div className="absolute top-6 right-6 text-[10px] font-mono text-muted-foreground/40">0{i + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
