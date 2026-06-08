import React from "react";
import { useT } from "../../i18n";

export default function Marquee() {
  const { t } = useT();
  const items = [...t.marquee, ...t.marquee];
  return (
    <section data-testid="marquee-section" className="py-6 border-y border-white/5 bg-white/[0.015] overflow-hidden">
      <div className="relative">
        <div className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform">
          {items.map((label, i) => (
            <div key={i} className="flex items-center gap-12 text-xs md:text-sm uppercase tracking-[0.32em] text-muted-foreground">
              <span>{label}</span>
              <span className="text-primary">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
