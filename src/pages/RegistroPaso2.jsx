import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import { useRegistro } from '../context/RegistroContext'
import '../styles/Registro.css'

export default function RegistroPaso2(){
  const navigate = useNavigate()
  const { registroData, actualizarDatos, pasoAnterior, resetearRegistro } = useRegistro()
  const [telefono, setTelefono] = useState(registroData.telefono || '')
  const [cumple, setCumple] = useState(registroData.cumple || '')
  const [cedula, setCedula] = useState(registroData.cedula || '')
  const [direccion, setDireccion] = useState(registroData.direccion || '')
  const [day, setDay] = useState(registroData.fechaNacimiento?.dia || '')
  const [month, setMonth] = useState(registroData.fechaNacimiento?.mes || '')
  const [year, setYear] = useState(registroData.fechaNacimiento?.anio || '')
  const [errors, setErrors] = useState({})

  function handleSubmit(e){
    e.preventDefault()
    const nextErrors = {}

    // Validate telefono
    const digits = telefono.replace(/[^\d]/g, '')
    if (digits.length > 11 || digits.length < 7) nextErrors.telefono = 'Teléfono debe tener entre 7 y 11 dígitos'

    // Validate birthday from dropdowns
    if (!day || !month || !year) nextErrors.cumple = 'Seleccione día, mes y año'
    else {
      const d = parseInt(day,10), m = parseInt(month,10), y = parseInt(year,10)
      const date = new Date(y, m-1, d)
      if (date.getFullYear() !== y || date.getMonth() !== m-1 || date.getDate() !== d) nextErrors.cumple = 'Fecha inválida'
    }

    // Cedula validation
    const cedDigits = cedula.replace(/[^\d]/g,'')
    if (cedDigits.length !== 11) nextErrors.cedula = 'Cédula debe contener 11 números'

    if (!direccion.trim() || direccion.trim().length > 50) nextErrors.direccion = 'Dirección requerida (máx 50 caracteres)'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    const cumpleStr = `${String(day).padStart(2,'0')}/${String(month).padStart(2,'0')}/${String(year).slice(-2)}`
    
    // Actualizar datos en el contexto
    actualizarDatos({ 
      telefono, 
      cumple: cumpleStr, 
      cedula, 
      direccion,
      fechaNacimiento: {
        dia: day,
        mes: month,
        anio: year
      }
    })
    
    // Mostrar éxito con SweetAlert2
    Swal.fire({
      title: '¡Registro completado!',
      text: 'Tu cuenta ha sido creada exitosamente.',
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#ff6b35'
    }).then(() => {
      resetearRegistro()
      navigate('/')
    })
  }

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="card">
          <button className="back-arrow" onClick={() => {
            pasoAnterior()
            navigate('/registro')
          }}>
            ← Atrás
          </button>
          <div className="progress">
            <span className="dot"></span>
            <div className="line"></div>
            <span className="dot active"></span>
          </div>

          <h1 className="title">Completa tu perfil</h1>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <div className="field-label">Teléfono</div>
              <div className="input">
                <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h4l2 7-3 1a16 16 0 009 9l1-3 7 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input 
                  type="tel" 
                  value={telefono} 
                  onChange={e => setTelefono(e.target.value)} 
                  placeholder="+1-829-123-4567" 
                />
              </div>
              {errors.telefono && <div className="error-text">{errors.telefono}</div>}
            </div>

            <div>
              <div className="field-label">Fecha de nacimiento</div>
              <div className="date-selectors">
                <select 
                  className="date-selector day-selector" 
                  value={day} 
                  onChange={e => setDay(e.target.value)}
                >
                  <option value="">Día</option>
                  {Array.from({length: 31}, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
                <select 
                  className="date-selector month-selector" 
                  value={month} 
                  onChange={e => setMonth(e.target.value)}
                >
                  <option value="">Mes</option>
                  {[
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                  ].map((mes, i) => (
                    <option key={i+1} value={i+1}>{mes}</option>
                  ))}
                </select>
                <select 
                  className="date-selector year-selector" 
                  value={year} 
                  onChange={e => setYear(e.target.value)}
                >
                  <option value="">Año</option>
                  {Array.from({length: 100}, (_, i) => {
                    const yr = new Date().getFullYear() - i
                    return <option key={yr} value={yr}>{yr}</option>
                  })}
                </select>
              </div>
              {errors.cumple && <div className="error-text">{errors.cumple}</div>}
            </div>

            <div>
              <div className="field-label">Cédula</div>
              <div className="input">
                <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/><path d="M7 8h.01M7 12h.01M7 16h.01M11 8h6M11 12h6M11 16h6" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <input 
                  type="text" 
                  value={cedula} 
                  onChange={e => setCedula(e.target.value.replace(/[^\d-]/g, ''))} 
                  placeholder="000-0000000-0" 
                />
              </div>
              {errors.cedula && <div className="error-text">{errors.cedula}</div>}
            </div>

            <div>
              <div className="field-label">Dirección</div>
              <div className="input">
                <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6b4a3a" strokeWidth="1.2"/><circle cx="12" cy="10" r="3" stroke="#6b4a3a" strokeWidth="1.2"/></svg>
                <input 
                  type="text" 
                  value={direccion} 
                  onChange={e => setDireccion(e.target.value)} 
                  placeholder="Calle Principal #123, Ciudad" 
                />
              </div>
              {errors.direccion && <div className="error-text">{errors.direccion}</div>}
            </div>

            <div className="actions">
              <button className="btn" type="submit">Completar registro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
