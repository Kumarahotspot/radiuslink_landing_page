import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useT } from "../../i18n";

export default function FAQ() {
  const { t } = useT();
  return (
    <section data-testid="faq-section" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.faq.eyebrow}</div>
          <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.faq.title}</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 space-y-3" data-testid="faq-accordion">
          {t.faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="rounded-2xl border border-overlay/10 bg-card/40 px-5 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
