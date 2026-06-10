import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useT } from "../../i18n";
import { whatsappUrl } from "../../lib/api";
import { STATIC_PROMO } from "../../lib/staticData";

export default function PromoBanner() {
  const { lang } = useT();
  const settings = STATIC_PROMO;
  const initialDismissed = (() => {
    try {
      return !!sessionStorage.getItem("kumara_promo_dismissed");
    } catch (_err) {
      return false;
    }
  })();
  const [visible, setVisible] = useState(settings.active && !initialDismissed);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("kumara_promo_dismissed", "1");
    } catch (_err) { /* ignore */ }
  };

  if (!visible) return null;

  const tag = lang === "en" ? settings.tag_en : settings.tag_id;
  const text = lang === "en" ? settings.text_en : settings.text_id;
  const cta = lang === "en" ? settings.cta_en : settings.cta_id;
  const ctaMessage = lang === "en" ? settings.cta_message_en : settings.cta_message_id;

  return (
    <div data-testid="promo-banner" className="relative z-[60] bg-gradient-to-r from-primary via-[#ff7a2a] to-accent text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-2.5 flex items-center gap-3 text-xs md:text-sm">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/20 font-bold uppercase tracking-wider text-[10px] flex-shrink-0">
          <Sparkles className="h-3 w-3" />
          {tag}
        </span>
        <span className="flex-1 truncate font-medium">{text}</span>
        <a
          href={whatsappUrl(ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="promo-cta"
          className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-black/20 hover:bg-black/30 font-semibold transition-colors flex-shrink-0"
        >
          {cta} →
        </a>
        <button
          data-testid="promo-dismiss"
          onClick={dismiss}
          className="h-7 w-7 grid place-items-center rounded-full hover:bg-black/20 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
