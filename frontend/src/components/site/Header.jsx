import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";
import { BRAND } from "../../lib/api";
import { Button } from "../ui/button";

const navItems = (t) => [
  { id: "home", label: t.nav.home, href: "#home" },
  { id: "packages", label: t.nav.packages, href: "#packages" },
  { id: "coverage", label: t.nav.coverage, href: "#coverage" },
  { id: "payment", label: t.nav.payment, href: "#payment" },
  { id: "about", label: t.nav.about, href: "#about" },
  { id: "contact", label: t.nav.contact, href: "#contact" }
];

export default function Header() {
  const { lang, setLang, t } = useT();
  const { theme, toggle } = useTheme();
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
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-overlay/5"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#home" data-testid="header-logo-link" className="flex items-center group">
          <img
            src={theme === "dark" ? BRAND.logo_dark : BRAND.logo_light}
            alt="Kumara Hotspot — High Speed Internet Unlimited"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems(t).map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-${item.id}`}
              className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-overlay/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="theme-toggle"
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-full border border-overlay/10 hover:bg-overlay/5 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={1.8} /> : <Moon className="h-4 w-4" strokeWidth={1.8} />}
          </button>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-overlay/10 bg-overlay/5 p-1">
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
            className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-overlay/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-overlay/5 bg-background/95 backdrop-blur-xl">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navItems(t).map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${item.id}`}
                className="px-3 py-3 text-sm rounded-lg hover:bg-overlay/5"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setLang("id")}
                data-testid="mobile-lang-id"
                className={`flex-1 px-3 py-2 text-xs rounded-full border border-overlay/10 ${
                  lang === "id" ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                Indonesia
              </button>
              <button
                onClick={() => setLang("en")}
                data-testid="mobile-lang-en"
                className={`flex-1 px-3 py-2 text-xs rounded-full border border-overlay/10 ${
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
