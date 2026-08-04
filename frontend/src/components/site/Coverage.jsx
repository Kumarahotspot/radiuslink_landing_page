import React, { useState } from "react";
import { Search, CheckCircle2, XCircle, MapPin, Clock } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { api } from "../../lib/api";
import { STATIC_COVERED_SLUGS } from "../../lib/staticData";
import { useT } from "../../i18n";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// World atlas TopoJSON (will filter to Indonesia only)
const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Real geographic coordinates [lon, lat]
const COVERED_AREAS = [
  { name: "Medan",       coords: [98.67, 3.59] },
  { name: "Jakarta",     coords: [106.85, -6.21] },
  { name: "Bekasi",      coords: [106.99, -6.24] },
  { name: "Tangerang",   coords: [106.63, -6.18] },
  { name: "Bogor",       coords: [106.79, -6.59] },
  { name: "Depok",       coords: [106.81, -6.40] },
  { name: "Cianjur",     coords: [107.14, -6.81] },
  { name: "Bandung",     coords: [107.61, -6.92] },
  { name: "Semarang",    coords: [110.42, -6.97] },
  { name: "Demak",       coords: [110.64, -6.89] },
  { name: "Yogyakarta",  coords: [110.36, -7.80] },
  { name: "Surabaya",    coords: [112.75, -7.25] },
  { name: "Bondowoso",   coords: [113.82, -7.91] },
  { name: "Denpasar",    coords: [115.21, -8.65] },
  { name: "Makassar",    coords: [119.41, -5.13] }
];

const PROJECTION_CONFIG = {
  center: [118, -2.5],
  scale: 1100
};

export default function Coverage() {
  const { t, lang } = useT();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(null);

  const onCheck = async (e) => {
    e?.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    const loc = location.trim();
    try {
      const res = await api.post("/coverage/check", { location: loc }, { timeout: 5000 });
      setResult(res.data);
    } catch (err) {
      // Backend unreachable -> client-side fallback
      const locLower = loc.toLowerCase();
      const available = STATIC_COVERED_SLUGS.some((slug) => locLower.includes(slug));
      setResult(
        available
          ? {
              location: loc,
              available: true,
              message_id: `Bagus! Radiuslink sudah punya klien/engineer di area ${loc}. Kami siap onboarding secepatnya.`,
              message_en: `Great! Radiuslink already has clients/engineers in ${loc}. We can onboard you fast.`,
              estimated_install_days: 3
            }
          : {
              location: loc,
              available: false,
              message_id: `Kami belum punya engineer onsite di ${loc}, tapi Radiuslink tetap bisa dipakai remote. Tim kami akan follow up.`,
              message_en: `We don't have on-site engineers in ${loc} yet, but Radiuslink still works fully remote. Our team will follow up.`,
              estimated_install_days: null
            }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="coverage" data-testid="coverage-section" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.coverage.eyebrow}</div>
          <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.coverage.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.coverage.desc}</p>
        </div>

        {/* Indonesia Map */}
        <div
          className="mt-12 relative rounded-3xl border border-overlay/10 bg-card/40 overflow-hidden"
          data-testid="coverage-map"
        >
          <div className="relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={PROJECTION_CONFIG}
              width={1000}
              height={420}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <Geographies geography={TOPO_URL}>
                {({ geographies }) =>
                  geographies
                    .filter((d) => d.properties.name === "Indonesia")
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(var(--primary) / 0.08)"
                        stroke="hsl(var(--primary) / 0.35)"
                        strokeWidth={0.6}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "hsl(var(--primary) / 0.15)" },
                          pressed: { outline: "none" }
                        }}
                      />
                    ))
                }
              </Geographies>

              {COVERED_AREAS.map((area, i) => (
                <Marker
                  key={area.name}
                  coordinates={area.coords}
                  data-testid={`map-pin-${area.name.toLowerCase()}`}
                  onMouseEnter={() => setHovered(area.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <g style={{ cursor: "pointer" }}>
                    {/* outer pulse */}
                    <circle r="8" fill="hsl(var(--primary))" opacity="0.0">
                      <animate attributeName="r" from="3" to="14" dur="2s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
                    </circle>
                    {/* dot */}
                    <circle r="3.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1" />
                    {hovered === area.name && (
                      <g transform="translate(0, -10)">
                        <rect x="-30" y="-16" width="60" height="16" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                        <text textAnchor="middle" y="-4" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">
                          {area.name}
                        </text>
                      </g>
                    )}
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          </div>

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
