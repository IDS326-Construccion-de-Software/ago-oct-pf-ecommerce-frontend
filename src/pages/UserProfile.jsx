import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from './Icono-the-Revenge-V2.ico'; 
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+1 234 567 8901',
    location: 'Santo Domingo, República Dominicana',
    memberSince: 'Enero 2023',
    memberStatus: 'Miembro Premium',
    avatar: 'JP'
  });

  const [stats] = useState({
    totalOrders: 24,
    accumulatedPoints: 1250,
    moneySpent: 4680.00,
    usedDiscounts: 8
  });

  const [orders] = useState([
    {
      id: 'REF-1758989262313',
      name: 'Producto Premium',
      price: 1500.00,
      date: '15 Sep 2025',
      status: 'Entregado'
    },
    {
      id: 'REF-1758989262312',
      name: 'Servicio Adicional',
      price: 850.00,
      date: '10 Sep 2025',
      status: 'En Proceso'
    },
    {
      id: 'REF-1758989262311',
      name: 'Envío Express',
      price: 1200.00,
      date: '5 Sep 2025',
      status: 'Completado'
    }
  ]);

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuClick = (tabId) => {
    if (tabId === 'settings') {
      navigate('/configuracion');
    } else {
      setActiveTab(tabId);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Entregado':
        return 'status-delivered';
      case 'En Proceso':
        return 'status-in-progress';
      case 'Completado':
        return 'status-completed';
      default:
        return '';
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: '👤' },
    { id: 'orders', label: 'Mis Pedidos', icon: '📦' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' },
    { id: 'security', label: 'Seguridad', icon: '🔒' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' }
  ];

  return (
    <div className="user-profile-container">
      {/* Header */}
      <header className="profile-header">
        <h1 className="header-logo">
          <img src={logo} alt="logo" className="logo-img" /> 
          THE REVENGE
        </h1>
        <div className="header-icons">
          <span className="header-icon">🔔</span>
          <span className="header-icon">➡️</span>
        </div>
      </header>

      <div className="profile-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Avatar */}
          <div className="avatar">
            {user.avatar}
            <span className="avatar-camera">📷</span>
          </div>

          <div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-status">{user.memberStatus}</p>

            {/* Menu Items */}
            <nav>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`menu-button ${activeTab === item.id ? 'active' : ''}`}
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
          {/* Stats Cards */}
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
              <div className="stat-value">RD${stats.moneySpent.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="stat-label">Dinero Gastado</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.usedDiscounts}</div>
              <div className="stat-label">Descuentos Usados</div>
            </div>
          </div>

          {/* Personal Information Section */}
          {activeTab === 'profile' && (
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

          {/* Recent Orders Section */}
          {activeTab === 'orders' && (
            <section className="section">
              <h3 className="section-title">Pedidos Recientes</h3>
              {orders.map((order, idx) => (
                <div key={idx} className="order-item">
                  <div className="order-left">
                    <div className="order-name">{order.name}</div>
                    <div className="order-id">{order.id}</div>
                  </div>
                  <div className="order-right">
                    <div className="order-price">RD${order.price.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="order-date">{order.date}</div>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Other Sections */}
          {(activeTab === 'security' || activeTab === 'notifications' || activeTab === 'orders') && activeTab !== 'profile' && (
            <section className="section empty-state">
              <AlertCircle size={40} className="empty-state-icon" />
              <h3 className="empty-state-title">Esta sección aún no está disponible</h3>
              <p className="empty-state-message">
                La funcionalidad para {menuItems.find(m => m.id === activeTab)?.label} estará disponible próximamente.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;