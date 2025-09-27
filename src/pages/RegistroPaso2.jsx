import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Registro.css'

export default function RegistroPaso2({ onBack = () => {}, onSubmit = () => {}, initial = {} }){
  const navigate = useNavigate()
  const [telefono, setTelefono] = useState(initial.telefono || '')
  const [cumple, setCumple] = useState(initial.cumple || '')
  const [cedula, setCedula] = useState(initial.cedula || '')
  const [direccion, setDireccion] = useState(initial.direccion || '')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [errors, setErrors] = useState({})

  const handleBack = () => {
    navigate('/registro')
  }

  function handleSubmit(e){
    e.preventDefault()
    const nextErrors = {}

    // Validate telefono: expect pattern +#-###-###-#### with up to 11 digits (excluding symbols)
    const digits = telefono.replace(/[^\d]/g, '')
    if (digits.length > 11 || digits.length < 7) nextErrors.telefono = 'Teléfono debe tener entre 7 y 11 dígitos'

    // Validate birthday from dropdowns
    if (!day || !month || !year) nextErrors.cumple = 'Seleccione día, mes y año'
    else {
      const d = parseInt(day,10), m = parseInt(month,10), y = parseInt(year,10)
      const date = new Date(y, m-1, d)
      if (date.getFullYear() !== y || date.getMonth() !== m-1 || date.getDate() !== d) nextErrors.cumple = 'Fecha inválida'
    }

    // Cedula: allow 12 digits max and format ###-########-#
    const cedDigits = cedula.replace(/[^\d]/g,'')
    if (cedDigits.length !== 11) nextErrors.cedula = 'Cédula debe contener 12 números'

    if (!direccion.trim() || direccion.trim().length > 50) nextErrors.direccion = 'Dirección requerida (máx 50 caracteres)'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    const cumpleStr = `${String(day).padStart(2,'0')}/${String(month).padStart(2,'0')}/${String(year).slice(-2)}`
    
    // Obtener datos del paso 1 del localStorage
    const step1Data = JSON.parse(localStorage.getItem('registroStep1') || '{}')
    
    // Combinar todos los datos del registro
    const registroCompleto = {
      ...step1Data,
      telefono, 
      cumple: cumpleStr, 
      cedula, 
      direccion
    }
    
    console.log('Registro completo:', registroCompleto)
    alert('¡Registro completado exitosamente!')
    
    // Limpiar datos del localStorage
    localStorage.removeItem('registroStep1')
    
    // Navegar a la página principal
    navigate('/')
  }

  return (
    <div className="registro-container">
      <div className="card">
      <h1 className="title">Bienvenido</h1>
      <p className="subtitle">Registro de usuario</p>

      <div className="progress">
        <span className="dot"></span>
        <div className="line"></div>
        <span className="dot active"></span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div className="field-label">Telefono</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.11 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.7.33 1.37.63 2a1 1 0 0 1-.24 1.02L7.7 7.7a16 16 0 0 0 6 6l1.92-1.92a1 1 0 0 1 1.02-.24c.63.3 1.3.51 2 .63a1 1 0 0 1 .75 1V21z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input inputMode="tel" value={telefono} onChange={e=>{
                // normalize input to allowed chars
                let v = e.target.value.replace(/[^\d\+\-]/g,'')
                // remove extra leading plus signs
                v = v.replace(/(?!^)\+/g,'')
                // enforce max digits 11
                const digits = v.replace(/[^\d]/g,'')
                if (digits.length > 11) return
                // try to auto-format into +#-###-###-#### pattern when possible
                const d = digits
                if (d.length <= 1) v = '+' + d
                else if (d.length <= 4) v = '+' + d.slice(0,1) + '-' + d.slice(1)
                else if (d.length <= 7) v = '+' + d.slice(0,1) + '-' + d.slice(1,4) + '-' + d.slice(4)
                else if (d.length <= 11) v = '+' + d.slice(0,1) + '-' + d.slice(1,4) + '-' + d.slice(4,7) + '-' + d.slice(7)
                setTelefono(v)
              }} placeholder="+1-800-###-####" />
          </div>
          {errors.telefono && <div className="error-text">{errors.telefono}</div>}
        </div>

        <div>
          <div className="field-label">Cumpleaños</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="14" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/><path d="M16 3v4M8 3v4" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div style={{display:'flex',gap:6}}>
              <select value={day} onChange={e=>setDay(e.target.value)}>
                <option value="">Día</option>
                {Array.from({length:31},(_,i)=>i+1).map(d=> <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={month} onChange={e=>setMonth(e.target.value)}>
                <option value="">Mes</option>
                {Array.from({length:12},(_,i)=>i+1).map(m=> <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={year} onChange={e=>setYear(e.target.value)}>
                <option value="">Año</option>
                {Array.from({length:100},(_,i)=> new Date().getFullYear()-i).map(y=> <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          {errors.cumple && <div className="error-text">{errors.cumple}</div>}
        </div>

        <div>
          <div className="field-label">Cedula</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input inputMode="numeric" value={cedula} onChange={e=>{
                // keep only digits
                let digits = e.target.value.replace(/[^\d]/g,'')
                if (digits.length > 11) digits = digits.slice(0,11)
                // format ###-#######-#
                let out = digits
                if (digits.length > 3) out = digits.slice(0,3) + '-' + digits.slice(3)
                if (digits.length > 10) out = digits.slice(0,3) + '-' + digits.slice(3,10) + '-' + digits.slice(10)
                setCedula(out)
              }} placeholder="***-*******-*" />
          </div>
          {errors.cedula && <div className="error-text">{errors.cedula}</div>}
        </div>

        <div>
          <div className="field-label">Dirección</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s7-4.97 7-10a7 7 0 10-14 0c0 5.03 7 10 7 10z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="11" r="2" stroke="#6b4a3a" strokeWidth="1.2"/></svg>
            <input maxLength={50} value={direccion} onChange={e=>setDireccion(e.target.value)} placeholder="Ejemplo: Calle c" />
          </div>
          {errors.direccion && <div className="error-text">{errors.direccion}</div>}
        </div>

        <div className="back-row">
          <button type="button" className="secondary" onClick={handleBack}>Atrás</button>
          <button className="btn" type="submit">Registrar</button>
        </div>
      </form>
      </div>
    </div>
  )
}
