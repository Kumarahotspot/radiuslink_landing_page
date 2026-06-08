import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useT } from "../../i18n";
import { BRAND } from "../../lib/api";
import { Button } from "../ui/button";

const navItems = (t) => [
  { id: "home", label: t.nav.home, href: "#home" },
  { id: "packages", label: t.nav.packages, href: "#packages" },
  { id: "coverage", label: t.nav.coverage, href: "#coverage" },
  { id: "about", label: t.nav.about, href: "#about" },
  { id: "contact", label: t.nav.contact, href: "#contact" }
];

export default function Header() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 h-20 md:h-28 flex items-center justify-between">
        <a href="#home" data-testid="header-logo-link" className="flex items-center group">
          <img
            src={BRAND.logo}
            alt="Kumara Hotspot — High Speed Internet Unlimited"
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems(t).map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-${item.id}`}
              className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              data-testid="lang-id-btn"
              onClick={() => setLang("id")}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
                lang === "id" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Globe className="h-3 w-3" /> ID
            </button>
            <button
              data-testid="lang-en-btn"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <Button
            data-testid="header-subscribe-cta"
            onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
          >
            {t.nav.subscribe}
          </Button>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navItems(t).map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${item.id}`}
                className="px-3 py-3 text-sm rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setLang("id")}
                data-testid="mobile-lang-id"
                className={`flex-1 px-3 py-2 text-xs rounded-full border border-white/10 ${
                  lang === "id" ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                Indonesia
              </button>
              <button
                onClick={() => setLang("en")}
                data-testid="mobile-lang-en"
                className={`flex-1 px-3 py-2 text-xs rounded-full border border-white/10 ${
                  lang === "en" ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                English
              </button>
            </div>
            <Button
              data-testid="mobile-subscribe-cta"
              onClick={() => {
                setOpen(false);
                document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              {t.nav.subscribe}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
