import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, MessageSquare, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { adminApi } from "./api";
import { formatIDR } from "../i18n";

const StatCard = ({ icon: Icon, label, value, onClick, testid }) => (
  <button
    onClick={onClick}
    data-testid={testid}
    className="text-left rounded-3xl border border-overlay/10 bg-card/40 p-6 hover:border-primary/30 hover:bg-card/60 transition-all group"
  >
    <div className="flex items-center justify-between">
      <div className="h-11 w-11 rounded-2xl bg-primary/15 text-primary grid place-items-center">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
    <div className="mt-5 text-3xl font-black tracking-tight">{value}</div>
    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{label}</div>
  </button>
);

export default function AdminDashboard() {
  const nav = useNavigate();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    Promise.all([
      adminApi.get("/packages"),
      adminApi.get("/subscriptions"),
      adminApi.get("/contacts"),
      adminApi.get("/coverage-areas")
    ]).then(([p, s, c, a]) => {
      setStats({
        packages: p.data.packages.length,
        subscriptions: s.data.subscriptions.length,
        contacts: c.data.contacts.length,
        areas: a.data.areas.filter((x) => x.active).length
      });
      setRecent(s.data.subscriptions.slice(0, 5));
    }).catch(() => {});
  }, []);

  if (!stats) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Dashboard</div>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">Selamat datang</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan aktivitas Kumara Hotspot</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Paket Aktif" value={stats.packages} onClick={() => nav("/admin/packages")} testid="stat-packages" />
        <StatCard icon={Users} label="Pendaftaran" value={stats.subscriptions} onClick={() => nav("/admin/subscriptions")} testid="stat-subscriptions" />
        <StatCard icon={MessageSquare} label="Pesan Kontak" value={stats.contacts} onClick={() => nav("/admin/contacts")} testid="stat-contacts" />
        <StatCard icon={MapPin} label="Coverage Area" value={stats.areas} onClick={() => nav("/admin/coverage")} testid="stat-areas" />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold tracking-tight mb-4">Pendaftaran Terbaru</h2>
        {recent.length === 0 ? (
          <div className="rounded-2xl border border-overlay/10 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            Belum ada pendaftaran.
          </div>
        ) : (
          <div className="rounded-2xl border border-overlay/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-overlay/[0.04] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3">Nama</th>
                  <th className="text-left px-5 py-3">Paket</th>
                  <th className="text-left px-5 py-3">Kota</th>
                  <th className="text-left px-5 py-3">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id} className="border-t border-overlay/5">
                    <td className="px-5 py-3 font-medium">{s.name}</td>
                    <td className="px-5 py-3">{s.package_id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.city || "—"}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
