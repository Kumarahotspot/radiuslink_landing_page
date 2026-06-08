import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { LockKeyhole, Mail, Loader2 } from "lucide-react";
import { useAdminAuth } from "./AuthContext";
import { BRAND } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AdminLogin() {
  const { user, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const d = err?.response?.data?.detail;
      setError(typeof d === "string" ? d : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={BRAND.logo_dark} alt="Kumara Hotspot" className="h-14 w-auto object-contain mb-3" />
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Kumara Hotspot Management</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-overlay/10 bg-card/50 backdrop-blur-xl p-7 gradient-border" data-testid="admin-login-form">
          <div className="space-y-5">
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="admin-login-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kumarahotspot.com"
                  className="pl-9 h-12 bg-background/60 border-overlay/10"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Password</Label>
              <div className="relative mt-2">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="admin-login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-12 bg-background/60 border-overlay/10"
                />
              </div>
            </div>
            {error && (
              <div data-testid="admin-login-error" className="text-sm text-destructive">{error}</div>
            )}
            <Button
              data-testid="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Masuk"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Akses khusus admin Kumara Hotspot.
        </p>
      </div>
    </div>
  );
}
