import React from "react";
import {
  Award, Clock, Settings, Link as LinkIcon, Zap, Map,
  FileText, CreditCard, Smartphone, Globe, Eye, ArrowLeftRight
} from "lucide-react";
import { useT } from "../../i18n";

const ICONS = [
  Award,           // Platform Unggulan
  Clock,           // Pembatasan RADIUS
  Settings,        // Integrasi GenieACS
  LinkIcon,        // Multi Koneksi / Hybrid
  Zap,             // Kecepatan Sesuai Permintaan
  Map,             // Pemetaan Jaringan
  FileText,        // Faktur Otomatis
  CreditCard,      // Gerbang Pembayaran
  Smartphone,      // Aplikasi White Label
  Globe,           // Dukungan Multi-Wilayah
  Eye,             // Transparansi
  ArrowLeftRight,  // Migrasi Mudah
];

export default function Features() {
  const { t } = useT();

  return (
    <section id="fitur" data-testid="features-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.features.eyebrow}</div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {t.features.title_prefix}{" "}
            <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">
              {t.features.title_brand}
            </span>
          </h2>
          {t.features.desc && (
            <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.features.desc}</p>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.list.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                data-testid={`feature-card-${i}`}
                className="group relative rounded-3xl border border-overlay/10 bg-card/40 p-7 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="text-lg font-bold tracking-tight">{f.title}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                <div className="absolute top-6 right-6 text-[10px] font-mono text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
