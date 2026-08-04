import React from "react";
import { Calculator, TrendingDown, X, Check, ArrowRight } from "lucide-react";
import { useT, formatIDR } from "../../i18n";
import { Button } from "../ui/button";
import { whatsappUrl } from "../../lib/api";

const TRADITIONAL_COSTS_ID = [
  { label: "Software billing / lisensi Mikrotik user manager plus", price: 500000 },
  { label: "Sewa akuntan lepas (BHP/USO + pembukuan)", price: 750000 },
  { label: "Software akuntansi (Accurate/Zahir/Jurnal)", price: 300000 },
  { label: "WhatsApp reminder tool + fee gateway", price: 200000 },
  { label: "Server RADIUS + maintenance", price: 500000 },
  { label: "Tool voucher printing + template", price: 150000 }
];

const TRADITIONAL_COSTS_EN = [
  { label: "Billing software / Mikrotik user manager plus", price: 500000 },
  { label: "Freelance accountant (BHP/USO + bookkeeping)", price: 750000 },
  { label: "Accounting software (Accurate/Zahir/Jurnal)", price: 300000 },
  { label: "WhatsApp reminder tool + gateway fee", price: 200000 },
  { label: "RADIUS server + maintenance", price: 500000 },
  { label: "Voucher printing tool + template", price: 150000 }
];

const RADIUSLINK_INCLUDES_ID = [
  "RADIUS Server bawaan (tidak perlu server terpisah)",
  "Billing otomatis + reminder WhatsApp",
  "Akuntansi terpadu (Laba Rugi, Neraca, Jurnal, Arus Kas)",
  "Laporan BHP & USO otomatis siap Komdigi",
  "Voucher generator massal (PDF/CSV)",
  "GenieACS TR-069 auto-provisioning",
  "Multi-router Mikrotik unlimited",
  "Support engineer 24/7"
];

const RADIUSLINK_INCLUDES_EN = [
  "Built-in RADIUS Server (no separate server needed)",
  "Auto billing + WhatsApp reminders",
  "Integrated accounting (P&L, Balance, Journal, Cash Flow)",
  "Auto BHP & USO reports ready for regulator",
  "Bulk voucher generator (PDF/CSV)",
  "GenieACS TR-069 auto-provisioning",
  "Unlimited multi-router Mikrotik",
  "24/7 engineer support"
];

const RADIUSLINK_PRO_PRICE = 900000;

