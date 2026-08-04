import React, { useMemo, useState } from "react";
import { Calculator, TrendingDown, X, Check, ArrowRight, RotateCcw } from "lucide-react";
import { useT, formatIDR } from "../../i18n";
import { whatsappUrl } from "../../lib/api";

const DEFAULT_ITEMS_ID = [
  { key: "billing", label: "Software billing / lisensi Mikrotik user manager plus", price: 500000 },
  { key: "accountant", label: "Sewa akuntan lepas (BHP/USO + pembukuan)", price: 750000 },
  { key: "accounting_sw", label: "Software akuntansi (Accurate/Zahir/Jurnal)", price: 300000 },
  { key: "wa", label: "WhatsApp reminder tool + fee gateway", price: 200000 },
  { key: "radius", label: "Server RADIUS + maintenance", price: 500000 },
  { key: "voucher", label: "Tool voucher printing + template", price: 150000 }
];

const DEFAULT_ITEMS_EN = [
  { key: "billing", label: "Billing software / Mikrotik user manager plus", price: 500000 },
  { key: "accountant", label: "Freelance accountant (BHP/USO + bookkeeping)", price: 750000 },
  { key: "accounting_sw", label: "Accounting software (Accurate/Zahir/Jurnal)", price: 300000 },
  { key: "wa", label: "WhatsApp reminder tool + gateway fee", price: 200000 },
  { key: "radius", label: "RADIUS server + maintenance", price: 500000 },
  { key: "voucher", label: "Voucher printing tool + template", price: 150000 }
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

const defaultPrices = () =>
  DEFAULT_ITEMS_ID.reduce((acc, it) => ({ ...acc, [it.key]: it.price }), {});

export default function ROIComparison() {
  const { lang } = useT();
  const isID = lang === "id";
  const items = isID ? DEFAULT_ITEMS_ID : DEFAULT_ITEMS_EN;
  const includes = isID ? RADIUSLINK_INCLUDES_ID : RADIUSLINK_INCLUDES_EN;

  const [prices, setPrices] = useState(defaultPrices);

  const setPrice = (key, val) => {
    const num = Math.max(0, Number((val || "0").toString().replace(/\D/g, "")) || 0);
    setPrices((p) => ({ ...p, [key]: num }));
  };

  const traditionalTotal = useMemo(
    () => Object.values(prices).reduce((s, v) => s + (Number(v) || 0), 0),
    [prices]
  );
  const savingsPerMonth = Math.max(0, traditionalTotal - RADIUSLINK_PRO_PRICE);
  const savingsPerYear = savingsPerMonth * 12;
  const isWorthIt = traditionalTotal > RADIUSLINK_PRO_PRICE;

  const contactMsg = isID
    ? `Halo Radiuslink, saya barusan hitung ROI di landing dan potensi hemat Rp ${savingsPerMonth.toLocaleString("id-ID")}/bulan. Mohon info paket Pro & onboarding.`
    : `Hello Radiuslink, I just calculated my ROI and could save Rp ${savingsPerMonth.toLocaleString("id-ID")}/mo. Please share Pro plan & onboarding info.`;

  return (
    <section id="roi" data-testid="roi-section" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
            <Calculator className="h-4 w-4" />
            {isID ? "Hitung Balik Modal" : "ROI Calculator"}
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {isID ? (
              <>Berapa Anda hemat dengan <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span>?</>
            ) : (
              <>How much do you save with <span className="bg-gradient-to-br from-[#38BDF8] via-[#0EA5FF] to-[#2563EB] bg-clip-text text-transparent">Radiuslink</span>?</>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            {isID
              ? "Sesuaikan biaya bulanan Anda sekarang di kolom kiri. Angka penghematan langsung berubah — real-time."
              : "Tune your current monthly costs on the left. Savings update instantly — real-time."}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 items-stretch">
          {/* Traditional — editable */}
          <div
            data-testid="roi-traditional-card"
            className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-7 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-red-400 font-bold">
                <X className="h-4 w-4" />
                {isID ? "Biaya Anda Sekarang" : "Your Current Costs"}
              </div>
              <button
                data-testid="roi-reset"
                onClick={() => setPrices(defaultPrices())}
                className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {isID ? "Reset" : "Reset"}
              </button>
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {isID ? "Sesuaikan Angkanya" : "Adjust the Numbers"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isID ? "Ketik ulang biaya bulanan sesuai kondisi ISP Anda." : "Type in your actual monthly spend."}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {items.map((item) => (
                <li
                  key={item.key}
                  data-testid={`roi-input-row-${item.key}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 border-b border-overlay/5 pb-3"
                >
                  <div className="flex items-start gap-2 text-sm text-foreground/80 flex-1 min-w-0">
                    <X className="h-3.5 w-3.5 text-red-400/70 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="leading-snug">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 self-end sm:self-auto">
                    <span className="text-xs text-muted-foreground">Rp</span>
                    <input
                      data-testid={`roi-input-${item.key}`}
                      type="text"
                      inputMode="numeric"
                      value={(prices[item.key] || 0).toLocaleString("id-ID")}
                      onChange={(e) => setPrice(item.key, e.target.value)}
                      className="w-28 sm:w-24 md:w-28 bg-overlay/[0.04] border border-overlay/10 rounded-lg px-2 py-1.5 text-right text-sm font-mono font-semibold focus:outline-none focus:border-red-500/40 focus:bg-red-500/[0.05] transition-colors"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-red-500/20 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {isID ? "Total per bulan" : "Total per month"}
              </span>
              <div data-testid="roi-traditional-total" className="text-3xl md:text-4xl font-black text-red-400">
                {formatIDR(traditionalTotal)}
              </div>
            </div>
          </div>

          {/* Radiuslink Pro — fixed */}
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
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
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

        {/* Live savings block */}
        <div
          data-testid="roi-savings"
          className={`mt-10 rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
            isWorthIt
              ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/[0.03] to-transparent"
              : "border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/[0.03] to-transparent"
          }`}
        >
          <div className="flex items-center gap-5 flex-1">
            <div className={`h-16 w-16 rounded-2xl grid place-items-center flex-shrink-0 ${
              isWorthIt ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
            }`}>
              <TrendingDown className="h-7 w-7" strokeWidth={2} />
            </div>
            <div>
              <div className={`text-xs uppercase tracking-[0.22em] font-bold ${
                isWorthIt ? "text-emerald-400" : "text-amber-400"
              }`}>
                {isWorthIt ? (isID ? "Anda Hemat" : "You Save") : (isID ? "Setup Anda Masih Terjangkau" : "Your Setup Is Still Cheap")}
              </div>
              <div className="mt-1 text-3xl md:text-4xl font-black tracking-tight" data-testid="roi-savings-value">
                {isWorthIt ? (
                  <>
                    {formatIDR(savingsPerMonth)}
                    <span className="text-lg md:text-xl text-muted-foreground font-semibold"> / {isID ? "bulan" : "month"}</span>
                  </>
                ) : (
                  isID ? "Cek fitur lain" : "Check other benefits"
                )}
              </div>
              {isWorthIt && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {isID
                    ? <>Atau <span className={`font-bold ${isWorthIt ? "text-emerald-400" : "text-amber-400"}`}>{formatIDR(savingsPerYear)}</span> per tahun — plus otomasi & compliance BHP/USO.</>
                    : <>Or <span className={`font-bold ${isWorthIt ? "text-emerald-400" : "text-amber-400"}`}>{formatIDR(savingsPerYear)}</span> per year — plus automation & BHP/USO compliance.</>}
                </div>
              )}
              {!isWorthIt && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {isID
                    ? "Meski nominal masih setara, Anda dapat otomasi + BHP/USO compliance + support 24/7."
                    : "Even at par cost, you get automation + BHP/USO compliance + 24/7 support."}
                </div>
              )}
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
            ? "*Nilai default berdasarkan survey rata-rata operator ISP di Indonesia. Sesuaikan sesuai kondisi nyata Anda."
            : "*Default values based on averaged small–medium ISP operators in Indonesia. Adjust as needed."}
        </p>
      </div>
    </section>
  );
}
