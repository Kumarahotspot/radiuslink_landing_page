import React from "react";
import { Landmark, QrCode, Store, Wallet, Check, Info } from "lucide-react";
import { useT } from "../../i18n";

const ICONS = [Landmark, QrCode, Store, Wallet];

export default function Payment() {
  const { t } = useT();

  return (
    <section id="payment" data-testid="payment-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.payment.eyebrow}</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{t.payment.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.payment.desc}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.payment.categories.map((cat, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                data-testid={`payment-card-${i}`}
                className="rounded-3xl border border-white/10 bg-card/40 p-7 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="text-lg font-bold tracking-tight">{cat.name}</div>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          data-testid="payment-note"
          className="mt-8 inline-flex items-start gap-3 px-5 py-3 rounded-2xl border border-primary/20 bg-primary/[0.05] text-sm text-foreground/85"
        >
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <span>{t.payment.note}</span>
        </div>
      </div>
    </section>
  );
}