export default function ROIComparison() {
  const { t, lang } = useT();
  const isID = lang === "id";
  const traditional = isID ? TRADITIONAL_COSTS_ID : TRADITIONAL_COSTS_EN;
  const includes = isID ? RADIUSLINK_INCLUDES_ID : RADIUSLINK_INCLUDES_EN;
  const traditionalTotal = traditional.reduce((sum, i) => sum + i.price, 0);
  const savingsPerMonth = traditionalTotal - RADIUSLINK_PRO_PRICE;
  const savingsPerYear = savingsPerMonth * 12;

  const contactMsg = isID
    ? `Halo Radiuslink, saya tertarik dengan paket Pro (Rp ${(RADIUSLINK_PRO_PRICE / 1000).toFixed(0)}rb/bulan). Mohon info onboarding & demo.`
    : `Hello Radiuslink, I'm interested in the Pro plan (Rp ${(RADIUSLINK_PRO_PRICE / 1000).toFixed(0)}k/mo). Please share onboarding & demo info.`;

  return (
    <section id="roi" data-testid="roi-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
            <Calculator className="h-4 w-4" />
            {isID ? "Hitung Balik Modal" : "ROI Comparison"}
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {isID ? (
              <>Kenapa <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span> lebih hemat?</>
            ) : (
              <>Why <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span> saves you money</>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            {isID
              ? "Bandingkan biaya bulanan cara lama (banyak tool + akuntan lepas) dengan satu langganan Radiuslink Pro."
              : "Compare monthly costs of the traditional way (many tools + freelance accountant) with a single Radiuslink Pro subscription."}
          </p>
        </div>

        {/* Comparison cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 items-stretch">
          {/* Traditional way */}
          <div
            data-testid="roi-traditional-card"
            className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-7 md:p-8 flex flex-col"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-red-400 font-bold">
              <X className="h-4 w-4" />
              {isID ? "Cara Lama" : "Traditional Way"}
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {isID ? "Beli & Sewa Terpisah" : "Buy & Rent Separately"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isID ? "Kombinasi tool billing + akuntansi + akuntan freelance." : "Combining billing tool + accounting software + freelancer."}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {traditional.map((item, i) => (
                <li key={i} data-testid={`roi-traditional-item-${i}`} className="flex items-center justify-between gap-3 text-sm border-b border-overlay/5 pb-3">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <X className="h-3.5 w-3.5 text-red-400/70 flex-shrink-0" strokeWidth={2.5} />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono text-sm text-foreground/70 flex-shrink-0">
                    {formatIDR(item.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-red-500/20 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {isID ? "Total per bulan" : "Total per month"}
              </span>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-black text-red-400">{formatIDR(traditionalTotal)}</div>
                <div className="text-[11px] text-muted-foreground line-through">
                  {isID ? "belum termasuk waktu terbuang" : "not including wasted time"}
                </div>
              </div>
            </div>
          </div>

          {/* Radiuslink Pro */}
          <div
            data-testid="roi-radiuslink-card"
            className="relative rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/[0.08] to-card/60 p-7 md:p-8 flex flex-col shadow-[0_0_60px_-20px] shadow-primary/30"
          >
            <div className="absolute -top-3 left-7 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
              {isID ? "Direkomendasikan" : "Recommended"}
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-bold">
              <Check className="h-4 w-4" />
              Radiuslink Pro
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {isID ? "Satu Platform, Semua Beres" : "One Platform, All Sorted"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isID ? "Semua tool + otomasi + support engineer dalam satu langganan." : "All tools + automation + engineer support in a single subscription."}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {includes.map((item, i) => (
                <li key={i} data-testid={`roi-radiuslink-item-${i}`} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-primary/20 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {isID ? "Total per bulan" : "Total per month"}
              </span>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-black text-primary">{formatIDR(RADIUSLINK_PRO_PRICE)}</div>
                <div className="text-[11px] text-muted-foreground">
                  {isID ? "sudah all-in, no hidden fee" : "all-in, no hidden fees"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Savings highlight */}
        <div
          data-testid="roi-savings"
          className="mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/[0.03] to-transparent p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5 flex-1">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-400 grid place-items-center flex-shrink-0">
              <TrendingDown className="h-7 w-7" strokeWidth={2} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-400 font-bold">
                {isID ? "Anda Hemat" : "You Save"}
              </div>
              <div className="mt-1 text-3xl md:text-4xl font-black tracking-tight">
                {formatIDR(savingsPerMonth)}
                <span className="text-lg md:text-xl text-muted-foreground font-semibold"> / {isID ? "bulan" : "month"}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {isID
                  ? <>Atau <span className="font-bold text-emerald-400">{formatIDR(savingsPerYear)}</span> per tahun — cukup untuk beli 2 router Mikrotik CCR baru.</>
                  : <>Or <span className="font-bold text-emerald-400">{formatIDR(savingsPerYear)}</span> per year — enough to buy 2 new Mikrotik CCR routers.</>}
              </div>
            </div>
          </div>
          <a
            href={whatsappUrl(contactMsg)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="roi-cta"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            {isID ? "Konsultasi Gratis" : "Free Consultation"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {isID
            ? "*Estimasi biaya cara lama berdasarkan survey rata-rata operator ISP kecil-menengah di Indonesia. Harga aktual bisa bervariasi."
            : "*Traditional cost estimate based on average small–medium ISP operators in Indonesia. Actual pricing may vary."}
        </p>
      </div>
    </section>
  );
}
