// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Persistimos recoveryEmail e isCodeVerified en localStorage
  const [recoveryEmail, setRecoveryEmail] = useState(() => {
    return localStorage.getItem("recoveryEmail") || "";
  });
  const [isCodeVerified, setIsCodeVerified] = useState(() => {
    return localStorage.getItem("isCodeVerified") === "true";
  });

  useEffect(() => {
    localStorage.setItem("recoveryEmail", recoveryEmail || "");
  }, [recoveryEmail]);

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
