import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { api } from "../../lib/api";
import { useT } from "../../i18n";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const initial = { name: "", phone: "", email: "", address: "", city: "", package_id: "", notes: "" };

export default function Subscribe() {
  const { t } = useT();
  const [form, setForm] = useState(initial);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("/packages").then((res) => setPackages(res.data.packages || [])).catch(() => {});
  }, []);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address || !form.package_id) return;
    setLoading(true);
    try {
      await api.post("/subscriptions", form);
      setSuccess(true);
      setForm(initial);
      toast.success(t.subscribe.success_title, { description: t.subscribe.success_desc });
    } catch (err) {
      toast.error(t.subscribe.error, { description: err?.response?.data?.detail || "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="subscribe" data-testid="subscribe-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left intro */}
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.subscribe.eyebrow}</div>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.subscribe.title}</h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">{t.subscribe.desc}</p>

            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/4008780/pexels-photo-4008780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=520&w=780"
                alt="Happy family using the internet at home"
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <form
              data-testid="subscribe-form"
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl p-6 md:p-8 gradient-border relative"
            >
              {success && (
                <div data-testid="subscribe-success" className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">{t.subscribe.success_title}</div>
                    <div className="text-sm text-muted-foreground">{t.subscribe.success_desc}</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.name}</Label>
                  <Input
                    data-testid="subscribe-input-name"
                    required
                    value={form.name}
                    onChange={onChange("name")}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary h-12"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.phone}</Label>
                  <Input
                    data-testid="subscribe-input-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary h-12"
                    placeholder="+62 …"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.email}</Label>
                  <Input
                    data-testid="subscribe-input-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary h-12"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.city}</Label>
                  <Input
                    data-testid="subscribe-input-city"
                    value={form.city}
                    onChange={onChange("city")}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary h-12"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.address}</Label>
                  <Input
                    data-testid="subscribe-input-address"
                    required
                    value={form.address}
                    onChange={onChange("address")}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary h-12"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.package}</Label>
                  <select
                    data-testid="subscribe-package-select"
                    required
                    value={form.package_id}
                    onChange={onChange("package_id")}
                    className="mt-2 w-full h-12 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="" disabled>{t.subscribe.select_placeholder}</option>
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.speed_mbps} Mbps
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.subscribe.notes}</Label>
                  <Textarea
                    data-testid="subscribe-input-notes"
                    value={form.notes}
                    onChange={onChange("notes")}
                    rows={3}
                    className="mt-2 bg-background/60 border-white/10 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <Button
                data-testid="subscribe-submit"
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-sm font-bold group"
              >
                {loading ? t.subscribe.submitting : t.subscribe.submit}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
