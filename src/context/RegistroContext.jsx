import { createContext, useContext, useState } from 'react';

const RegistroContext = createContext();

export const useRegistro = () => {
  const context = useContext(RegistroContext);
  if (!context) {
    throw new Error('useRegistro debe usarse dentro de un RegistroProvider');
  }
  return context;
};

export const RegistroProvider = ({ children }) => {
  const [registroData, setRegistroData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    cumple: '',
    cedula: '',
    direccion: '',
    fechaNacimiento: {
      dia: '',
      mes: '',
      anio: ''
    }
  });

  const [pasoActual, setPasoActual] = useState(1);

  const actualizarDatos = (nuevosDatos) => {
    setRegistroData(prev => ({
      ...prev,
      ...nuevosDatos
    }));
  };

  const siguientePaso = () => {
    setPasoActual(prev => prev + 1);
  };

  const pasoAnterior = () => {
    setPasoActual(prev => prev - 1);
  };

  const resetearRegistro = () => {
    setRegistroData({
      nombre: '',
      email: '',
      password: '',
      telefono: '',
      cumple: '',
      cedula: '',
      direccion: '',
      fechaNacimiento: {
        dia: '',
        mes: '',
        anio: ''
      }
    });
    setPasoActual(1);
  };

  const value = {
    registroData,
    pasoActual,
    actualizarDatos,
    siguientePaso,
    pasoAnterior,
    resetearRegistro
  };

  return (
    <RegistroContext.Provider value={value}>
      {children}
    </RegistroContext.Provider>
  );
};