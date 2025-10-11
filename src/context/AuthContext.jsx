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

  return (
    <AuthContext.Provider
      value={{
        recoveryEmail,
        setRecoveryEmail,
        isCodeVerified,
        setIsCodeVerified,
        resetRecovery,
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
