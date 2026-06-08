import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Star, Loader2 } from "lucide-react";
import { adminApi } from "../api";
import { formatIDR } from "../../i18n";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

const empty = {
  id: "", name: "", category: "home",
  speed_mbps: 0, broadband_mbps: 0, price_idr: 0, popular: false,
  features_id: "", features_en: ""
};

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => {
    setLoading(true);
    adminApi.get("/packages")
      .then((r) => setPackages(r.data.packages))
      .catch(() => toast.error("Gagal load paket"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onAdd = () => { setForm(empty); setEditingId(null); setOpen(true); };
  const onEdit = (p) => {
    setForm({
      ...p,
      features_id: (p.features_id || []).join("\n"),
      features_en: (p.features_en || []).join("\n")
    });
    setEditingId(p.id);
    setOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      speed_mbps: Number(form.speed_mbps),
      broadband_mbps: Number(form.broadband_mbps),
      price_idr: Number(form.price_idr),
      features_id: form.features_id.split("\n").map((s) => s.trim()).filter(Boolean),
      features_en: form.features_en.split("\n").map((s) => s.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        const { id, created_at, updated_at, ...body } = payload;
        await adminApi.put(`/packages/${editingId}`, body);
        toast.success("Paket diperbarui");
      } else {
        await adminApi.post("/packages", payload);
        toast.success("Paket dibuat");
      }
      setOpen(false);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal simpan paket");
    }
  };

  const onDelete = async (p) => {
    if (!window.confirm(`Hapus paket "${p.name}"?`)) return;
    try {
      await adminApi.delete(`/packages/${p.id}`);
      toast.success("Paket dihapus");
      load();
    } catch {
      toast.error("Gagal hapus");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Paket</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Kelola Paket Internet</h1>
        </div>
        <Button data-testid="add-package-btn" onClick={onAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
          <Plus className="h-4 w-4 mr-1" />
          Tambah Paket
        </Button>
      </div>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      ) : (
        <div className="rounded-3xl border border-overlay/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-overlay/[0.04] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3">Nama</th>
                <th className="text-left px-5 py-3">Kategori</th>
                <th className="text-left px-5 py-3">Speed</th>
                <th className="text-left px-5 py-3">Harga / bulan</th>
                <th className="text-center px-5 py-3">Populer</th>
                <th className="text-right px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id} data-testid={`pkg-row-${p.id}`} className="border-t border-overlay/5 hover:bg-overlay/[0.02]">
                  <td className="px-5 py-3 font-semibold">{p.name}<div className="text-[10px] text-muted-foreground font-normal">id: {p.id}</div></td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3">{p.speed_mbps} / {p.broadband_mbps} Mbps</td>
                  <td className="px-5 py-3 text-primary font-semibold">{formatIDR(p.price_idr)}</td>
                  <td className="px-5 py-3 text-center">{p.popular && <Star className="h-4 w-4 text-primary inline fill-primary" />}</td>
                  <td className="px-5 py-3 text-right space-x-1">
                    <Button data-testid={`pkg-edit-${p.id}`} onClick={() => onEdit(p)} size="sm" variant="ghost" className="h-8 w-8 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                    <Button data-testid={`pkg-delete-${p.id}`} onClick={() => onDelete(p)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Paket" : "Tambah Paket Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 mt-4" data-testid="pkg-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nama Paket *</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>ID / Slug {editingId && <span className="text-muted-foreground">(tidak bisa diubah)</span>}</Label>
                <Input disabled={!!editingId} placeholder="otomatis dari nama" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Kategori *</Label>
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-md border border-overlay/10 bg-background/60 text-sm">
                  <option value="home">Home</option>
                  <option value="premium">Premium</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <Label>Harga (IDR / bulan) *</Label>
                <Input required type="number" value={form.price_idr} onChange={(e) => setForm({ ...form, price_idr: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Speed Dedicated (Mbps) *</Label>
                <Input required type="number" value={form.speed_mbps} onChange={(e) => setForm({ ...form, speed_mbps: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Speed Broadband (Mbps) *</Label>
                <Input required type="number" value={form.broadband_mbps} onChange={(e) => setForm({ ...form, broadband_mbps: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Fitur (Bahasa Indonesia) — 1 baris per fitur</Label>
              <Textarea rows={5} value={form.features_id} onChange={(e) => setForm({ ...form, features_id: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Features (English) — 1 line per feature</Label>
              <Textarea rows={5} value={form.features_en} onChange={(e) => setForm({ ...form, features_en: e.target.value })} className="mt-1" />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
              Tandai sebagai paket Paling Populer
            </label>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingId ? "Simpan Perubahan" : "Buat Paket"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
