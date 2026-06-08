import React from "react";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useT } from "../../i18n";
import { BRAND, whatsappUrl } from "../../lib/api";
import { Button } from "../ui/button";

export default function Contact() {
  const { t, lang } = useT();
  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.contact.eyebrow}</div>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.contact.title}</h2>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="contact-whatsapp-cta"
                className="mt-8 bg-emerald-500 hover:bg-emerald-500/90 text-white rounded-full px-6 py-6 font-semibold"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t.contact.whatsapp}
              </Button>
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Mail, label: t.contact.email, value: BRAND.email, testid: "contact-email" },
              { icon: Phone, label: t.contact.phone, value: BRAND.phone, testid: "contact-phone" },
              { icon: MapPin, label: t.contact.address, value: lang === "id" ? BRAND.address_id : BRAND.address_en, testid: "contact-address" },
              { icon: Clock, label: t.contact.hours, value: t.contact.hours_value, testid: "contact-hours" }
            ].map((c, i) => (
              <div
                key={i}
                data-testid={c.testid}
                className="rounded-2xl border border-overlay/10 bg-card/40 p-6 hover:border-primary/30 transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center mb-4">
                  <c.icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</div>
                <div className="mt-1 text-sm md:text-base font-semibold leading-snug">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
