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
    fetchUser();
  }, []);

  // ✅ Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); 
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("token", data.token); // si el backend devuelve un JWT
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        login,
        logout,
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
