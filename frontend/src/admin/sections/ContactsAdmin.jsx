import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Loader2, Mail } from "lucide-react";
import { adminApi } from "../api";
import { Button } from "../../components/ui/button";

export default function ContactsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminApi.get("/contacts")
      .then((r) => setItems(r.data.contacts))
      .catch(() => toast.error("Gagal load"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const onDelete = async (c) => {
    if (!window.confirm("Hapus pesan?")) return;
    try {
      await adminApi.delete(`/contacts/${c.id}`);
      setItems((arr) => arr.filter((x) => x.id !== c.id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal hapus");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Pesan Kontak</div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Pesan Masuk dari Pelanggan</h1>
      </div>

      {loading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : items.length === 0 ? (
        <div className="rounded-2xl border border-overlay/10 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          Belum ada pesan masuk.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c.id} data-testid={`contact-${c.id}`} className="rounded-2xl border border-overlay/10 bg-card/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="font-bold">{c.name}</div>
                    <a href={`mailto:${c.email}`} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {c.email}
                    </a>
                    {c.phone && <div className="text-xs text-muted-foreground">{c.phone}</div>}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString("id-ID")}</div>
                  <div className="mt-3 text-sm font-medium">{c.subject}</div>
                  <p className="mt-2 text-sm text-foreground/85 whitespace-pre-wrap">{c.message}</p>
                </div>
                <Button data-testid={`contact-delete-${c.id}`} onClick={() => onDelete(c)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
