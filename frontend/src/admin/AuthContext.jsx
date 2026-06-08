import React, { createContext, useContext, useEffect, useState } from "react";
import { adminApi, tokenStorage } from "./api";

const AuthContext = createContext({ user: null, loading: true });

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setLoading(false);
      return;
    }
    adminApi.get("/auth/me")
      .then((r) => setUser(r.data.user))
      .catch(() => { tokenStorage.clear(); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await adminApi.post("/auth/login", { email, password });
    tokenStorage.set(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AuthContext);
