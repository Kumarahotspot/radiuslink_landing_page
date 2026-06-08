import React from "react";
import { useT } from "../../i18n";

export default function Comparison() {
  const { t } = useT();
  return (
    <section data-testid="comparison-section" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.compare.eyebrow}</div>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.compare.title}</h2>
        </div>

        <div className="mt-10 rounded-3xl border border-overlay/10 overflow-hidden">
          <table data-testid="comparison-table" className="w-full text-sm">
            <thead>
              <tr className="bg-overlay/[0.04]">
                {t.compare.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left px-5 md:px-7 py-4 text-xs uppercase tracking-[0.18em] font-bold ${
                      i === 1 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, i) => (
                <tr
                  key={i}
                  data-testid={`comparison-row-${i}`}
                  className="border-t border-overlay/5 hover:bg-overlay/[0.02] transition-colors"
                >
                  <td className="px-5 md:px-7 py-4 font-medium">{row[0]}</td>
                  <td className="px-5 md:px-7 py-4 font-semibold text-primary">{row[1]}</td>
                  <td className="px-5 md:px-7 py-4 text-muted-foreground">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
