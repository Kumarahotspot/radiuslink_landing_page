import React, { useEffect, useMemo, useState } from "react";
import { Wifi, ArrowRight } from "lucide-react";
import { api, whatsappUrl } from "../../lib/api";
import { useT, formatIDR } from "../../i18n";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export default function Recommender() {
  const { t } = useT();
  const [devices, setDevices] = useState([3]);
  const [usage, setUsage] = useState(1); // 0..3
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api.get("/packages").then((r) => setPackages(r.data.packages || [])).catch(() => {});
  }, []);

  // Score each package and pick best fit based on devices + usage intensity
  const recommended = useMemo(() => {
    if (!packages.length) return null;
    const d = devices[0];
    // target Mbps heuristic: usage tier × 10 + devices × 4
    const targetMbps = (usage + 1) * 10 + d * 4;
    let best = null;
    let bestScore = Infinity;
    for (const p of packages) {
      // prefer the smallest plan that meets or exceeds target
      if (p.speed_mbps >= targetMbps) {
        const score = p.speed_mbps - targetMbps;
        if (score < bestScore) {
          bestScore = score;
          best = p;
        }
      }
    }
    return best || packages[packages.length - 1];
  }, [packages, devices, usage]);

  const selectPackage = () => {
    if (!recommended) return;
    document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const select = document.querySelector('[data-testid="subscribe-package-select"]');
      if (select) {
        select.value = recommended.id;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, 600);
  };

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
                    <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.recommender.devices_label}</label>
                    <span data-testid="recommender-devices-value" className="text-sm font-bold text-primary">{devices[0]}</span>
                  </div>
                  <Slider
                    data-testid="recommender-devices-slider"
                    min={1}
                    max={15}
                    step={1}
                    value={devices}
                    onValueChange={setDevices}
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground block mb-3">{t.recommender.usage_label}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {t.recommender.usage_options.map((opt, i) => (
                      <button
                        key={i}
                        data-testid={`recommender-usage-${i}`}
                        onClick={() => setUsage(i)}
                        className={`text-left text-sm px-4 py-3 rounded-2xl border transition-all ${
                          usage === i
                            ? "border-primary/40 bg-primary/[0.08] text-foreground"
                            : "border-overlay/10 bg-overlay/[0.02] hover:bg-overlay/[0.05] text-foreground/80"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
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
                    <div className="text-xl font-bold mt-1">{recommended.name}</div>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <div data-testid="recommender-mbps" className="text-5xl font-black tracking-tight">{recommended.speed_mbps}</div>
                    <div className="text-sm text-muted-foreground">Mbps</div>
                  </div>
                  <div className="mt-1 text-2xl font-bold text-primary">{formatIDR(recommended.price_idr)}</div>
                  <div className="text-xs text-muted-foreground">/ bulan</div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      data-testid="recommender-pick-cta"
                      onClick={selectPackage}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    >
                      {t.recommender.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <a
                      href={whatsappUrl(`Halo Kumara, saya tertarik paket ${recommended.name} (${recommended.speed_mbps} Mbps).`)}
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
