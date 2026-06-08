import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, Eye, EyeOff, Sparkles } from "lucide-react";
import { adminApi } from "../api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const empty = {
  active: true,
  tag_id: "", tag_en: "",
  text_id: "", text_en: "",
  cta_id: "", cta_en: "",
  cta_message_id: "", cta_message_en: ""
};

export default function PromoSettingsAdmin() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.get("/settings/promo")
      .then((r) => setForm({ ...empty, ...r.data }))
      .catch(() => toast.error("Gagal load"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.put("/settings/promo", form);
      toast.success("Pengaturan promo disimpan");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal simpan");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = () => setForm({ ...form, active: !form.active });

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Pengaturan</div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Banner Promo</h1>
        <p className="text-sm text-muted-foreground mt-1">Atur banner promo yang muncul di atas website (bilingual ID/EN).</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5" data-testid="promo-form">
        {/* Live Preview */}
        <div>
          <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2 block">Preview</Label>
          {form.active ? (
            <div className="rounded-2xl overflow-hidden border border-overlay/10">
              <div className="bg-gradient-to-r from-primary via-[#ff7a2a] to-accent text-primary-foreground py-2.5 px-5 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/20 font-bold uppercase tracking-wider text-[10px]">
                  <Sparkles className="h-3 w-3" />
                  {form.tag_id || "Promo Spesial"}
                </span>
                <span className="flex-1 truncate font-medium">{form.text_id || "(teks promo)"}</span>
                <span className="px-3 py-1 rounded-full bg-black/20 font-semibold text-xs">{form.cta_id || "Klaim Sekarang"} →</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-overlay/10 bg-overlay/[0.02] p-5 text-center text-sm text-muted-foreground">
              <EyeOff className="h-5 w-5 mx-auto mb-2 opacity-50" />
              Banner promo dinonaktifkan
            </div>
          )}
        </div>

        {/* On/Off toggle */}
        <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5 flex items-center justify-between">
          <div>
            <div className="font-semibold flex items-center gap-2">
              {form.active ? <Eye className="h-4 w-4 text-emerald-400" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              Status Banner
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {form.active ? "Banner promo tampil di semua halaman website." : "Banner promo disembunyikan."}
            </div>
          </div>
          <button
            type="button"
            data-testid="promo-active-toggle"
            onClick={toggleActive}
            role="switch"
            aria-checked={form.active}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${form.active ? "bg-emerald-500" : "bg-overlay/20"}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Bilingual content */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5 space-y-4">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">🇮🇩 Indonesia</div>
            <div>
              <Label>Tag</Label>
              <Input data-testid="promo-tag-id" value={form.tag_id} onChange={(e) => setForm({ ...form, tag_id: e.target.value })} placeholder="Promo Spesial" className="mt-1" />
            </div>
            <div>
              <Label>Teks Promo</Label>
              <Textarea data-testid="promo-text-id" rows={2} value={form.text_id} onChange={(e) => setForm({ ...form, text_id: e.target.value })} placeholder="Pasang baru hari ini — Gratis biaya instalasi..." className="mt-1" />
            </div>
            <div>
              <Label>Tombol CTA</Label>
              <Input data-testid="promo-cta-id" value={form.cta_id} onChange={(e) => setForm({ ...form, cta_id: e.target.value })} placeholder="Klaim Sekarang" className="mt-1" />
            </div>
          </div>

          <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5 space-y-4">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">🇬🇧 English</div>
            <div>
              <Label>Tag</Label>
              <Input data-testid="promo-tag-en" value={form.tag_en} onChange={(e) => setForm({ ...form, tag_en: e.target.value })} placeholder="Special Offer" className="mt-1" />
            </div>
            <div>
              <Label>Promo Text</Label>
              <Textarea data-testid="promo-text-en" rows={2} value={form.text_en} onChange={(e) => setForm({ ...form, text_en: e.target.value })} placeholder="Sign up today — Free installation..." className="mt-1" />
            </div>
            <div>
              <Label>CTA Button</Label>
              <Input data-testid="promo-cta-en" value={form.cta_en} onChange={(e) => setForm({ ...form, cta_en: e.target.value })} placeholder="Claim Now" className="mt-1" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5">
            <Label>Pesan WhatsApp 🇮🇩 (Indonesia)</Label>
            <Textarea data-testid="promo-wa-message-id" rows={3} value={form.cta_message_id} onChange={(e) => setForm({ ...form, cta_message_id: e.target.value })} placeholder="Halo Kumara, saya tertarik promo..." className="mt-1" />
          </div>
          <div className="rounded-2xl border border-overlay/10 bg-card/40 p-5">
            <Label>WhatsApp Message 🇬🇧 (English)</Label>
            <Textarea data-testid="promo-wa-message-en" rows={3} value={form.cta_message_en} onChange={(e) => setForm({ ...form, cta_message_en: e.target.value })} placeholder="Hello Kumara, I'm interested in the promo..." className="mt-1" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">Pesan ini akan otomatis terisi sesuai bahasa yang dipilih user saat klik tombol promo di banner.</p>

        <div className="flex justify-end">
          <Button
            data-testid="promo-save"
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
