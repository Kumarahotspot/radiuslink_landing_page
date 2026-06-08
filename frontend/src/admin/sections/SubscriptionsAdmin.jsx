import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Loader2, Search } from "lucide-react";
import { adminApi } from "../api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const STATUS_OPTIONS = ["new", "contacted", "scheduled", "installed", "cancelled"];

const STATUS_COLORS = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  scheduled: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  installed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30"
};

export default function SubscriptionsAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    adminApi.get("/subscriptions")
      .then((r) => setSubs(r.data.subscriptions))
      .catch(() => toast.error("Gagal load"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const onStatusChange = async (s, newStatus) => {
    try {
      await adminApi.put(`/subscriptions/${s.id}/status`, { status: newStatus });
      setSubs((arr) => arr.map((x) => x.id === s.id ? { ...x, status: newStatus } : x));
      toast.success("Status diperbarui");
    } catch {
      toast.error("Gagal update status");
    }
  };

  const onDelete = async (s) => {
    if (!window.confirm(`Hapus pendaftaran ${s.name}?`)) return;
    try {
      await adminApi.delete(`/subscriptions/${s.id}`);
      setSubs((arr) => arr.filter((x) => x.id !== s.id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal hapus");
    }
  };

  const filtered = subs.filter((s) => {
    if (!filter.trim()) return true;
    const q = filter.toLowerCase();
    return [s.name, s.phone, s.email, s.address, s.city, s.package_id, s.status]
      .some((v) => (v || "").toLowerCase().includes(q));
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Pendaftaran</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Pendaftaran Pelanggan</h1>
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            data-testid="sub-search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Cari nama, telepon, paket..."
            className="pl-9 h-10"
          />
        </div>
      </div>

      {loading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : (
        <div className="rounded-3xl border border-overlay/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-overlay/[0.04] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3">Nama / Kontak</th>
                <th className="text-left px-5 py-3">Alamat</th>
                <th className="text-left px-5 py-3">Paket</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Tanggal</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">Tidak ada data</td></tr>
              ) : filtered.map((s) => (
                <tr key={s.id} data-testid={`sub-row-${s.id}`} className="border-t border-overlay/5 hover:bg-overlay/[0.02]">
                  <td className="px-5 py-4">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.phone}</div>
                    <div className="text-xs text-muted-foreground">{s.email}</div>
                  </td>
                  <td className="px-5 py-4 text-xs max-w-xs">
                    {s.address}
                    {s.city && <div className="text-muted-foreground">{s.city}</div>}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs">{s.package_id}</td>
                  <td className="px-5 py-4">
                    <select
                      data-testid={`sub-status-${s.id}`}
                      value={s.status}
                      onChange={(e) => onStatusChange(s, e.target.value)}
                      className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${STATUS_COLORS[s.status] || "bg-overlay/5"}`}
                    >
                      {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString("id-ID")}</td>
                  <td className="px-5 py-4 text-right">
                    <Button data-testid={`sub-delete-${s.id}`} onClick={() => onDelete(s)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
