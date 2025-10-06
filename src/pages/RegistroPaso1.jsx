import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import Logo from '../assets/LogoTheRevenge.svg'
import { useRegistro } from '../context/RegistroContext'
import '../styles/Registro.css'

export default function RegistroPaso1() {
  const navigate = useNavigate()
  const { registroData, actualizarDatos, siguientePaso } = useRegistro()
  const [nombre, setNombre] = useState(registroData.nombre || '')
  const [email, setEmail] = useState(registroData.email || '')
  const [password, setPassword] = useState(registroData.password || '')
  const [showPwd, setShowPwd] = useState(false)
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!nombre.trim()) nextErrors.nombre = 'Ingrese su nombre completo'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Email inválido'

    // Password rules
    const pwdRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/
    if (!pwdRule.test(password) || password.length < 8) {
      nextErrors.password = 'La contraseña debe tener ≥8 caracteres, incluir mayúscula, minúscula, número y carácter especial'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    actualizarDatos({ nombre, email, password })
    siguientePaso()
    navigate('/registro/paso2')
  }

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="card">
          <div className="logo-section">
            <img src={Logo} alt="The Revenge" className="registro-logo" />
          </div>

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
              <div className="login-link">
                ¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Inicia sesión aquí</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
