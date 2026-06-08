import React, { useEffect, useState, useMemo } from "react";
import { Check, Sparkles } from "lucide-react";
import { api } from "../../lib/api";
import { useT, formatIDR } from "../../i18n";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function Packages() {
  const { t, lang } = useT();
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/packages")
      .then((res) => {
        if (mounted) setPackages(res.data.packages || []);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
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
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.packages.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.packages.desc}</p>
        </div>

        <div className="mt-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList data-testid="packages-filter-tabs" className="bg-white/[0.04] border border-white/10 rounded-full p-1 h-auto">
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
          {loading && (
            <div className="col-span-full text-muted-foreground text-sm">Loading packages...</div>
          )}
          {filtered.map((p) => {
            const features = lang === "id" ? p.features_id : p.features_en;
            return (
              <div
                key={p.id}
                data-testid={`package-card-${p.id}`}
                className={`relative rounded-3xl p-6 md:p-7 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "border-primary/40 bg-gradient-to-b from-primary/[0.08] to-card/60 shadow-[0_0_60px_-20px] shadow-primary/30"
                    : "border-white/10 bg-card/40 hover:border-white/20"
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
                <div className="mt-5 flex items-baseline gap-2">
                  <div className="text-5xl font-black tracking-tight">{p.speed_mbps}</div>
                  <div className="text-sm text-muted-foreground">{t.packages.mbps}</div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-primary">{formatIDR(p.price_idr)}</div>
                  <div className="text-xs text-muted-foreground">{t.packages.per_month}</div>
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  data-testid={`package-subscribe-${p.id}`}
                  onClick={() => selectPackage(p.id)}
                  className={`mt-7 rounded-full ${
                    p.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-foreground border border-white/10"
                  }`}
                >
                  {t.packages.cta_subscribe}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
