import React, { useState, useMemo, useEffect } from "react";
import { Check, Sparkles, MessageCircle } from "lucide-react";
import { api, whatsappUrl } from "../../lib/api";
import { STATIC_PACKAGES } from "../../lib/staticData";
import { useT, formatIDR } from "../../i18n";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const CAT_ORDER = { home: 0, premium: 1, business: 2 };
const sortPackages = (list) =>
  [...list].sort(
    (a, b) => (CAT_ORDER[a.category] ?? 99) - (CAT_ORDER[b.category] ?? 99) || a.speed_mbps - b.speed_mbps
  );

export default function Packages() {
  const { t, lang } = useT();
  const [packages, setPackages] = useState(sortPackages(STATIC_PACKAGES));
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;
    api.get("/packages", { timeout: 5000 })
      .then((res) => {
        const list = res.data?.packages || [];
        if (mounted && list.length) setPackages(sortPackages(list));
      })
      .catch(() => { /* keep static fallback */ });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? packages : packages.filter((p) => p.category === filter)),
    [packages, filter]
  );

  const selectPackage = (pkgId) => {
    const el = document.getElementById("subscribe");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const select = document.querySelector('[data-testid="subscribe-package-select"]');
      if (select) {
        select.value = pkgId;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, 600);
  };

  return (
    <section id="packages" data-testid="packages-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.packages.eyebrow}</div>
          <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.packages.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.packages.desc}</p>
        </div>

        <div className="mt-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList data-testid="packages-filter-tabs" className="bg-overlay/[0.04] border border-overlay/10 rounded-full p-1 h-auto">
              <TabsTrigger value="all" data-testid="filter-all" className="rounded-full px-4 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.packages.filter_all}
              </TabsTrigger>
              <TabsTrigger value="home" data-testid="filter-home" className="rounded-full px-4 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.packages.filter_home}
              </TabsTrigger>
              <TabsTrigger value="premium" data-testid="filter-premium" className="rounded-full px-4 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.packages.filter_premium}
              </TabsTrigger>
              <TabsTrigger value="business" data-testid="filter-business" className="rounded-full px-4 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.packages.filter_business}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((p) => {
            const allFeatures = lang === "id" ? p.features_id : p.features_en;
            const subtitle = allFeatures[0] || "";
            const features = allFeatures.slice(1);
            const isContact = !p.price_idr || p.price_idr === 0;
            const contactMsg = `Halo Radiuslink, saya tertarik dengan paket ${p.name}. Mohon info detail & penawaran.`;
            return (
              <div
                key={p.id}
                data-testid={`package-card-${p.id}`}
                className={`relative rounded-3xl p-6 md:p-7 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "border-primary/40 bg-gradient-to-b from-primary/[0.08] to-card/60 shadow-[0_0_60px_-20px] shadow-primary/30"
                    : "border-overlay/10 bg-card/40 hover:border-overlay/20"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
                    <Sparkles className="h-3 w-3" />
                    {t.packages.popular}
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{p.category}</div>
                <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
                {subtitle && (
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed min-h-[36px]">{subtitle}</p>
                )}
                <div className="mt-5">
                  {isContact ? (
                    <div className="text-3xl font-black tracking-tight text-primary">{t.packages.contact_us}</div>
                  ) : (
                    <>
                      <div className="text-3xl md:text-4xl font-black tracking-tight text-primary">{formatIDR(p.price_idr)}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.packages.per_month}</div>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-2">
                  {isContact ? (
                    <a
                      href={whatsappUrl(contactMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`package-contact-${p.id}`}
                      className="w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 text-sm font-semibold"
                    >
                      {t.packages.cta_contact}
                    </a>
                  ) : (
                    <Button
                      data-testid={`package-subscribe-${p.id}`}
                      onClick={() => selectPackage(p.id)}
                      className={`rounded-full ${
                        p.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-overlay/[0.06] hover:bg-overlay/[0.12] text-foreground border border-overlay/10"
                      }`}
                    >
                      {t.packages.cta_subscribe}
                    </Button>
                  )}
                  <a
                    href={whatsappUrl(contactMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`package-whatsapp-${p.id}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
