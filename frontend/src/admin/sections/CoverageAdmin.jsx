import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, MapPin } from "lucide-react";
import { adminApi } from "../api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

export default function CoverageAdmin() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const load = () => {
    setLoading(true);
    adminApi.get("/coverage-areas")
      .then((r) => setAreas(r.data.areas))
      .catch(() => toast.error("Gagal load"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    const finalSlug = (slug || name).toLowerCase().trim().replace(/\s+/g, "-");
    try {
      await adminApi.post("/coverage-areas", { name: name.trim(), slug: finalSlug, active: true });
      toast.success("Area ditambahkan");
      setOpen(false);
      setName(""); setSlug("");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal");
    }
  };

  const onToggle = async (a) => {
    try {
      await adminApi.put(`/coverage-areas/${a.id}`, { name: a.name, slug: a.slug, active: !a.active });
      setAreas((arr) => arr.map((x) => x.id === a.id ? { ...x, active: !x.active } : x));
    } catch {
      toast.error("Gagal update");
    }
  };

  const onDelete = async (a) => {
    if (!window.confirm(`Hapus area ${a.name}?`)) return;
    try {
      await adminApi.delete(`/coverage-areas/${a.id}`);
      setAreas((arr) => arr.filter((x) => x.id !== a.id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal hapus");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Coverage</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Area Tercover</h1>
          <p className="text-sm text-muted-foreground mt-1">Tambah/hapus kota tempat Radiuslink punya klien atau engineer onsite.</p>
        </div>
        <Button data-testid="add-area-btn" onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
          <Plus className="h-4 w-4 mr-1" />
          Tambah Area
        </Button>
      </div>

      {loading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {areas.map((a) => (
            <div key={a.id} data-testid={`area-${a.slug}`} className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${a.active ? "border-primary/20 bg-primary/[0.04]" : "border-overlay/10 bg-card/40 opacity-60"}`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className={`h-9 w-9 rounded-xl grid place-items-center flex-shrink-0 ${a.active ? "bg-primary/15 text-primary" : "bg-overlay/10 text-muted-foreground"}`}>
                  <MapPin className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{a.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">slug: {a.slug}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  data-testid={`area-toggle-${a.slug}`}
                  onClick={() => onToggle(a)}
                  className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${a.active ? "bg-emerald-500/15 text-emerald-400" : "bg-overlay/10 text-muted-foreground"}`}
                >
                  {a.active ? "Aktif" : "Nonaktif"}
                </button>
                <Button data-testid={`area-delete-${a.slug}`} onClick={() => onDelete(a)} size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Area Coverage</DialogTitle>
          </DialogHeader>
          <form onSubmit={onAdd} className="space-y-4 mt-2" data-testid="area-form">
            <div>
              <Label>Nama tampilan *</Label>
              <Input data-testid="area-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Bandung" className="mt-1" />
            </div>
            <div>
              <Label>Slug (untuk matching) <span className="text-muted-foreground">— otomatis dari nama</span></Label>
              <Input data-testid="area-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="otomatis kalau kosong" className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Ini yang akan dicocokkan dengan input user di Coverage Checker (case insensitive).</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Tambah</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
