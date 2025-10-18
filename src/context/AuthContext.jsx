/* eslint react-refresh/only-export-components: 0 */
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth:user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("isCodeVerified", isCodeVerified ? "true" : "false");
  }, [isCodeVerified]);

  const resetRecovery = () => {
    setRecoveryEmail("");
    setIsCodeVerified(false);
    localStorage.removeItem("recoveryEmail");
    localStorage.removeItem("isCodeVerified");
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("API no disponible o error en respuesta");
      const data = await res.json();
      setUser(data);
      setError(null);
    } catch {
      setUser({
        id: 1,
        name: "Usuario de prueba",
        email: "usuario@mock.com",
        phone: "+1 809-000-0000",
        location: "Santo Domingo, RD",
        memberSince: "2024",
        memberStatus: "Miembro Activo",
        avatar: "👤",
      });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (payload) => setUser(payload);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        recoveryEmail,
        setRecoveryEmail,
        isCodeVerified,
        setIsCodeVerified,
        resetRecovery,
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        error,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
