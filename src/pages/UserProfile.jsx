import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, AlertCircle, Edit2, User as UserIcon, Package, Settings as SettingsIcon, Lock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import { useAuth } from "../context/AuthContext";
import HeaderSimple from "../components/HeaderSimple";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, error, logout } = useAuth();

  // 🔹 Estados locales para manejar tabs y edición
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Menú lateral
  const menuItems = [
    { id: "profile", label: "Perfil", icon: <UserIcon size={18} /> },
    { id: "orders", label: "Mis pedidos", icon: <Package size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <SettingsIcon size={18} /> },
    { id: "security", label: "Seguridad", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notificaciones", icon: <Bell size={18} /> },
  ];

  const handleMenuClick = (tabId) => {
    if (tabId === "settings") {
      navigate("/settings");
    } else if (tabId === "orders") {
      navigate("/orders");
    } else {
      setActiveTab(tabId);
    }
  };

  // 🔹 Datos mockeados de estadísticas y pedidos
  const stats = {
    totalOrders: 5,
    accumulatedPoints: 120,
    moneySpent: 15430.5,
    usedDiscounts: 3,
  };

  const orders = [
    {
      id: "#A12452",
      name: "Camiseta exclusiva",
      price: 2990,
      date: "02/09/2025",
      status: "Completado",
    },
    {
      id: "#B99876",
      name: "Zapatillas Revenge",
      price: 6850,
      date: "10/09/2025",
      status: "Entregado",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completado":
        return "status-completed";
      case "Entregado":
        return "status-delivered";
      case "Pendiente":
        return "status-pending";
      default:
        return "";
    }
  };


  if (loading) return <p className="loading">Cargando perfil...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!user) return <p className="empty">No hay usuario autenticado</p>;

  return (
    <>
      <HeaderSimple />
      <div className="user-profile-container">
        <div className="profile-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">


            <div>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-status">{user.memberStatus}</p>

              <nav>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`menu-button ${activeTab === item.id ? "active" : ""}`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalOrders}</div>
                <div className="stat-label">Pedidos Totales</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.accumulatedPoints}</div>
                <div className="stat-label">Puntos Acumulados</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  RD$
                  {stats.moneySpent.toLocaleString("es-DO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="stat-label">Dinero Gastado</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.usedDiscounts}</div>
                <div className="stat-label">Descuentos Usados</div>
              </div>
            </div>

            {/* Profile Info */}
            {activeTab === "profile" && (
              <section className="section">
                <div className="section-header">
                  <h3 className="section-title">Información Personal</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="edit-button"
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                </div>

                <div className="info-item">
                  <Mail size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Email</div>
                    <div className="info-value">{user.email}</div>
                  </div>
                </div>

                <div className="info-item">
                  <Phone size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Teléfono</div>
                    <div className="info-value">{user.phone}</div>
                  </div>
                </div>

                <div className="info-item">
                  <MapPin size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Ubicación</div>
                    <div className="info-value">{user.location}</div>
                  </div>
                </div>

                <div className="info-item">
                  <Calendar size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Miembro desde</div>
                    <div className="info-value">{user.memberSince}</div>
                  </div>
                </div>
              </section>
            )}

            {/* Other Tabs */}
            {(activeTab === "security" || activeTab === "notifications") && (
              <section className="section empty-state">
                <AlertCircle size={40} className="empty-state-icon" />
                <h3 className="empty-state-title">Sección en desarrollo</h3>
                <p className="empty-state-message">
                  La funcionalidad de {menuItems.find((m) => m.id === activeTab)?.label} estará disponible pronto.
                </p>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
