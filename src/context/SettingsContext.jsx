import React, { createContext, useState, useContext } from 'react';

// Crear el Context
const SettingContext = createContext();

// Provider que proporciona los datos
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // Configuración de Cuenta
    changePassword: false,
    twoFactor: false,
    deleteAccount: false,
    
    // Preferencias de Comunicación
    emailNotifications: true,
    smsPromo: false,
    pushNotifications: true,
    
    // Idioma y Región
    language: 'es',
    timezone: 'GMT-4',
    currency: 'DOP',
    
    // Privacidad
    publicProfile: false,
    shareUsageData: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Cambios guardados:', settings);
  };

  const resetSettings = () => {
    setSettings({
      changePassword: false,
      twoFactor: false,
      deleteAccount: false,
      emailNotifications: true,
      smsPromo: false,
      pushNotifications: true,
      language: 'es',
      timezone: 'GMT-4',
      currency: 'DOP',
      publicProfile: false,
      shareUsageData: false
    });
  };

  const value = {
    settings,
    handleToggle,
    handleSelectChange,
    handleSaveChanges,
    resetSettings
  };

  return (
    <SettingContext.Provider value={value}>
      {children}
    </SettingContext.Provider>
  );
};

// Custom Hook para usar el Context
export const useSettings = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error('useSettings debe ser usado dentro de SettingsProvider');
  }
  return context;
};