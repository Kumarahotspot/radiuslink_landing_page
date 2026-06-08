import React, { useState } from "react";
import { Search, CheckCircle2, XCircle, MapPin, Clock } from "lucide-react";
import { api } from "../../lib/api";
import { useT } from "../../i18n";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Approximate positions on a 100x60 coordinate space (W Indonesia → E)
const COVERED_AREAS = [
  { name: "Medan", x: 14, y: 17 },
  { name: "Jakarta", x: 36, y: 39 },
  { name: "Bekasi", x: 38, y: 39 },
  { name: "Tangerang", x: 35, y: 39 },
  { name: "Bogor", x: 37, y: 41 },
  { name: "Depok", x: 38, y: 40 },
  { name: "Cianjur", x: 40, y: 41 },
  { name: "Bandung", x: 41, y: 42 },
  { name: "Semarang", x: 48, y: 41 },
  { name: "Demak", x: 49, y: 40 },
  { name: "Yogyakarta", x: 49, y: 44 },
  { name: "Surabaya", x: 55, y: 42 },
  { name: "Bondowoso", x: 57, y: 43 },
  { name: "Denpasar", x: 61, y: 46 },
  { name: "Makassar", x: 71, y: 39 }
];

export default function Coverage() {
  const { t, lang } = useT();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onCheck = async (e) => {
    e?.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await api.post("/coverage/check", { location: location.trim() });
      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="coverage" data-testid="coverage-section" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.coverage.eyebrow}</div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.coverage.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.coverage.desc}</p>
        </div>

        {/* Map visualization */}
        <div className="mt-12 relative rounded-3xl border border-overlay/10 bg-card/40 overflow-hidden" data-testid="coverage-map">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.pexels.com/photos/18441167/pexels-photo-18441167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=1600"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/80" />
          </div>
          <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" className="relative w-full aspect-[100/35] md:aspect-[100/30]">
            {/* Stylized landmass outline (very abstract Indonesian archipelago hint) */}
            <g fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary) / 0.18)" strokeWidth="0.15">
              <path d="M8 15 Q15 12 22 16 Q28 18 32 17 L35 19 Q40 18 44 17 L46 19 Q42 22 38 23 Q30 24 22 22 Q14 21 8 18 Z" />
              <path d="M32 36 Q42 33 52 35 Q58 36 60 38 Q56 42 50 43 Q44 44 38 43 Q33 41 32 38 Z" />
              <path d="M52 40 Q60 39 66 41 L67 43 Q62 45 56 44 Z" />
              <path d="M67 36 Q73 35 78 37 L79 40 Q74 41 68 40 Z" />
              <path d="M80 32 Q86 33 90 36 Q88 39 83 38 Z" />
            </g>
            {/* Animated pulse circles */}
            {COVERED_AREAS.map((a, i) => (
              <g key={i} data-testid={`map-pin-${a.name.toLowerCase()}`}>
                <circle cx={a.x} cy={a.y} r="0.9" fill="hsl(var(--primary))" opacity="0.9" />
                <circle cx={a.x} cy={a.y} r="0.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.6">
                  <animate attributeName="r" from="0.9" to="3" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          <div className="relative px-5 md:px-7 py-4 border-t border-overlay/5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {lang === "id" ? "Area tercover" : "Covered areas"}
            </span>
            {COVERED_AREAS.map((a, i) => (
              <span key={i} className="text-foreground/70">{a.name}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onCheck} data-testid="coverage-form" className="mt-10 max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-overlay/10 bg-card/60 backdrop-blur-xl p-2 flex flex-col sm:flex-row gap-2 gradient-border">
            <div className="flex-1 flex items-center gap-2 px-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={1.8} />
              <Input
                data-testid="coverage-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.coverage.placeholder}
                className="border-0 bg-transparent focus-visible:ring-0 text-base py-6 px-0 placeholder:text-muted-foreground/70"
              />
            </div>
            <Button
              data-testid="coverage-submit"
              type="submit"
              disabled={loading || !location.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-6 font-semibold"
            >
              <Search className="h-4 w-4 mr-2" />
              {loading ? t.coverage.checking : t.coverage.cta}
            </Button>
          </div>
        </form>

        {error && (
          <div data-testid="coverage-error" className="mt-6 text-sm text-destructive text-center">{error}</div>
        )}

        {result && (
          <div
            data-testid="coverage-result"
            className={`mt-8 max-w-2xl mx-auto rounded-2xl border p-6 text-left ${
              result.available
                ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                : "border-amber-500/30 bg-amber-500/[0.05]"
            }`}
          >
            <div className="flex items-start gap-4">
              {result.available ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="h-8 w-8 text-amber-400 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="text-base md:text-lg font-semibold">
                  {lang === "id" ? result.message_id : result.message_en}
                </div>
                {result.available && result.estimated_install_days && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">
                    <Clock className="h-3.5 w-3.5" />
                    {t.coverage.install_label}: {result.estimated_install_days} {lang === "id" ? "hari" : "days"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
