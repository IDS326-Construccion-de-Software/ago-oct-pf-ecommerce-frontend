import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import '../styles/SettingsPage.css'; 
import Header from "../components/Header";
import SuccessModal from "../components/SuccessModal";

const SettingsPage = () => {
  const { settings, handleToggle, handleSelectChange, handleSaveChanges, resetSettings } = useSettings();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSave = () => {
    handleSaveChanges();
    setModalMessage("Cambios guardados correctamente");
    setShowModal(true);
  };

  const handleReset = () => {
    resetSettings();
    setModalMessage("Preferencias restauradas con éxito");
    setShowModal(true);
  };

  return (
    <div className="settings-page">
      <header className="profile-header">
        <h1 className="header-logo">
          <a href="/">
            <img src="/Icono-the-Revenge-V2.ico" alt="logo" className="logo-img" />
            THE REVENGE
          </a>
        </h1>
        <div className="header-icons">
          <span className="header-icon">🔔</span>
          <span
            className="header-icon"
            title="Cerrar sesión"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            🚪
          </span>
        </div>
      </header>

      <br /><br />

      <div className="settings-container">
        <div className="settings-section">
          <h2 className="section-title">Configuración de Cuenta</h2>
          
          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Cambiar Contraseña</p>
              <p className="item-description">Actualiza tu contraseña regularmente</p>
            </div>
            <button className="action-button primary">Cambiar</button>
          </div>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Verificación en Dos Pasos</p>
              <p className="item-description">Agrega una capa extra de seguridad</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={() => handleToggle('twoFactor')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item danger">
            <div className="item-content">
              <p className="item-label">Eliminar Cuenta</p>
              <p className="item-description">Elimina permanentemente tu cuenta</p>
            </div>
            <button className="action-button danger">Eliminar</button>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Preferencias de Comunicación</h2>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Notificaciones por Email</p>
              <p className="item-description">Recibe actualizaciones por correo</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">SMS Promocionales</p>
              <p className="item-description">Ofertas especiales por mensaje</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.smsPromo}
                onChange={() => handleToggle('smsPromo')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Notificaciones Push</p>
              <p className="item-description">Alertas en tiempo real</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Idioma y Región</h2>

          <div className="settings-group">
            <div className="select-item">
              <label className="select-label">Idioma</label>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="select-input"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
            </div>

            <div className="select-item">
              <label className="select-label">Zona Horaria</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="select-input"
              >
                <option value="GMT-4">GMT-4 (Santo Domingo)</option>
                <option value="GMT-5">GMT-5 (America Central)</option>
                <option value="GMT-6">GMT-6 (America Central)</option>
                <option value="GMT-8">GMT-8 (America Pacifica)</option>
              </select>
            </div>

            <div className="select-item">
              <label className="select-label">Moneda</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSelectChange('currency', e.target.value)}
                className="select-input"
              >
                <option value="DOP">Peso Dominicano (DOP)</option>
                <option value="USD">Dólar Americano (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Privacidad</h2>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Perfil Público</p>
              <p className="item-description">Permite que otros usuarios vean tu perfil</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.publicProfile}
                onChange={() => handleToggle('publicProfile')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div className="item-content">
              <p className="item-label">Compartir Datos de Uso</p>
              <p className="item-description">Ayúdanos a mejorar nuestros servicios</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.shareUsageData}
                onChange={() => handleToggle('shareUsageData')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-footer">
          <button onClick={handleReset} className="reset-button">
            Restaurar Valores Predeterminados
          </button>
          <button onClick={handleSave} className="save-button">
            <Save size={18} />
            Guardar Cambios
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SettingsPage;
