import React, { useState } from "react";
import { Search, CheckCircle2, XCircle, MapPin, Clock } from "lucide-react";
import { api } from "../../lib/api";
import { useT } from "../../i18n";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/18441167/pexels-photo-18441167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-10 text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.coverage.eyebrow}</div>
        <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.coverage.title}</h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{t.coverage.desc}</p>

        <form onSubmit={onCheck} data-testid="coverage-form" className="mt-10 max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-2 flex flex-col sm:flex-row gap-2 gradient-border">
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
          <div data-testid="coverage-error" className="mt-6 text-sm text-destructive">{error}</div>
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
