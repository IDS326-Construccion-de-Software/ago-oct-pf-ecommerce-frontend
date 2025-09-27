import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Registro.css'

export default function RegistroPaso1({ onNext = () => {}, initial = {} }) {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState(initial.nombre || '')
  const [email, setEmail] = useState(initial.email || '')
  const [password, setPassword] = useState(initial.password || '')
  const [showPwd, setShowPwd] = useState(false)
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!nombre.trim()) nextErrors.nombre = 'Ingrese su nombre completo'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Email inválido'

    // Password rules: must include at least one uppercase, one lowercase, one digit and one special character.
    // Also require a reasonable minimum length (8). Assumption: min length 8 is acceptable.
    const pwdRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/
    if (!pwdRule.test(password) || password.length < 8) {
      nextErrors.password = 'La contraseña debe tener ≥8 caracteres, incluir mayúscula, minúscula, número y carácter especial'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    // Guarda los datos en localStorage y navega al paso 2
    localStorage.setItem('registroStep1', JSON.stringify({ nombre, email, password }))
    navigate('/registro/paso2')
  }

  return (
    <div className="registro-container">
      <div className="card">
      <h1 className="title">Bienvenido</h1>
      <p className="subtitle">Registro de usuario</p>

      <div className="progress">
        <span className="dot active" />
        <div className="line" />
        <span className="dot" />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div className="field-label">Nombre completo</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 21c1.5-4 6-6 9-6s7.5 2 9 6" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input inputMode="text" value={nombre} onChange={e => setNombre(e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))} placeholder="Ejemplo: Némoleo Rodriguez" />
          </div>
          {errors.nombre && <div className="error-text">{errors.nombre}</div>}
        </div>

        <div>
          <div className="field-label">Email</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5v11c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-11" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 6.5L12 13 3 6.5" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ejemplo: NemoleoRodriguez@skoka.com" />
          </div>
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div>
          <div className="field-label">Contraseña</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="10" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/><path d="M7 11V8a5 5 0 0110 0v3" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="************************" />
            <button type="button" className="eye" onClick={() => setShowPwd(s => !s)} aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
              {showPwd ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a17.3 17.3 0 014.12-5.13M1 1l22 22" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#6b4a3a" strokeWidth="1.2"/></svg>
              )}
            </button>
          </div>
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className="actions">
          <button className="btn" type="submit">Continuar</button>
        </div>

        <div className="social-row">
          <button type="button" className="ghost"> 
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M21 12.3c0-.6-.1-1.2-.2-1.8H12v3.4h5.4c-.2 1-.7 1.9-1.5 2.6v2h2.5c1.5-1.4 2.4-3.4 2.4-5.8z" fill="#3b5998"/><path d="M12 22c2.7 0 5-0.9 6.7-2.4l-2.5-2c-0.7 0.5-1.7 0.9-4.2 0.9-3.2 0-5.9-2.2-6.9-5.2H2.7v2.1C4.4 19.8 7.9 22 12 22z" fill="#34A853"/><path d="M5.1 13.3A7.9 7.9 0 014.6 12c0-.4 0-.7.1-1.1V8.8H2.7A10 10 0 002 12c0 1.6.4 3.2 1.1 4.6l2-3.3z" fill="#FBBC05"/></svg>
            Google
          </button>
          <button type="button" className="ghost"> 
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8.2v-2.9h2.3V9.6c0-2.3 1.4-3.6 3.4-3.6.98 0 2 .18 2 .18v2.2h-1.1c-1.1 0-1.4.68-1.4 1.4v1.64h2.4l-.4 2.9h-2v7C18.3 21.1 22 17 22 12z" fill="#3b5998"/></svg>
            Facebook
          </button>
  </div>
      </form>
      </div>
    </div>
  )
}
