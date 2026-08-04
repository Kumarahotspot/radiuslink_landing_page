import React from "react";
import { Globe } from "lucide-react";
import { useT } from "../../i18n";
import { STATIC_CLIENTS, STATIC_INTEGRATIONS } from "../../lib/staticData";

const formatCount = (n) => new Intl.NumberFormat("id-ID").format(n);

function ClientLogo({ client, size = "md" }) {
  const boxH = size === "lg" ? "h-16" : "h-14";
  const imgH = size === "lg" ? "max-h-12" : "max-h-10";
  if (client.logo) {
    return (
      <div className={`${boxH} w-full rounded-2xl bg-white/90 grid place-items-center px-3 py-2 ring-1 ring-overlay/10`}>
        <img
          src={client.logo}
          alt={client.name}
          className={`${imgH} max-w-full object-contain`}
          loading="lazy"
        />
      </div>
    );
  }
  // Fallback: colored badge with globe icon + initials
  const initials = client.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className={`${boxH} w-full rounded-2xl grid place-items-center px-3 py-2`} style={{ backgroundColor: `${client.accent}18` }}>
      <div className="flex items-center gap-3">
        <Globe className="h-6 w-6" style={{ color: client.accent }} strokeWidth={1.8} />
        <div className="text-xs uppercase tracking-[0.22em] font-bold" style={{ color: client.accent }}>
          {initials}
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const { t } = useT();
  return (
    <section id="coverage" data-testid="clients-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Pelanggan Berharga Kami */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
            {t.coverage.eyebrow}
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {t.coverage.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            {t.coverage.desc}
          </p>
        </div>

        {/* Client cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATIC_CLIENTS.map((c) => (
            <div
              key={c.id}
              data-testid={`client-card-${c.id}`}
              className="rounded-3xl border border-overlay/10 bg-card/40 p-6 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-16 flex items-center">
                <ClientLogo client={c} />
              </div>
              <div className="mt-5 text-base font-bold tracking-tight">{c.name}</div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-semibold">
                  {c.online ? t.coverage.status_online : t.coverage.status_offline}
                </span>
              </div>
              <div className="mt-5 pt-5 border-t border-overlay/5 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.coverage.pppoe_label}
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight">
                    {formatCount(c.pppoe)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.coverage.hotspot_label}
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight">
                    {formatCount(c.hotspot)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations strip */}
        <div className="mt-24 md:mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              {t.coverage.integrations_title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.coverage.integrations_desc}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            {STATIC_INTEGRATIONS.map((i) => (
              <div
                key={i.id}
                data-testid={`integration-logo-${i.id}`}
                className="rounded-2xl border border-overlay/10 bg-white/90 px-6 py-4 min-w-[200px] h-20 flex items-center justify-center hover:ring-2 hover:ring-primary/30 transition-all"
              >
                {i.logo ? (
                  <img
                    src={i.logo}
                    alt={i.name}
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <Globe className="h-8 w-8" style={{ color: i.accent }} strokeWidth={1.6} />
                    <span className="text-sm font-bold text-neutral-800">{i.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
