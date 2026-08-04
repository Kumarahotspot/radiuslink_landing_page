import React, { useEffect, useMemo, useState } from "react";
import { Wifi, ArrowRight } from "lucide-react";
import { api, whatsappUrl } from "../../lib/api";
import { STATIC_PACKAGES } from "../../lib/staticData";
import { useT, formatIDR } from "../../i18n";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

// Router capacity per tier (matches feature copy in staticData / server.py)
const ROUTER_CAPACITY = {
  micro: 5,
  basic: 12,
  pro: 24,
  advanced: 50,
  ultimate: 125,
  enterprise: 250,
  custom: Infinity, // catches every request
};

// Sort tiers so we always evaluate smallest → largest
const TIER_ORDER = ["micro", "basic", "pro", "advanced", "ultimate", "enterprise", "custom"];

export default function Recommender() {
  const { t } = useT();
  const [pppoe, setPppoe] = useState([500]);
  const [routers, setRouters] = useState([10]);
  const [packages, setPackages] = useState(STATIC_PACKAGES);

  useEffect(() => {
    let mounted = true;
    api.get("/packages", { timeout: 5000 })
      .then((r) => {
        const list = r.data?.packages || [];
        if (mounted && list.length) setPackages(list);
      })
      .catch(() => { /* keep static fallback */ });
    return () => { mounted = false; };
  }, []);

  // Find smallest tier that fits BOTH pppoe and router demands
  const recommended = useMemo(() => {
    if (!packages.length) return null;
    const needPppoe = pppoe[0];
    const needRouters = routers[0];
    const orderedPkgs = TIER_ORDER
      .map((id) => packages.find((p) => p.id === id))
      .filter(Boolean);
    for (const p of orderedPkgs) {
      const maxPppoe = p.speed_mbps || 0; // speed_mbps holds Max PPPoE
      const maxRouters = ROUTER_CAPACITY[p.id] ?? 0;
      const pppoeOk = p.id === "custom" ? true : maxPppoe >= needPppoe;
      const routerOk = p.id === "custom" ? true : maxRouters >= needRouters;
      if (pppoeOk && routerOk) return p;
    }
    return orderedPkgs[orderedPkgs.length - 1] || packages[0];
  }, [packages, pppoe, routers]);

  const isContact = recommended && (!recommended.price_idr || recommended.price_idr === 0);
  const contactMsg = recommended
    ? `Halo Radiuslink, berdasarkan estimasi ${pppoe[0]} pelanggan PPPoE & ${routers[0]} router, saya butuh paket ${recommended.name}. Mohon info lebih lanjut.`
    : "Halo Radiuslink, saya butuh rekomendasi paket.";

  const selectPackage = () => {
    if (!recommended) return;
    if (isContact) {
      window.open(whatsappUrl(contactMsg), "_blank", "noopener");
      return;
    }
    document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const select = document.querySelector('[data-testid="subscribe-package-select"]');
      if (select) {
        select.value = recommended.id;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, 600);
  };

  const routerCapacityLabel = recommended
    ? ROUTER_CAPACITY[recommended.id] === Infinity
      ? "∞"
      : ROUTER_CAPACITY[recommended.id]
    : "-";

  return (
    <section data-testid="recommender-section" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="rounded-3xl border border-overlay/10 bg-card/40 backdrop-blur-xl p-8 md:p-12 gradient-border relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.recommender.eyebrow}</div>
              <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.recommender.title}</h2>
              <p className="mt-3 text-muted-foreground">{t.recommender.desc}</p>

              <div className="mt-8 space-y-7">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.recommender.pppoe_label}</label>
                    <span data-testid="recommender-pppoe-value" className="text-sm font-bold text-primary">
                      {pppoe[0].toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Slider
                    data-testid="recommender-pppoe-slider"
                    min={50}
                    max={15000}
                    step={50}
                    value={pppoe}
                    onValueChange={setPppoe}
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>50</span>
                    <span>15.000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.recommender.router_label}</label>
                    <span data-testid="recommender-router-value" className="text-sm font-bold text-primary">
                      {routers[0]}
                    </span>
                  </div>
                  <Slider
                    data-testid="recommender-router-slider"
                    min={1}
                    max={300}
                    step={1}
                    value={routers}
                    onValueChange={setRouters}
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>1</span>
                    <span>300+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              {recommended && (
                <div
                  data-testid="recommender-result"
                  className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/[0.08] to-card/60 p-7"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-bold">
                    <Wifi className="h-4 w-4" />
                    {t.recommender.result_label}
                  </div>
                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{recommended.category}</div>
                    <div className="text-2xl font-bold mt-1">{recommended.name}</div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.recommender.stat_pppoe}</div>
                      <div className="mt-1 text-2xl font-black tracking-tight">
                        {recommended.id === "custom" ? "∞" : (recommended.speed_mbps || 0).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.recommender.stat_routers}</div>
                      <div className="mt-1 text-2xl font-black tracking-tight">{routerCapacityLabel}</div>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-overlay/5">
                    {isContact ? (
                      <div className="text-2xl font-black text-primary">{t.packages.contact_us}</div>
                    ) : (
                      <>
                        <div className="text-3xl font-black text-primary">{formatIDR(recommended.price_idr)}</div>
                        <div className="text-xs text-muted-foreground">/ bulan</div>
                      </>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      data-testid="recommender-pick-cta"
                      onClick={selectPackage}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    >
                      {isContact ? t.packages.cta_contact : t.recommender.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <a
                      href={whatsappUrl(contactMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="recommender-wa-cta"
                      className="text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      atau chat via WhatsApp →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
