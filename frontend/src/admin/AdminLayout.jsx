import React from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Package, Users, MapPin, MessageSquare, UserCog, LogOut, Loader2, ExternalLink, Megaphone } from "lucide-react";
import { useAdminAuth } from "./AuthContext";
import { BRAND } from "../lib/api";

const NAV = [
  { to: "/admin/packages", label: "Paket", icon: Package, testid: "nav-packages" },
  { to: "/admin/subscriptions", label: "Pendaftaran", icon: Users, testid: "nav-subscriptions" },
  { to: "/admin/contacts", label: "Pesan Kontak", icon: MessageSquare, testid: "nav-contacts" },
  { to: "/admin/coverage", label: "Coverage Area", icon: MapPin, testid: "nav-coverage" },
  { to: "/admin/promo", label: "Banner Promo", icon: Megaphone, testid: "nav-promo" },
  { to: "/admin/users", label: "Admin Users", icon: UserCog, testid: "nav-users", superOnly: true }
];

export default function AdminLayout() {
  const { user, loading, logout } = useAdminAuth();
  const nav = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  const items = NAV.filter((n) => !n.superOnly || user.role === "super_admin");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-overlay/10 bg-card/40 flex flex-col">
        <div className="p-5 border-b border-overlay/5">
          <button onClick={() => nav("/admin")} className="flex items-center gap-3 group w-full text-left">
            <img src={BRAND.logo_dark} alt="" className="h-9 w-auto object-contain" />
            <div>
              <div className="text-sm font-bold tracking-tight uppercase">Admin</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Radiuslink</div>
            </div>
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={n.testid}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-foreground/80 hover:bg-overlay/5 border border-transparent"
                }`
              }
            >
              <n.icon className="h-4 w-4" strokeWidth={1.8} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-overlay/5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Buka website
          </a>
          <div className="mt-2 px-3 py-2 rounded-xl bg-overlay/5">
            <div className="text-xs font-semibold truncate">{user.name}</div>
            <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
              {user.role === "super_admin" ? "Super Admin" : "Admin"}
            </div>
          </div>
          <button
            data-testid="admin-logout"
            onClick={logout}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
