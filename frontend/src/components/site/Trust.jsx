import React from "react";
import { useT } from "../../i18n";

const BADGES = [
  {
    key: "apjii",
    name: "APJII",
    logo: "/logos/apjii.png",
    site: "https://www.apjii.or.id",
    dark_bg: false
  },
  {
    key: "komdigi",
    name: "Komdigi",
    logo: "/logos/komdigi.png",
    site: "https://www.komdigi.go.id",
    dark_bg: false
  },
  {
    key: "idnic",
    name: "ID-NIC",
    logo: "/logos/idnic.png",
    site: "https://idnic.id",
    dark_bg: false
  },
  {
    key: "ipositif",
    name: "Internet Positif",
    logo: "/logos/internet-positif.png",
    site: "https://internetpositif.id",
    dark_bg: true
  }
];

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
              const meta = BADGES[i];
              return (
                <a
                  key={i}
                  href={meta?.site || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`trust-badge-${i}`}
                  className="rounded-2xl border border-overlay/10 bg-card/60 p-5 hover:border-primary/30 hover:bg-card transition-all flex flex-col items-center text-center group"
                >
                  <div className={`h-16 w-full grid place-items-center rounded-xl px-3 py-2 ring-1 ring-overlay/10 ${meta?.dark_bg ? "bg-neutral-900" : "bg-white"}`}>
                    <img
                      src={meta?.logo}
                      alt={meta?.name || b.name}
                      className="max-h-12 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-sm font-bold tracking-tight">{b.name}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground leading-snug">{b.desc}</div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
