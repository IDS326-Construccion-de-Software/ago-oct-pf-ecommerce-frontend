import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users/me", {
        credentials: "include", // si usas cookies de sesión
      });

      if (!res.ok) throw new Error("API no disponible o error en respuesta");

      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err) {
      console.warn("⚠️ Usando datos mockeados, la API no respondió:", err.message);

      // 👇 Datos mockeados temporales
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

  useEffect(() => {
    localStorage.setItem("isCodeVerified", isCodeVerified ? "true" : "false");
  }, [isCodeVerified]);

  const resetRecovery = () => {
    setRecoveryEmail("");
    setIsCodeVerified(false);
    localStorage.removeItem("recoveryEmail");
    localStorage.removeItem("isCodeVerified");
  };
 // Estructura sugerida: { id, email, name, token, ... } | null
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth:user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persistir / limpiar sesión
  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  // API de sesión
  const login = (payload) => setUser(payload);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        // Recovery (lo tuyo)
        recoveryEmail,
        setRecoveryEmail,
        isCodeVerified,
        setIsCodeVerified,
        resetRecovery,
        // Sesión (login)
        user,
        isAuthenticated: !!user,
        login,
        logout,
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
