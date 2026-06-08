import React, { useState } from "react";
import { Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";
import { BRAND } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  const { t } = useT();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer data-testid="site-footer" className="border-t border-overlay/5 bg-card/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <img src={theme === "dark" ? BRAND.logo_dark : BRAND.logo_light} alt="Kumara Hotspot" className="h-14 md:h-16 w-auto object-contain" />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">PT. Pusaka Kreasi Mandiri</div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">{t.footer.desc}</p>

            <form onSubmit={onNewsletter} data-testid="newsletter-form" className="mt-7">
              <div className="text-xs uppercase tracking-[0.22em] text-foreground/70 font-semibold">{t.footer.newsletter}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t.footer.newsletter_desc}</div>
              <div className="mt-3 flex gap-2 max-w-md">
                <Input
                  data-testid="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter_placeholder}
                  className="bg-background/60 border-overlay/10 h-11"
                />
                <Button
                  data-testid="newsletter-submit"
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-11"
                >
                  {t.footer.newsletter_cta}
                </Button>
              </div>
              {subscribed && (
                <div data-testid="newsletter-success" className="mt-2 text-xs text-emerald-400">Thank you!</div>
              )}
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterCol title={t.footer.product} items={t.footer.links_product} testid="footer-col-product" />
            <FooterCol title={t.footer.company} items={t.footer.links_company} testid="footer-col-company" />
            <FooterCol title={t.footer.legal} items={t.footer.links_legal} testid="footer-col-legal" />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-overlay/5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4 flex-wrap">
            <span data-testid="footer-copyright">{t.footer.copyright}</span>
            <span data-testid="footer-status" className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {t.status.label} · {t.status.operational}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-testid={`footer-social-${i}`}
                aria-label="social link"
                className="h-9 w-9 grid place-items-center rounded-full border border-overlay/10 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, testid }) {
  return (
    <div data-testid={testid}>
      <div className="text-xs uppercase tracking-[0.22em] text-foreground/70 font-semibold">{title}</div>
      <ul className="mt-4 space-y-2">
        {items.map((it, i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{it}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
