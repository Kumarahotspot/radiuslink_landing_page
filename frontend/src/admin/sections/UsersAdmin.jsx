import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Key, UserCircle2 } from "lucide-react";
import { adminApi } from "../api";
import { useAdminAuth } from "../AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

const empty = { email: "", password: "", name: "", role: "admin" };

export default function UsersAdmin() {
  const { user: me } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [pwOpen, setPwOpen] = useState(null);
  const [newPw, setNewPw] = useState("");

  const load = () => {
    setLoading(true);
    adminApi.get("/users")
      .then((r) => setUsers(r.data.users))
      .catch(() => toast.error("Gagal load"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post("/users", form);
      toast.success("Admin dibuat");
      setOpen(false);
      setForm(empty);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal");
    }
  };

  const onDelete = async (u) => {
    if (!window.confirm(`Hapus admin "${u.name}" (${u.email})?`)) return;
    try {
      await adminApi.delete(`/users/${u.id}`);
      toast.success("Dihapus");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal");
    }
  };

  const onResetPw = async (e) => {
    e.preventDefault();
    if (newPw.length < 6) { toast.error("Min 6 karakter"); return; }
    try {
      await adminApi.put(`/users/${pwOpen.id}/password`, { password: newPw });
      toast.success("Password direset");
      setPwOpen(null);
      setNewPw("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Gagal");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Admin Users</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Kelola Akun Admin</h1>
        </div>
        <Button data-testid="add-user-btn" onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
          <Plus className="h-4 w-4 mr-1" />
          Tambah Admin
        </Button>
      </div>

      {loading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : (
        <div className="rounded-3xl border border-overlay/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-overlay/[0.04] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3">Nama</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-left px-5 py-3">Dibuat</th>
                <th className="text-right px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} data-testid={`user-row-${u.id}`} className="border-t border-overlay/5 hover:bg-overlay/[0.02]">
                  <td className="px-5 py-3 font-semibold flex items-center gap-2">
                    <UserCircle2 className="h-4 w-4 text-muted-foreground" />
                    {u.name}
                    {u.id === me?.id && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold uppercase">Anda</span>}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${u.role === "super_admin" ? "bg-primary/15 text-primary border border-primary/30" : "bg-overlay/10 text-foreground/70"}`}>
                      {u.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString("id-ID")}</td>
                  <td className="px-5 py-3 text-right space-x-1">
                    <Button data-testid={`user-pw-${u.id}`} onClick={() => setPwOpen(u)} size="sm" variant="ghost" className="h-8 px-2"><Key className="h-3.5 w-3.5 mr-1" />Reset PW</Button>
                    {u.id !== me?.id && (
                      <Button data-testid={`user-delete-${u.id}`} onClick={() => onDelete(u)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Tambah Admin Baru</DialogTitle></DialogHeader>
          <form onSubmit={onAdd} className="space-y-4 mt-2" data-testid="user-form">
            <div>
              <Label>Nama *</Label>
              <Input data-testid="user-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Email *</Label>
              <Input data-testid="user-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Password * <span className="text-muted-foreground">(min 6 karakter)</span></Label>
              <Input data-testid="user-password" required type="text" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Role *</Label>
              <select data-testid="user-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-md border border-overlay/10 bg-background/60 text-sm">
                <option value="admin">Admin (akses CRUD paket, coverage, lihat data)</option>
                <option value="super_admin">Super Admin (full access + kelola admin lain)</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Buat Admin</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!pwOpen} onOpenChange={(v) => !v && setPwOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reset Password — {pwOpen?.name}</DialogTitle></DialogHeader>
          <form onSubmit={onResetPw} className="space-y-4 mt-2">
            <div>
              <Label>Password Baru *</Label>
              <Input data-testid="reset-pw-input" required type="text" minLength={6} value={newPw} onChange={(e) => setNewPw(e.target.value)} className="mt-1" placeholder="Min 6 karakter" />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setPwOpen(null)}>Batal</Button>
              <Button type="submit" data-testid="reset-pw-submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Reset</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
